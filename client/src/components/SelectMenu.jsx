import React from 'react';
import ScaleFormOption from './ScaleFormOption.jsx';
import styled from 'styled-components';

const SelectMenu = props => (
  <SelectWrapper>
    <SelectLabel>Note:</SelectLabel>
    <NoteScaleOctaveSelect onChange={(e) => {props.onChange(e, props.type)}}>
    {props.options.map(option => {
      return <ScaleFormOption key={option} value={option}/>
    })}
    </NoteScaleOctaveSelect>
  </SelectWrapper>
);

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

const SelectLabel = styled.h4`
  color: white;
  font-family: Muli, sans-serif;
  margin-right: 10px;
`;

export default SelectMenu;