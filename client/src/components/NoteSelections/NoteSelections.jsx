import React from 'react';
import styled from 'styled-components';
import { device } from '../../../public/assets/sizes';

import NoteSelection from './NoteSelection/NoteSelection.jsx';

const noteMaker = new Array(4).fill(0);

const noteSelections = props => (
  <NoteSelectionWrapper>
    {noteMaker.map((_, i) => {
      return <NoteSelection
        key={i}
        id={i}
        remove={() => props.remove(i)}
        noteSelections={props.noteSelections} />
    })}
  </NoteSelectionWrapper>
);


const NoteSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
  @media ${device.mobileS} {
    max-width: 1023px;
    width: 90%;
    flex-direction: row;
    height: 100px;
  };
  @media ${device.laptop} {
    flex-direction: column;
    width: 100px;
    height: 375px;
  }
`;

export default noteSelections;