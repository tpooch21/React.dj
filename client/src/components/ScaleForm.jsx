import React from 'react';
import ScaleVisualizer from './ScaleVisualizer.jsx';
import ScaleFormOption from './ScaleFormOption.jsx';
import SelectMenu from './SelectMenu.jsx';
import styled from 'styled-components';
import { device } from '../../public/assets/sizes';
import $ from 'jquery';

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

    this.musicalAlphabet = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    this.scaleTypes = ['Major', 'Minor'];
    this.octaves = ['3', '4', '5'];
    this.onFormSelection = this.onFormSelection.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  onFormSelection(e, type) {
    this.setState({
      [type]: e.target.value
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
          <SelectMenu options={this.musicalAlphabet} type='note' onChange={this.onFormSelection} />
          <SelectMenu options={this.scaleTypes} type='scale' onChange={this.onFormSelection} />
          <SelectMenu options={this.octaves} type='octave' onChange={this.onFormSelection} />
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

const ScaleDiv = styled.div`
  height: ${props => props.selected ? '200px' : '100px' };
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media ${device.mobileS} {
    max-width: 1023px;
    width: 80%;
  };
  @media ${device.laptop} {
    width: 40%;
  }
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

const ButtonWrapper = styled.div`
  height: 75px;
  display: flex;
  width: 100px
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const ScaleNoteOctaveOption = styled.option`
  font-family: Muli, sans-serif;
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

export default ScaleForm;