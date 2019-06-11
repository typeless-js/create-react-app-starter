import React from 'react';
import { Sample1View } from './components/Sample1View';
import { Sample1State, handle } from './interface';

// --- Reducer ---
const initialState: Sample1State = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export default () => {
  handle();
  return <Sample1View />;
};
