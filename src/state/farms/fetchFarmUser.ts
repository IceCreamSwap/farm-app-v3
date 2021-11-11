import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'

export const fetchFarmUserAllowances = async ( account: string, farmsToFetch: SerializedFarmConfig[] ) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map( ( farm ) => {
    const lpContractAddress = getAddress( farm.lpAddresses )
    return { address: lpContractAddress, name: 'allowance', params: [ account, masterChefAddress ] }
  } )

  const rawLpAllowances = await multicall( erc20ABI, calls )
  return rawLpAllowances.map( ( lpBalance ) => {
    return new BigNumber( lpBalance ).toJSON()
  } )
}

export const fetchFarmUserTokenBalances = async ( account: string, farmsToFetch: SerializedFarmConfig[] ) => {
  const calls = farmsToFetch.map( ( farm ) => {
    const lpContractAddress = getAddress( farm.lpAddresses )
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [ account ],
    }
  } )

  const rawTokenBalances = await multicall( erc20ABI, calls )
  const parsedTokenBalances = rawTokenBalances.map( ( tokenBalance ) => {
    return new BigNumber( tokenBalance ).toJSON()
  } )
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async ( account: string, farmsToFetch: SerializedFarmConfig[] ) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map( ( farm ) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [ farm.pid, account ],
    }
  } )

  const rawStakedBalances = await multicall( masterchefABI, calls )

  return rawStakedBalances.map( ( stakedBalance ) => {
    return new BigNumber( stakedBalance[0]._hex ).toJSON()
  } )
}

export const fetchFarmUserEarnings = async ( account: string, farmsToFetch: SerializedFarmConfig[] ) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map( ( farm ) => {
    return {
      address: masterChefAddress,
      name: 'pendingReward',
      params: [ farm.pid, account ],
    }
  } )

  const rawEarnings = await multicall( masterchefABI, calls )

  return rawEarnings.map( ( earnings ) => {
    return new BigNumber( earnings ).toJSON()
  } )
}
