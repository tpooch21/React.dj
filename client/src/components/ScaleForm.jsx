import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const ScaleDiv = styled.div`
  width: 20%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NoteSelect = styled.select`
  height: 25%;
`;

const MajorOrMinor = styled.select`
  height: 25%;
`;

const ScaleAndNoteOption = styled.option`

`;

const GetNotesButton = styled.button`
  height: 25%;
`;

class ScaleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: 'A',
      scale: 'Major',
      scaleNotes: []
    };

    this.onNoteSelection = this.onNoteSelection.bind(this);
    this.onScaleSelection = this.onScaleSelection.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  onNoteSelection(e) {
    console.log('Logging value here => ', e.target.value);
    this.setState({
      note: e.target.value
    });
  }

  onScaleSelection(e) {
    console.log('Logging value here => ', e.target.value);
    this.setState({
      scale: e.target.value
    });
  }

  getNotes() {
    let scaleName = `${this.state.note}${this.state.scale}`;
    $.ajax({
      url: `scale/${scaleName}/notes`,
      method: 'GET',
      success: (data) => {
        console.log('Logging return notes => ', data.notes);
        this.setState({
          scaleNotes: data
        });
      },
      error: () => {
        console.log('Error requesting data from server');
      }
    });
  }

  render() {
    return (
      <ScaleDiv>
        <h5>Note: </h5>
        <NoteSelect onChange={(e) => this.onNoteSelection(e)}>
          <ScaleAndNoteOption value='A'>A</ScaleAndNoteOption>
          <ScaleAndNoteOption value='Asharp'>A#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='B'>B</ScaleAndNoteOption>
          <ScaleAndNoteOption value='C'>C</ScaleAndNoteOption>
          <ScaleAndNoteOption value='Csharp'>C#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='D'>D</ScaleAndNoteOption>
          <ScaleAndNoteOption value='Dsharp'>D#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='E'>E</ScaleAndNoteOption>
          <ScaleAndNoteOption value='F'>F</ScaleAndNoteOption>
          <ScaleAndNoteOption value='Fsharp'>F#</ScaleAndNoteOption>
          <ScaleAndNoteOption value='G'>G</ScaleAndNoteOption>
          <ScaleAndNoteOption value='Gsharp'>G#</ScaleAndNoteOption>
        </NoteSelect>
        <h5>Scale: </h5>
        <MajorOrMinor onChange={(e) => this.onScaleSelection(e)}>
          <ScaleAndNoteOption value="Major">Major</ScaleAndNoteOption>
          <ScaleAndNoteOption value="Minor">Minor</ScaleAndNoteOption>
        </MajorOrMinor>
        <GetNotesButton onClick={this.getNotes}>Get Notes</GetNotesButton>
      </ScaleDiv>
    );

  }

};

export default ScaleForm;