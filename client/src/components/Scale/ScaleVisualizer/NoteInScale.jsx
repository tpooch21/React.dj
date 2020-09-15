import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

const noteInScale = (props) => (
  <NoteButton onClick={() => {props.selectNote(props.note)}}>{props.note}</NoteButton>
);

const NoteButton = styled.button`
  border-radius: 50%;
  color: #f28c26;
  background: linear-gradient(145deg, #191919, #1e1e1e);
  box-shadow:  6px 6px 12px #131313,
              -6px -6px 12px #252525;
  cursor: pointer;
  &:hover {
    background: #f28c26;
    outline: none;
    color: black;
  };
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 65px;
    width: 65px;
    font-size: 18px;
  };
  @media ${device.laptop} {
    height: 50px;
    width: 50px;
    font-size: 14px;
  };
`;

export default noteInScale;