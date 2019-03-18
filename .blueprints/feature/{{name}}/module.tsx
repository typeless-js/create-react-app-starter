import React from 'react';
import { createEpic, createReducer, useModule } from 'typeless';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';
import { {{pascalCase name}}Actions, {{pascalCase name}}State, MODULE } from './interface';

// --- Epic ---
export const epic = createEpic(MODULE);

// --- Reducer ---
const initialState: {{pascalCase name}}State = {
  foo: 'bar',
};

export const reducer = createReducer(initialState);

// --- Module ---
export default () => {
  useModule({
    epic,
    reducer,
    reducerPath: ['{{name}}'],
    actions: {{pascalCase name}}Actions,
  });
  return <{{pascalCase name}}View />;
};
