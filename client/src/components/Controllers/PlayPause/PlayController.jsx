import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';
import {ControllerPlay} from '@styled-icons/entypo/ControllerPlay';

const playController = props => (
  <PlayWrapper
    playing={props.playing}
    onClick={props.click}>
    <ControllerIcon />
  </PlayWrapper>
);

const PlayWrapper = styled.div`
border-radius: 50%;
background-color: #1c1c1c;
background: ${props => props.playing ? '#f28c26' : 'linear-gradient(145deg, #191919, #1e1e1e)'};
box-shadow:  6px 6px 12px #131313,
           -6px -6px 12px #252525;
position: relative;
cursor: pointer;
margin-bottom: 20px;
margin-left: 15px;
@media ${device.mobileS} {
  max-width: 1023px;
  height: 70px;
  width: 70px;
};
@media ${device.laptop} {
  width: 50px;
  height: 50px;
};
`;

const ControllerIcon = styled(ControllerPlay)`
  color: white;
  height: 35px;
  position: absolute;
  top: 7px;
  left: 9px;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 55px;
    top: 8px;
    left: 10px;
  };
  @media ${device.laptop} {
    height: 35px;
    top: 7px;
    left: 9px;
  }
`;

export default playController;