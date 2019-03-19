import React from 'react';
import { DashboardSuspense } from 'src/components/DashboardSuspense';
import { RouteConfig } from 'src/types';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = 'sample2';

// --- Actions ---
export const Sample2Actions = createActions(MODULE, {});

// --- Routing ---
const ModuleLoader = React.lazy(() => import('./module'));

const Sample2Route = () => (
  <DashboardSuspense>
    <ModuleLoader />
  </DashboardSuspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: true,
  path: '/sample2',
  component: <Sample2Route />,
};

// --- Types ---
export interface Sample2State {
  foo: string;
}

declare module 'typeless/types' {
  export interface DefaultState {
    sample2: Sample2State;
  }
}
