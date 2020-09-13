import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

import BPMOption from './BPMOptions/BPMOption.jsx';

const bpmOptions = [
  ['375', '160'],
  ['430', '140'],
  ['500', '120'],
  ['600', '100'],
  ['750', '80'],
];

const bpmMenu = props => (
  <BPMMenuWrapper>
    {bpmOptions.map(option => {
      return <BPMOption
                key={option[0]}
                bpmDisplay={option[1]}
                bpmInMS={option[0]}
                currentBPM={props.currentBPM}
                onClick={() => props.changeBPM(option[0])} />
    })}
  </BPMMenuWrapper>
);

const BPMMenuWrapper = styled.div`
  height: 125px;
  width: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.mobileS} {
    flex-direction: row;
    width: auto;
    height: 45px;
  }
`;

export default bpmMenu;

