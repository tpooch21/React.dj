import React from 'react';
import ScaleVisualizer from '../ScaleVisualizer/ScaleVisualizer.jsx';
import ScaleFormOption from './ScaleFormOption.jsx';
import ScaleSelect from './ScaleSelect.jsx';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';
import $ from 'jquery';

const musicalAlphabet = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const scaleTypes = ['Major', 'Minor'];
const octaves = ['3', '4', '5'];

const scaleForm = props =>  {
  return (
    <ScaleDiv selected={props.selected}>
      <MenuDiv>
        <ScaleSelect
          options={musicalAlphabet}
          type='note'
          onChange={props.change}
          label='Note'
          value={props.currentNote}/>
        <ScaleSelect
          options={scaleTypes}
          type='scale'
          onChange={props.change}
          label='Scale'
          value={props.currentScale}/>
        <ScaleSelect
          options={octaves}
          type='octave'
          onChange={props.change}
          label='Octave'
          value={props.currentOctave}/>
        <ButtonWrapper>
          <GetNotesButton onClick={props.getNotes}>Get Notes</GetNotesButton>
        </ButtonWrapper>
      </MenuDiv>
      {props.selected &&
      <ScaleVisualizer
        notes={props.notes}
        selectNote={props.selectNote}/>
      }
    </ScaleDiv>
  );
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

export default scaleForm;