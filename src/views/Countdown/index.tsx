import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'uikit';

import backgroundVideo from './assets/sample.mp4';
import Poster from './assets/poster.png';
import CountdownTimer from './CountdownTimer';

const PageWrapper = styled.div`
    height: 100vh;
`;

const Video = styled.video`
    object-fit: cover;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const TimerWrapper = styled(Flex)`
    background: rgba(100, 100, 100, 0.1) !important;
    backdrop-filter: blur(15px) !important;
    -webkit-backdrop-filter: blur(15px) !important;
    position: absolute;
    top: calc(50% - 125px);
    left: 35%;
    width: 500px;
    height: 250px;
    text-align: center;
    border: 1px solid #FFFFFF11;
    color: #FFFFFF;
    font-size: 32px;
    font-family: 'Kanit', sans-serif;
`;

const Countdown: React.FC = () => {
    return (
        <PageWrapper>
            <Video loop autoPlay id="coming-soon-video" muted poster={ Poster }>
                <source src={ backgroundVideo } type="video/mp4"/>
            </Video>
            <TimerWrapper flexDirection="column" alignItems="center" justifyContent="center">
                <img src="/images/logo/logo-square.png" alt="IceCream" height={ 140 } />
                <Text color="#FFFFFFAA" mt="1rem">Coming soon...</Text>
                <CountdownTimer timestamp={ 1638572400 }/>
            </TimerWrapper>
        </PageWrapper>
    );
};

export default Countdown;
