import React from 'react';
import styled from 'styled-components';

const ScaleSelect = styled.form`

`;

const NoteSelect = styled.select`

`;

const MajorOrMinor = styled.select`

`;

const ScaleAndNoteOption = styled.option`

`;

const GetNotesButton = styled.button`

`;

class ScaleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      scale: null
    };

    this.getNotes = this.getNotes.bind(this);
  }

  onNoteSelection(e) {
    this.setState({
      note: e.target.value
    });
  }

  onScaleSelection(e) {
    this.setState({
      scale: e.target.value
    });
  }

  getNotes() {

  }

  render() {
    return (
      <ScaleSelect>
        <h5>Note: </h5>
        <NoteSelect>
          <ScaleAndNoteOption value='A'>A</ScaleAndNoteOption>
          <ScaleAndNoteOption value='A#'>A#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='B'>B</ScaleAndNoteOption>
          <ScaleAndNoteOption value='C'>C</ScaleAndNoteOption>
          <ScaleAndNoteOption value='C#'>C#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='D'>D</ScaleAndNoteOption>
          <ScaleAndNoteOption value='D#'>D#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='E'>E</ScaleAndNoteOption>
          <ScaleAndNoteOption value='F'>F</ScaleAndNoteOption>
          <ScaleAndNoteOption value='F#'>F#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='G'>G</ScaleAndNoteOption>
          <ScaleAndNoteOption value='G#'>G#</ScaleAndNoteOption>
        </NoteSelect>
        <h5>Scale: </h5>
        <MajorOrMinor>
          <ScaleAndNoteOption value="major">Major</ScaleAndNoteOption>
          <ScaleAndNoteOption value="minor">Minor</ScaleAndNoteOption>
        </MajorOrMinor>
        <GetNotesButton onClick={this.getNotes}>Get Notes</GetNotesButton>
      </ScaleSelect>
    );

  }

};

export default ScaleForm;