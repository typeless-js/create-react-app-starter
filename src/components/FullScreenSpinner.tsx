import React from 'react';
import styled from 'styled-components';
import { Spinner } from './Spinner';

export const FullScreenSpinner = styled.div.attrs({
  children: <Spinner black size="40px" />,
})`
  position: fixed;
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: blue;
`;
