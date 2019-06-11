import { User } from 'src/types';
import { createModule } from 'typeless';
import { GlobalSymbol } from './symbol';

export const MODULE = 'global';

export const [handle, GlobalActions, getGlobalState] = createModule(
  GlobalSymbol
)
  .withActions({
    $mounted: null,
    logout: null,
    loggedIn: (user: User | null) => ({ payload: { user } }),
  })
  .withState<GlobalState>();

export interface GlobalState {
  isLoaded: boolean;
  user: User | null;
}
