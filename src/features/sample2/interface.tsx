import React from 'react';
import { DashboardSuspense } from 'src/components/DashboardSuspense';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { Sample2Symbol } from './symbol';

// --- Actions ---
export const [handle] = createModule(Sample2Symbol).withState<Sample2State>();

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
