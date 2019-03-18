import { User } from 'src/types';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = 'global';

// --- Actions ---
export const GlobalActions = createActions(MODULE, {
  loaded: null,
  unloaded: null,
  replaced: null,
  loggedIn: (user: User) => ({ payload: { user } }),
});

// --- Types ---
export interface GlobalState {
  isLoaded: boolean;
  user: User | null;
}

declare module 'typeless/types' {
  export interface DefaultState {
    global: GlobalState;
  }
}
