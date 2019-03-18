import React from 'react';
import * as Rx from 'src/rx';
import { login } from 'src/services/API';
import { batchUpdate, createEpic, createReducer, useModule } from 'typeless';
import { GlobalActions } from '../global/interface';
import { RouterActions } from '../router/interface';
import { LoginView } from './components/LoginView';
import { LoginActions, LoginState, MODULE } from './interface';
import { LoginFormActions, useLoginForm } from './login-form';

// --- Epic ---
export const epic = createEpic(MODULE).on(
  LoginFormActions.setSubmitSucceeded,
  (_, { getState }) => {
    const { values } = getState().loginForm;
    return Rx.concatObs(
      Rx.of(LoginActions.setLoading(true)),
      Rx.of(LoginActions.setError('')),
      login(values.username, values.password).pipe(
        Rx.map(({ user, token }) => {
          return batchUpdate([
            GlobalActions.loggedIn(user),
            RouterActions.push('/'),
          ]);
        }),
        Rx.catchLog(e => Rx.of(LoginActions.setError(e.message))),
      ),
      Rx.of(LoginActions.setLoading(false)),
    );
  },
);

// --- Reducer ---
const initialState: LoginState = {
  isLoading: false,
  error: '',
};

export const reducer = createReducer(initialState)
  .on(LoginActions.setLoading, (state, { isLoading }) => {
    state.isLoading = isLoading;
  })
  .on(LoginActions.setError, (state, { error }) => {
    state.error = error;
  });

// --- Module ---
export default () => {
  useModule({
    epic,
    reducer,
    reducerPath: ['login'],
    actions: LoginActions,
  });
  useLoginForm();
  return <LoginView />;
};
