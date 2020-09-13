import React from 'react';
import styled from 'styled-components';
import { device } from '../../public/assets/sizes';

const Note = (props) => (
  <NoteButton onClick={() => {props.selectNote(props.note)}}>{props.note}</NoteButton>
);

const NoteButton = styled.button`
  width: 50px;
  height: 50px;
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
    height: 65px;
    width: 65px;
    font-size: 18px;
  }
`;

export default Note;