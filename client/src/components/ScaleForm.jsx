import React from 'react';
import ScaleVisualizer from './ScaleVisualizer.jsx';
import styled from 'styled-components';
import $ from 'jquery';

const ScaleDiv = styled.div`
  width: 40%;
  height: ${props => props.selected ? '200px' : '100px' };
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MenuDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const SelectLabel = styled.h4`
  color: white;
  font-family: Muli, sans-serif;
  margin-right: 10px;
`;

const NoteWrapper = styled.div`
  height: 75px;
  display: flex;
  width: 100px
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NoteSelect = styled.select`
  height: 25px;
  margin-right: 35px;
`;

const MajorWrapper = styled.div`
  height: 75px;
  display: flex;
  width: 100px
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const MajorOrMinor = styled.select`
  height: 25px;
  margin-right: 35px;
`;

const ScaleAndNoteOption = styled.option`
  font-family: Muli, sans-serif;
`;

const ButtonWrapper = styled.div`
  height: 75px;
  display: flex;
  width: 100px
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const GetNotesButton = styled.button`
  height: 25px;
  font-family: Muli, sans-serif;
  color: white;
  border-radius: 11px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  5px 5px 10px #151515,
             -5px -5px 10px #232323;
`;

class ScaleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: 'A',
      scale: 'Major',
      scaleNotes: [],
      scaleSelected: false
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
        this.setState({
          scaleNotes: data.notes,
          scaleSelected: true
        });
      },
      error: () => {
        console.log('Error requesting data from server');
      }
    });
  }

  render() {
    return (
      <ScaleDiv selected={this.state.scaleSelected}>
        <MenuDiv>
          <NoteWrapper>
            <SelectLabel>Note:</SelectLabel>
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
          </NoteWrapper>
          <MajorWrapper>
            <SelectLabel>Scale:</SelectLabel>
            <MajorOrMinor onChange={(e) => this.onScaleSelection(e)}>
              <ScaleAndNoteOption value="Major">Major</ScaleAndNoteOption>
              <ScaleAndNoteOption value="Minor">Minor</ScaleAndNoteOption>
            </MajorOrMinor>
          </MajorWrapper>
          <ButtonWrapper>
            <GetNotesButton onClick={this.getNotes}>Get Notes</GetNotesButton>
          </ButtonWrapper>
        </MenuDiv>
        {this.state.scaleSelected &&
        <ScaleVisualizer notes={this.state.scaleNotes} />
        }
      </ScaleDiv>
    );

  }

};

export default ScaleForm;