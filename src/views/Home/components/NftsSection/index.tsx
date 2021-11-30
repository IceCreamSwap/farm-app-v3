import React from 'react';
import { Button, Flex, Link, Text } from 'uikit';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import ColoredWordHeading from '../ColoredWordHeading';

const ImagesWrapper = styled( Flex )`
    position: relative;
`;

const NftsSection: React.FC = ( props ) => {
    const { t } = useTranslation();

    return (
        <Flex
            flexDirection={ [ 'column-reverse', null, null, 'row' ] }
            alignItems={ [ 'flex-end', null, null, 'center' ] }
            justifyContent="center"
            minHeight={ 400 }
        >
            <Flex
                flexDirection="column"
                flex="1"
                ml={ [ null, null, null, null ] }
                mr={ [ null, null, null, '64px' ] }
                alignSelf={ [ 'flex-start', null, null, 'center' ] }
            >
                <ColoredWordHeading text={ t( 'NFT\'s Reimagined.' ) }/>
                <Text color="textSubtle" mb="24px" style={ { whiteSpace: 'pre-wrap' } }>
                    { t( 'Unique design incorporating the best amongst the blockchain universe and in Development' ) }
                </Text>
                <Flex>
                    <Button mr="16px">
                        <RouterLink to='/nfts'>
                            <Text color="card" bold fontSize="16px">
                                { t( 'Check out' ) }
                            </Text>
                        </RouterLink>
                    </Button>
                    <Link external href='https://docs.pancakeswap.finance/'>
                        { t( 'Learn' ) }
                    </Link>
                </Flex>
            </Flex>
            <ImagesWrapper>
                <img src='/images/home/nfts/shop.png' alt='Shop' style={ { height: '300px' } }/>
                <img src='/images/home/nfts/coin.gif' alt='Coin' style={ { position: 'absolute', top: 27, left: -24 } }/>
            </ImagesWrapper>
        </Flex>
    );
};

export default NftsSection;
