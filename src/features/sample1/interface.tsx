import React from 'react';
import { DashboardSuspense } from 'src/components/DashboardSuspense';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { Sample1Symbol } from './symbol';

// --- Actions ---
export const [handle] = createModule(Sample1Symbol).withState<Sample1State>();

// --- Routing ---
const ModuleLoader = React.lazy(() => import('./module'));

const Sample1Route = () => (
  <DashboardSuspense>
    <ModuleLoader />
  </DashboardSuspense>
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
