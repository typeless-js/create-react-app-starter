import React from 'react';
import { DefaultSuspense } from 'src/components/DefaultSuspense';
import { RouteConfig } from 'src/types';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = 'sample1';

// --- Actions ---
export const Sample1Actions = createActions(MODULE, {});

// --- Routing ---
const ModuleLoader = React.lazy(() => import('./module'));

const Sample1Route = () => (
  <DefaultSuspense>
    <ModuleLoader />
  </DefaultSuspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: true,
  path: '/',
  component: <Sample1Route />,
};

// --- Types ---
export interface Sample1State {
  foo: string;
}

declare module 'typeless/types' {
  export interface DefaultState {
    sample1: Sample1State;
  }
}
