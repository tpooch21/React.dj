import React from 'react';
import styled from 'styled-components';
import Note from './Note.jsx';

const ScaleVisualizerWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const ScaleVisualizer = (props) => (
  <ScaleVisualizerWrapper>
    {props.notes.map(note => {
      return <Note note={note} selectNote={props.selectNote}/>
    })}
  </ScaleVisualizerWrapper>
);

export default ScaleVisualizer;