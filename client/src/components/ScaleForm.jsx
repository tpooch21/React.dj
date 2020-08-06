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

const SelectWrapper = styled.div`
  height: 75px;
  display: flex;
  width: 100px
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NoteScaleOctaveSelect = styled.select`
  height: 25px;
  margin-right: 35px;
`;

const ScaleNoteOctaveOption = styled.option`
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
  cursor: pointer;
`;

class ScaleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: 'A',
      scale: 'Major',
      octave: 3,
      scaleNotes: [],
      scaleSelected: false
    };

    this.onNoteSelection = this.onNoteSelection.bind(this);
    this.onScaleSelection = this.onScaleSelection.bind(this);
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

  onOctaveSelection(e) {
    this.setState({
      octave: e.target.value
    });
  }

  getNotes() {
    let scaleName = `${this.state.note}${this.state.scale}`;
    $.ajax({
      url: `scale/${scaleName}/notes`,
      method: 'GET',
      success: (data) => {
        let notesInOctave = [];
        let currentOctave = this.state.octave;

        data.notes.forEach((note, i) => {
          if (note.indexOf('C') > -1 && i !== 0) {
            currentOctave++;
          }
          notesInOctave.push(`${note}${currentOctave}`);
        });

        this.setState({
          scaleNotes: notesInOctave,
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
          <SelectWrapper>
            <SelectLabel>Note:</SelectLabel>
            <NoteScaleOctaveSelect onChange={(e) => this.onNoteSelection(e)}>
              <ScaleNoteOctaveOption value='A'>A</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='Asharp'>A#</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='B'>B</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='C'>C</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='Csharp'>C#</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='D'>D</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='Dsharp'>D#</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='E'>E</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='F'>F</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='Fsharp'>F#</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='G'>G</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value='Gsharp'>G#</ScaleNoteOctaveOption>
            </NoteScaleOctaveSelect>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>Scale:</SelectLabel>
            <NoteScaleOctaveSelect onChange={(e) => this.onScaleSelection(e)}>
              <ScaleNoteOctaveOption value="Major">Major</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value="Minor">Minor</ScaleNoteOctaveOption>
            </NoteScaleOctaveSelect>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>Octave:</SelectLabel>
            <NoteScaleOctaveSelect onChange={(e) => this.onOctaveSelection(e)}>
              <ScaleNoteOctaveOption value="3">3</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value="4">4</ScaleNoteOctaveOption>
              <ScaleNoteOctaveOption value="5">5</ScaleNoteOctaveOption>
            </NoteScaleOctaveSelect>
          </SelectWrapper>
          <ButtonWrapper>
            <GetNotesButton onClick={this.getNotes}>Get Notes</GetNotesButton>
          </ButtonWrapper>
        </MenuDiv>
        {this.state.scaleSelected &&
        <ScaleVisualizer notes={this.state.scaleNotes} selectNote={this.props.selectNote}/>
        }
      </ScaleDiv>
    );

  }

};

export default ScaleForm;