import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

export const note = props => {
  let note = <NoteButtonEmpty></NoteButtonEmpty>;

  if (props.noteSelections[props.id]) {
    note = <NoteButtonFilled onClick={props.remove}>{props.noteSelections[props.id]}</NoteButtonFilled>
  }

  return note;
};

const NoteButtonEmpty = styled.button`
  border-radius: 15px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 75px;
    width: 75px;
  };
  @media ${device.laptop} {
    width: 50px;
    height: 50px;
  }
`;

const NoteButtonFilled = styled.button`
  border-radius: 15px;
  background: #f28c26;
  color: black;
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
  font-weight: bold;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 75px;
    width: 75px;
    font-size: 24px;
  };
  @media ${device.laptop} {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }
`;

export default note;

