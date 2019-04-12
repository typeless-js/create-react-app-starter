import React from 'react';
import { DefaultSuspense } from 'src/components/DefaultSuspense';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { LoginSymbol } from './symbol';

export const [handle, LoginActions, getLoginState] = createModule(LoginSymbol)
  .withActions({
    $mounted: null,
    setLoading: (isLoading: boolean) => ({ payload: { isLoading } }),
    setError: (error: string) => ({ payload: { error } }),
    a: null,
  })
  .withState<LoginState>();

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
