import * as Rx from 'src/rx';
import { getUser } from 'src/services/API';
import { clearAccessToken, getAccessToken } from 'src/services/Storage';
import { GlobalActions, GlobalState, handle } from './interface';
import { RouterActions } from 'typeless-router';

// --- Epic ---
handle
  .epic()
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

export const reducer = handle
  .reducer(initialState)
  .on(GlobalActions.loggedIn, (state, { user }) => {
    state.isLoaded = true;
    state.user = user;
  })
  .on(GlobalActions.logout, state => {
    state.user = null;
  });

// --- Module ---
export const useGlobalModule = handle;
