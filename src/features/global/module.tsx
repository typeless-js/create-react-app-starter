import { createEpic, createReducer, useModule } from 'typeless';
import { GlobalActions, GlobalState, MODULE } from './interface';

// --- Epic ---
export const epic = createEpic(MODULE);

// --- Reducer ---
const initialState: GlobalState = {
  isLoaded: false,
  user: null,
};

export const reducer = createReducer(initialState).on(
  GlobalActions.loggedIn,
  (state, { user }) => {
    state.user = user;
  },
);

// --- Module ---
export const useGlobalModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ['global'],
    actions: GlobalActions,
  });
