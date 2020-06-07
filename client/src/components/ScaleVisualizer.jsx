import React from 'react';
import styled from 'styled-components';
// import Note from './Note.jsx';

const ScaleVisualizerWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ScaleVisualizer = (props) => (
  <ScaleVisualizerWrapper>
    {/* {props.forEach(note => {
      return <Note note={note} />
    })} */}
  </ScaleVisualizerWrapper>
);

export default ScaleVisualizer;