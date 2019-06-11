import React from 'react';
import { Sample2View } from './components/Sample2View';
import { Sample2State, handle } from './interface';

// --- Reducer ---
const initialState: Sample2State = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export default () => {
  handle();
  return <Sample2View />;
};
