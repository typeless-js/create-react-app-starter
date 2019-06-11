import React, { useEffect, useState } from 'react';
import * as R from 'remeda';
import { usePrevious } from 'src/hooks/usePrevious';
import { RouteConfig } from 'src/types';
import { useActions, useMappedState } from 'typeless';
import { getRouterState, RouterActions, RouterLocation } from 'typeless-router';
import { getGlobalState } from 'src/features/global/interface';

// load dynamically all routes from all interfaces
const req = require.context('../features', true, /interface.tsx?$/);

const routes = R.flatMap(req.keys(), key => {
  const module = req(key);
  const items = Object.values(module);
  return items.filter((item: any) => item.type === 'route') as RouteConfig[];
});

function getMatch(loc: RouterLocation | null, isLogged: boolean) {
  if (!loc) {
    return null;
  }
  return routes.find(route => {
    if ((route.auth && !isLogged) || (!route.auth && isLogged)) {
      return false;
    }
    return route.path === loc.pathname;
  });
}

export const RouteResolver = () => {
  const { user, location } = useMappedState(
    [getGlobalState, getRouterState],
    (global, router) => ({
      ...R.pick(global, ['isLoaded', 'user']),
      ...R.pick(router, ['location']),
    })
  );
  const { push } = useActions(RouterActions);
  const [component, setComponent] = useState(<div />);

  const prevUser = usePrevious(user);

  useEffect(() => {
    let match = getMatch(location, !!user);
    if (match) {
      setComponent(match.component);
      return;
    }
    if (!prevUser && user) {
      // user is logging in
      // keep rendering current route if not found
      match = getMatch(location, !user);
      if (match) {
        setComponent(match.component);
      }
      return;
    }
    // not found route
    // you can display 404 or redirect to default routes
    push(user ? '/' : '/login');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user]);

  return component;
};
