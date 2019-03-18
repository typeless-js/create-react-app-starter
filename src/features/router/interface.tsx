import { LocationDescriptor } from 'history';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = '@@router';

// --- Actions ---
export const RouterActions = createActions(MODULE, {
  $mounted: null,
  locationChange: (data: RouterLocation) => ({
    payload: data,
  }),
  push: <S extends unknown>(location: LocationDescriptor<S>) => ({
    payload: location,
  }),
  replace: <S extends unknown>(location: LocationDescriptor<S>) => ({
    payload: location,
  }),
});

// --- Types ---
export interface RouterLocation {
  hash: string;
  pathname: string;
  search: string;
  state?: object;
}

export interface RouterState {
  location: RouterLocation | null;
  prevLocation: RouterLocation | null;
}

declare module 'typeless/types' {
  export interface DefaultState {
    router: RouterState;
  }
}
