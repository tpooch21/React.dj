import React from 'react';
import styled, { keyframes } from 'styled-components';
import NoteInScale from './NoteInScale.jsx';

const ScaleVisualizer = (props) => (
  <ScaleVisualizerWrapper>
    {props.notes.map(note => {
      return <NoteInScale
              key={note}
              note={note}
              selectNote={props.selectNote}/>
    })}
  </ScaleVisualizerWrapper>
);

const slideDown = keyframes`
  0% {
    height: 0%;
  }
  50% {
    height: 50%;
  }
  100% {
    height: 100%;
  }
`;

const ScaleVisualizerWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

export default ScaleVisualizer;