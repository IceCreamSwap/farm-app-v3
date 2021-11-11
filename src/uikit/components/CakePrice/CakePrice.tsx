import React from 'react'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import { PancakeRoundIcon } from '../Svg'
import Text from '../Text/Text'
import Skeleton from '../Skeleton/Skeleton'
import { Colors } from '../../theme'
import { PCS_URL } from '../../../config'

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const CakePrice: React.FC<Props> = ( { cakePriceUsd, color = 'textSubtle' } ) => {
  return cakePriceUsd ? (
    <PriceLink
      href={ `${ PCS_URL }/swap?outputCurrency=${ tokens.spk.address }` }
      target="_blank"
    >
      <PancakeRoundIcon width="24px" mr="8px"/>
      <Text color={ color } bold>{ `$${ cakePriceUsd.toFixed( 3 ) }` }</Text>
    </PriceLink>
  ) : (
    <Skeleton width={ 80 } height={ 24 }/>
  )
}

export default React.memo( CakePrice )
