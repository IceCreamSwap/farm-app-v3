import React from 'react';
import PageSection from 'components/PageSection';
import useTheme from 'hooks/useTheme';
import { PageMeta } from 'components/Layout/Page';
import { earnSectionData, swapSectionData } from './components/SalesSection/data';
import MetricsSection from './components/MetricsSection';
import SalesSection from './components/SalesSection';
import { InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopLeft, WedgeTopRight } from './components/WedgeSvgs';

const Home: React.FC = () => {
    const { theme } = useTheme();

    const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' };

    return (
        <>
            <PageMeta/>
            <PageSection
                innerProps={ { style: { margin: '0', width: '100%' } } }
                background={
                    theme.isDark
                        ? 'linear-gradient(180deg, #590059 22%, #280028 100%)'
                        : 'linear-gradient(180deg, #c76ec9 22%, #8b0a8b 100%)'
                }
                index={ 2 }
                hasCurvedDivider={ false }
            >
                <MetricsSection/>
            </PageSection>

            <PageSection
                innerProps={ { style: HomeSectionContainerStyles } }
                background={ theme.colors.background }
                index={ 2 }
                hasCurvedDivider={ false }
            >
                <OuterWedgeWrapper>
                    <InnerWedgeWrapper top fill={ theme.isDark ? '#280028' : '#8b0a8b' }>
                        <WedgeTopLeft/>
                    </InnerWedgeWrapper>
                </OuterWedgeWrapper>
                <SalesSection { ...swapSectionData } />
            </PageSection>

            <PageSection
                innerProps={ { style: HomeSectionContainerStyles } }
                background={
                    theme.isDark
                        ? 'linear-gradient(111.68deg, #3f003f 22%, #5e005e 100%)'
                        : 'linear-gradient(111.68deg, #ffd5fb 22%, #efdfef 100%)'
                }
                index={ 2 }
                hasCurvedDivider={ false }
            >
                <OuterWedgeWrapper>
                    <InnerWedgeWrapper width="150%" top fill={ theme.colors.background }>
                        <WedgeTopRight/>
                    </InnerWedgeWrapper>
                </OuterWedgeWrapper>
                <SalesSection { ...earnSectionData } />
            </PageSection>
        </>
    );
};

export default Home;
