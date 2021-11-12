import React from 'react';
import { ChartIcon, CommunityIcon, FireIcon, Flex, Heading, Image, SwapIcon, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import useTheme from 'hooks/useTheme';
import { formatNumber } from 'utils/formatBalance';
import IconCard, { IconCardData } from '../IconCard';
import StatCardContent from './StatCardContent';
import { usePollFarmsPublicData } from '../../../../state/farms/hooks';
import { useFetchPublicPoolsData } from '../../../../state/pools/hooks';
import { useTotalValueLocked } from '../../../../hooks/useTotalValueLocked';

const Stats = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    usePollFarmsPublicData()
    useFetchPublicPoolsData()

    const totalValueLocked = useTotalValueLocked()
    const tvlString = totalValueLocked || '_'

    const totalBurnedTokens = formatNumber( 8765, 0, 0 ); // TODO: GET FROM CONTRACT.

    const BurnedCardData: IconCardData = {
        icon: <FireIcon color="secondary" width="36px"/>,
    };

    const StakedCardData: IconCardData = {
        icon: <ChartIcon color="secondary" width="36px"/>,
    };

    const DoxedDevsCardData: IconCardData = {
        icon: <CommunityIcon color="secondary" width="36px"/>,
    };

    return (
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <Image src="/images/logo/logo-vertical.svg" alt="IceCream" width={ 110 } height={ 110 }/>
            <Heading textAlign="center" scale="xl" mt="24px" mb="32px" color="#ffffff">
                { t( 'Audit and Certified.' ) }
            </Heading>

            <Text textAlign="center" color="#feb5ff">
                { t( 'Tried & True. Icecream in wake to become a decentralized autonomous organization with a resilient user base.' ) }
            </Text>

            <Text textAlign="center" color="#feb5ff" bold mb="32px">
                { t( 'Get in line' ) }
            </Text>

            <Flex flexDirection={ [ 'column', null, null, 'row' ] }>
                <IconCard { ...BurnedCardData } mr={ [ null, null, null, '16px' ] } mb={ [ '16px', null, null, '0' ] }>
                    <StatCardContent
                        headingText={ t( '%burned% burned', { burned: totalBurnedTokens } ) }
                        bodyText={ t( 'Total of burned VANI' ) }
                        highlightColor={ theme.colors.secondary }
                    />
                </IconCard>
                <IconCard { ...StakedCardData } mr={ [ null, null, null, '16px' ] }>
                    <StatCardContent
                        headingText={ t( '$%tvl% staked', { tvl: tvlString } ) }
                        bodyText={ t( 'Total Value Locked' ) }
                        highlightColor={ theme.colors.secondary }
                    />
                </IconCard>
                <IconCard { ...DoxedDevsCardData } mb={ [ '16px', null, null, '0' ] }>
                    <StatCardContent
                        headingText={ t( 'doxed devs' ) }
                        bodyText={ t( 'check them out here' ) }
                        highlightColor={ theme.colors.secondary }
                    />
                </IconCard>
            </Flex>
        </Flex>
    );
};

export default Stats;