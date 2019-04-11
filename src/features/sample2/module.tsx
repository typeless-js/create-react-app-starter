import React from 'react';
import { Sample2View } from './components/Sample2View';
import { handle, Sample2State } from './interface';

// --- Reducer ---
const initialState: Sample2State = {
  foo: 'bar',
};

handle.reducer(initialState);

const useSample2Module = () => handle();

// --- Module ---
export default () => {
  useSample2Module();
  return <Sample2View />;
};
