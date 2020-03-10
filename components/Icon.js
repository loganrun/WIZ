import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

const IconContainer = styled.View`
  height: 55px;
  width: 55px;
  background-color: #f0f1f1;
  align-items: center;
  justify-content: center;
  border-radius: 100;
`;

const ExpoIcon = styled(AntDesign)`
  font-size: 24;
`;


const Icon = ({ iconName }) => (
  <IconContainer>
    <ExpoIcon name={iconName} />
  </IconContainer>
);

export default Icon;