import React from 'react';
import { DefaultSuspense } from 'src/components/DefaultSuspense';
import { RouteConfig } from 'src/types';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = '{{name}}';

// --- Actions ---
export const {{pascalCase name}}Actions = createActions(MODULE, {});

// --- Routing ---
const ModuleLoader = React.lazy(() => import('./module'));

const {{pascalCase name}}Route = () => (
  <DefaultSuspense>
    <ModuleLoader />
  </DefaultSuspense>
);

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: true,
  path: '/{{dashCase name}}',
  component: <{{pascalCase name}}Route />,
};

// --- Types ---
export interface {{pascalCase name}}State {
  foo: string;
}

declare module 'typeless/types' {
  export interface DefaultState {
    {{name}}: {{pascalCase name}}State;
  }
}
