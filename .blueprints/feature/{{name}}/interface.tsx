import React from 'react';
import { DefaultSuspense } from 'src/components/DefaultSuspense';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { {{pascalCase name}}Symbol } from './symbol';


// --- Actions ---
export const [handle, {{pascalCase name}}Actions, get{{pascalCase name}}State] = createModule({{pascalCase name}}Symbol)
  .withActions({})
  .withState<{{pascalCase name}}State >();

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
