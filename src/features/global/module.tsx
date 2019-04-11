import * as Rx from 'src/rx';
import { getUser } from 'src/services/API';
import { clearAccessToken, getAccessToken } from 'src/services/Storage';
import { RouterActions } from 'typeless-router';
import { GlobalActions, GlobalState, handle } from './interface';

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

handle
  .reducer(initialState)
  .on(GlobalActions.loggedIn, (state, { user }) => {
    state.isLoaded = true;
    state.user = user;
  })
  .on(GlobalActions.logout, state => {
    state.user = null;
  });

export const useGlobalModule = () => handle();
