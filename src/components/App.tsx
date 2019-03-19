import React from 'react';
import * as R from 'remeda';
import { useGlobalModule } from 'src/features/global/module';
import { useRouterModule } from 'src/features/router/module';
import { createGlobalStyle } from 'styled-components';
import { useMappedState } from 'typeless';
import { RouteResolver } from './RouteResolver';

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
      box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    background-color: #f5f5f5;
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
  }
`;

export const App = () => {
  useRouterModule();
  useGlobalModule();
  const { isLoaded } = useMappedState(state =>
    R.pick(state.global, ['isLoaded'])
  );
  return (
    <>
      {isLoaded && <RouteResolver />}
      <GlobalStyle />
    </>
  );
};
