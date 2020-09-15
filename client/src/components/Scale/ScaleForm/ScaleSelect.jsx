import React from 'react';
import ScaleFormOption from './ScaleFormOption.jsx';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

const scaleSelect = props => (
  <SelectWrapper>
    <SelectLabel>{props.label}:</SelectLabel>
    <NoteScaleOctaveSelect
      value={props.value}
      onChange={(e) => {props.onChange(e, props.type)}}>
      {props.options.map(option => {
        return <ScaleFormOption
                  key={option}
                  value={option}/>
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
  height: auto;
  padding: 0 2px;
  width: auto;
  margin-right: 35px;
  border: 2px solid white;
  color: white;
  font-family: inherit;
  background-color: #1c1c1c;
  cursor: pointer;
  @media ${device.mobileS} {
    max-width: 1023px;
    font-size: 1.2rem;
  };
  @media ${device.laptop} {
    font-size: 0.8rem;
  }
`;

const SelectLabel = styled.h4`
  color: white;
  font-family: inherit;
  margin-right: 10px;
  @media ${device.mobileS} {
    max-width: 1023px;
    font-size: 1.8rem;
  };
  @media ${device.laptop} {
    font-size: 1.2rem;
  }
`;

export default scaleSelect;