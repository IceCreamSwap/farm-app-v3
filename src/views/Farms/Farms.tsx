import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Heading, RowType, Text, Toggle } from 'uikit'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd } from 'state/farms/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${ ( { theme } ) => theme.mediaQueries.sm } {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${ Text } {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${ Text } {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;
  flex-wrap: wrap;

  ${ ( { theme } ) => theme.mediaQueries.sm } {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${ ( { theme } ) => theme.mediaQueries.sm } {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const SearchWrapper = styled(LabelWrapper)`
  margin-top: 16px;
  ${ ( { theme } ) => theme.mediaQueries.sm } {
    margin-top: 0px;
    margin-left: 16px;
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const FARM_TYPES = {
  ALL: 0,
  SINGLE_ASSETS: 1,
  STABLE_LPS: 2,
  STABLES: 3,
}

const getDisplayApr = ( cakeRewardsApr?: number, lpRewardsApr?: number ) => {
  if ( cakeRewardsApr && lpRewardsApr ) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString( 'en-US', { maximumFractionDigits: 2 } )
  }
  if ( cakeRewardsApr ) {
    return cakeRewardsApr.toLocaleString( 'en-US', { maximumFractionDigits: 2 } )
  }
  return null
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [ query, setQuery ] = useState( '' )
  const [ viewMode, setViewMode ] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [ farmType, setFarmType ] = useState( FARM_TYPES.ALL )
  const [ sortOption, setSortOption ] = useState( 'hot' )
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef( 0 )

  const isActive = true

  usePollFarmsWithUserData( false )

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [ stakedOnly, setStakedOnly ] = useUserFarmStakedOnly( isActive )

  const activeFarms = farmsLP.filter( ( farm ) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid( farm.pid ) )
  //! console.debug( { activeFarms } )

  const stakedOnlyFarms = activeFarms.filter(
    ( farm ) => farm.userData && new BigNumber( farm.userData.stakedBalance ).isGreaterThan( 0 ),
  )

  const farmsList = useCallback(
    ( farmsToDisplay: DeserializedFarm[] ): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map( ( farm ) => {
        if ( !farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd ) {
          return farm
        }
        const totalLiquidity = new BigNumber( farm.lpTotalInQuoteToken ).times( farm.quoteTokenPriceBusd )
        const { cakeRewardsApr, lpRewardsApr } = getFarmApr( new BigNumber( farm.poolWeight ), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET] )

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      } )

      if ( farmType ) {
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter( farm => {
          if ( farmType === FARM_TYPES.SINGLE_ASSETS ) {
            return farm.token.address === farm.quoteToken.address
          }

          const stableTokens = [ 'BUSD', 'USDT', 'USDC', 'DAI' ]

          if ( farmType === FARM_TYPES.STABLE_LPS ) {
            return (
              farm.token.address !== farm.quoteToken.address &&
              (stableTokens.includes( farm.token.symbol ) && stableTokens.includes( farm.quoteToken.symbol ))
            )
          }

          if ( farmType === FARM_TYPES.STABLES ) {
            return (
              farm.token.address !== farm.quoteToken.address &&
              (stableTokens.includes( farm.token.symbol ) || stableTokens.includes( farm.quoteToken.symbol ))
            )
          }

          return true
        } )
      }

      if ( query ) {
        const lowercaseQuery = latinise( query.toLowerCase() )
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter( ( farm: FarmWithStakedValue ) => {
          return latinise( farm.lpSymbol.toLowerCase() ).includes( lowercaseQuery )
        } )
      }
      return farmsToDisplayWithAPR
    },
    [ cakePrice, farmType, query ],
  )

  const handleChangeQuery = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setQuery( event.target.value )
  }

  const [ numberOfFarmsVisible, setNumberOfFarmsVisible ] = useState( NUMBER_OF_FARMS_VISIBLE )

  const chosenFarmsMemoized = useMemo( () => {
    let chosenFarms = []

    const sortFarms = ( farms: FarmWithStakedValue[] ): FarmWithStakedValue[] => {
      switch ( sortOption ) {
        case 'apr':
          return orderBy( farms, ( farm: FarmWithStakedValue ) => farm.apr + farm.lpRewardsApr, 'desc' )
        case 'multiplier':
          return orderBy(
            farms,
            ( farm: FarmWithStakedValue ) => (farm.multiplier ? Number( farm.multiplier.slice( 0, -1 ) ) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            ( farm: FarmWithStakedValue ) => (farm.userData ? Number( farm.userData.earnings ) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy( farms, ( farm: FarmWithStakedValue ) => Number( farm.liquidity ), 'desc' )
        default:
          return farms
      }
    }

    if ( isActive ) {
      chosenFarms = stakedOnly ? farmsList( stakedOnlyFarms ) : farmsList( activeFarms )
    }

    return sortFarms( chosenFarms ).slice( 0, numberOfFarmsVisible )
  }, [
    sortOption,
    activeFarms,
    farmsList,
    isActive,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ] )

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect( () => {
    if ( isIntersecting ) {
      setNumberOfFarmsVisible( ( farmsCurrentlyVisible ) => {
        if ( farmsCurrentlyVisible <= chosenFarmsLength.current ) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      } )
    }
  }, [ isIntersecting ] )

  const rowData = chosenFarmsMemoized.map( ( farm ) => {
    //! console.debug('FarmRowData', farm);

    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split( ' ' )[0].toUpperCase()

    const row: RowProps = {
      apr: {
        value: getDisplayApr( farm.apr, farm.lpRewardsApr ),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber( new BigNumber( farm.userData.earnings ) ),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  } )

  const renderContent = (): JSX.Element => {
    if ( viewMode === ViewMode.TABLE && rowData.length ) {
      const columns = DesktopColumnSchema.map( ( column ) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: ( a: RowType<RowProps>, b: RowType<RowProps> ) => {
          switch ( column.name ) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if ( a.original.apr.value && b.original.apr.value ) {
                return Number( a.original.apr.value ) - Number( b.original.apr.value )
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }) )

      return <Table data={ rowData } columns={ columns } userDataReady={ userDataReady }/>
    }

    return (
      <FlexLayout>
        <Route exact path={ `${ path }` }>
          { chosenFarmsMemoized.map( ( farm ) => (
            <FarmCard
              key={ farm.pid }
              farm={ farm }
              displayApr={ getDisplayApr( farm.apr, farm.lpRewardsApr ) }
              cakePrice={ cakePrice }
              account={ account }
              removed={ false }
            />
          ) ) }
        </Route>
        <Route exact path={ `${ path }/history` }>
          { chosenFarmsMemoized.map( ( farm ) => (
            <FarmCard
              key={ farm.pid }
              farm={ farm }
              displayApr={ getDisplayApr( farm.apr, farm.lpRewardsApr ) }
              cakePrice={ cakePrice }
              account={ account }
              removed
            />
          ) ) }
        </Route>
        <Route exact path={ `${ path }/archived` }>
          { chosenFarmsMemoized.map( ( farm ) => (
            <FarmCard
              key={ farm.pid }
              farm={ farm }
              displayApr={ getDisplayApr( farm.apr, farm.lpRewardsApr ) }
              cakePrice={ cakePrice }
              account={ account }
              removed
            />
          ) ) }
        </Route>
      </FlexLayout>
    )
  }

  const handleSortOptionChange = ( option: OptionProps ): void => {
    setSortOption( option.value )
  }

  const handleFarmTypeChange = ( option: OptionProps ): void => {
    setFarmType( option.value )
  }

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          { t( 'Farms' ) }
        </Heading>
        <Heading scale="lg" color="text">
          { t( 'Stake LP tokens to earn.' ) }
        </Heading>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={ viewMode } onToggle={ ( mode: ViewMode ) => setViewMode( mode ) }/>
            <ToggleWrapper>
              <Toggle
                id="staked-only-farms"
                checked={ stakedOnly }
                onChange={ () => setStakedOnly( !stakedOnly ) }
                scale="sm"
              />
              <Text> { t( 'Staked only' ) }</Text>
            </ToggleWrapper>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{ t( 'Farm type' ) }</Text>
              <Select
                options={ [
                  {
                    label: t( 'All' ),
                    value: FARM_TYPES.ALL,
                  },
                  {
                    label: t( 'Single Assets' ),
                    value: FARM_TYPES.SINGLE_ASSETS,
                  },
                  {
                    label: t( 'Stable LPs' ),
                    value: FARM_TYPES.STABLE_LPS,
                  },
                  {
                    label: t( 'Stables' ),
                    value: FARM_TYPES.STABLES,
                  },
                ] }
                onOptionChange={ handleFarmTypeChange }
              />
            </LabelWrapper>
            <LabelWrapper style={ { marginLeft: 16 } }>
              <Text textTransform="uppercase">{ t( 'Sort by' ) }</Text>
              <Select
                options={ [
                  {
                    label: t( 'Hot' ),
                    value: 'hot',
                  },
                  {
                    label: t( 'APR' ),
                    value: 'apr',
                  },
                  {
                    label: t( 'Multiplier' ),
                    value: 'multiplier',
                  },
                  {
                    label: t( 'Earned' ),
                    value: 'earned',
                  },
                  {
                    label: t( 'Liquidity' ),
                    value: 'liquidity',
                  },
                ] }
                onOptionChange={ handleSortOptionChange }
              />
            </LabelWrapper>
            <SearchWrapper>
              <Text textTransform="uppercase">{ t( 'Search' ) }</Text>
              <SearchInput onChange={ handleChangeQuery } placeholder="Search Farms"/>
            </SearchWrapper>
          </FilterContainer>
        </ControlContainer>
        { renderContent() }
        { account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading/>
          </Flex>
        ) }
        <div ref={ observerRef }/>
      </Page>
    </>
  )
}

export default Farms
