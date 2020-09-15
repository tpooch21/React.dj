import React from 'react';
import styled from 'styled-components';

const ScaleFormOption = props => (
  <ScaleOption value={props.value}>{props.value}</ScaleOption>
);

const ScaleOption = styled.option`
  font-family: inherit;
  width: 100%;
`;

export default ScaleFormOption;