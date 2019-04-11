import React from 'react';
import * as Rx from 'src/rx';
import { login } from 'src/services/API';
import { setAccessToken } from 'src/services/Storage';
import { RouterActions } from 'typeless-router';
import { GlobalActions } from '../global/interface';
import { LoginView } from './components/LoginView';
import { handle, LoginActions, LoginState } from './interface';
import {
  getLoginFormState,
  LoginFormActions,
  useLoginForm,
} from './login-form';

// --- Epic ---
handle
  .epic()
  .on(LoginActions.$mounted, () => LoginFormActions.reset())
  .on(LoginFormActions.setSubmitSucceeded, () => {
    const { values } = getLoginFormState();
    return Rx.concatObs(
      Rx.of(LoginActions.setLoading(true)),
      Rx.of(LoginActions.setError('')),
      login(values.username, values.password).pipe(
        Rx.mergeMap(({ user, token }) => {
          setAccessToken(token);
          return Rx.from([
            GlobalActions.loggedIn(user),
            RouterActions.push('/'),
          ]);
        }),
        Rx.catchLog(e => Rx.of(LoginActions.setError(e.message)))
      ),
      Rx.of(LoginActions.setLoading(false))
    );
  });

// --- Reducer ---
const initialState: LoginState = {
  isLoading: false,
  error: '',
};

handle
  .reducer(initialState)
  .on(LoginActions.setLoading, (state, { isLoading }) => {
    state.isLoading = isLoading;
  })
  .on(LoginActions.setError, (state, { error }) => {
    state.error = error;
  });

const useLoginModule = () => handle();

// --- Module ---
export default () => {
  useLoginModule();
  useLoginForm();
  return <LoginView />;
};
