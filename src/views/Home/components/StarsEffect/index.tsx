import React from 'react';
import styled from 'styled-components';
import './stars-effect.css';

const OuterWedgeWrapper = styled.div`
  z-index: -2;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0px;
  top: 0px;
`

const StarsEffect: React.FC = () => {
    return (
        <OuterWedgeWrapper>
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
        </OuterWedgeWrapper>
    )
}

export default StarsEffect;