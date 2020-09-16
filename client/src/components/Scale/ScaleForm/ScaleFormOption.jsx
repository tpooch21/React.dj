import React from 'react';
import styled from 'styled-components';

const ScaleFormOption = props => {
  let value = props.value;

  // If value is a note with a sharp symbol (A#) change # to 'sharp' (how it's stored in database)
  if (props.type === 'note' && props.value.length === 2) {
    value = props.value[0] + 'sharp';
  }

  return (
    <ScaleOption value={value}>{props.value}</ScaleOption>
  );
};

const ScaleOption = styled.option`
  font-family: inherit;
  width: 100%;
`;

export default ScaleFormOption;