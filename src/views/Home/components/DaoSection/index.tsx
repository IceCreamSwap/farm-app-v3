import React from 'react';
import { Button, Flex, Link, Text } from 'uikit';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import ColoredWordHeading from '../ColoredWordHeading';

const DaoSection: React.FC = ( props ) => {
    const { t } = useTranslation();

    return (
        <Flex
            flexDirection="column"
            alignItems='flex-start'
            justifyContent='center'
            ml='50%'
            minHeight={380}
        >
            <ColoredWordHeading text={ t( 'DAO.' ) }/>
            <Text color="textSubtle" mb="24px" style={ { whiteSpace: 'pre-wrap' } }>
                { t( 'Community engagement has never had a better place. VANI for association.\nDecisiveness is for the decentralized.' ) }
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
    );
};

export default DaoSection;
