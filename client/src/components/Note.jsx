import React from 'react';
import styled from 'styled-components';

const NoteButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(145deg, #191919, #1e1e1e);
  box-shadow:  6px 6px 12px #131313,
             -6px -6px 12px #252525;
  cursor: pointer;
  &:hover {
    background: #f28c26;
    outline: none;
  }
`;

const Note = (props) => (
  <NoteButton onClick={() => {props.playNote(props.note)}}>{props.note}</NoteButton>
);

export default Note;