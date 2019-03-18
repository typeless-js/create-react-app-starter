import React from 'react';
import { DefaultSuspense } from 'src/components/DefaultSuspense';
import { FormState } from 'src/form';
import { RouteConfig } from 'src/types';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = 'Login';

// --- Actions ---
export const LoginActions = createActions(MODULE, {
  mounted: null,
  loaded: null,
  unloaded: null,
  replaced: null,
  setLoading: (isLoading: boolean) => ({ payload: { isLoading } }),
  setError: (error: string) => ({ payload: { error } }),
});

// --- Routing ---
const ModuleLoader = React.lazy(() => import('./module'));

const LoginRoute = () => (
  <DefaultSuspense>
    <ModuleLoader />
  </DefaultSuspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: false,
  path: '/login',
  component: <LoginRoute />,
};

// --- Types ---

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginState {
  isLoading: boolean;
  error: string;
}

declare module 'typeless/types' {
  export interface DefaultState {
    login: LoginState;
    loginForm: FormState<LoginFormValues>;
  }
}
