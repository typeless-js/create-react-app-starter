import * as Rx from 'src/rx';
import { getUser } from 'src/services/API';
import { clearAccessToken, getAccessToken } from 'src/services/Storage';
import { createEpic, createReducer, useModule } from 'typeless';
import { RouterActions } from '../router/interface';
import { GlobalActions, GlobalState, MODULE } from './interface';

// --- Epic ---
export const epic = createEpic(MODULE)
  .on(GlobalActions.$mounted, () => {
    if (getAccessToken()) {
      return getUser().pipe(Rx.map(GlobalActions.loggedIn));
    }
    return GlobalActions.loggedIn(null);
  })
  .on(GlobalActions.logout, () => {
    clearAccessToken();
    return RouterActions.push('/login');
  });

// --- Reducer ---
const initialState: GlobalState = {
  isLoaded: false,
  user: null,
};

export const reducer = createReducer(initialState)
  .on(GlobalActions.loggedIn, (state, { user }) => {
    state.isLoaded = true;
    state.user = user;
  })
  .on(GlobalActions.logout, state => {
    state.user = null;
  });

// --- Module ---
export const useGlobalModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ['global'],
    actions: GlobalActions,
  });
