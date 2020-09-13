import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';
import {Pause} from '@styled-icons/foundation/Pause';

const pauseController = props => (
  <PauseWrapper
    playing={props.playing}
    onClick={props.click}>
    <PauseIcon />
  </PauseWrapper>
);

const PauseWrapper = styled.div`
  border-radius: 50%;
  background-color: #1c1c1c;
  background: ${props => props.playing ? 'linear-gradient(145deg, #191919, #1e1e1e)' : '#f28c26'};
  box-shadow:  6px 6px 12px #131313,
             -6px -6px 12px #252525;
  position: relative;
  cursor: pointer;
  margin-left: 20px;
  margin-bottom: 20px;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 70px;
    width: 70px;
  };
  @media ${device.laptop} {
    width: 50px;
    height: 50px;
  }
`;

const PauseIcon = styled(Pause)`
  color: white;
  position: absolute;
  top: 7px;
  left: 7px;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 55px;
  };
  @media ${device.laptop} {
    height: 35px;
  }
`;

export default pauseController;

