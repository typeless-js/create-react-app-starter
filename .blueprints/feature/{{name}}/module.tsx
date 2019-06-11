import React from 'react';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';
import { {{pascalCase name}}Actions, {{pascalCase name}}State, handle } from './interface';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: {{pascalCase name}}State = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export default () => {
  handle();
  return <{{pascalCase name}}View />;
};
