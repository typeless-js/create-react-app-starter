import React from 'react';
import { Sample1View } from './components/Sample1View';
import { handle, Sample1State } from './interface';

// --- Reducer ---
const initialState: Sample1State = {
  foo: 'bar',
};

handle.reducer(initialState);

const useSample1Module = () => handle();

// --- Module ---
export default () => {
  useSample1Module();
  return <Sample1View />;
};
