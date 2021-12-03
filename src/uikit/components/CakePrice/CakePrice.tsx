import React from 'react';
import styled from 'styled-components';
import { BASE_SWAP_URL } from 'config';
import tokens from 'config/constants/tokens';
import Text from '../Text/Text';
import Skeleton from '../Skeleton/Skeleton';
import { Colors } from '../../theme';
import { TokenImage } from '../../../components/TokenImage';

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
`;

const StyledTokenImage = styled(TokenImage)`
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
`

const CakePrice: React.FC<Props> = ( { cakePriceUsd, color = 'textSubtle' } ) => {
    return cakePriceUsd ? (
        <PriceLink
            href={ `${ BASE_SWAP_URL }?outputCurrency=${ tokens.vani.address }` }
            target="_blank"
        >
            <StyledTokenImage height={ 24 } width={ 24 } token={ tokens.vani } />
            <Text color={ color } bold>{ `$${ cakePriceUsd.toFixed( 3 ) }` }</Text>
        </PriceLink>
    ) : (
        <Skeleton width={ 80 } height={ 24 }/>
    );
};

export default React.memo( CakePrice );
