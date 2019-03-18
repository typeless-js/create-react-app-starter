import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import {
  createEpicMiddleware,
  onHmr,
  RootEpic,
  RootReducer,
  TypelessProvider,
} from 'typeless';

const MOUNT_NODE = document.getElementById('app');

if (!MOUNT_NODE) {
  throw new Error('<div id="app" /> not found');
}

const rootEpic = new RootEpic();
const rootReducer = new RootReducer();

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [epicMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger;
  middlewares.push(
    createLogger({
      collapsed: true,
    }),
  );
}
export const store = createStore(
  rootReducer.getReducer(),
  applyMiddleware(...middlewares),
);

const render = () => {
  const App = require('./components/App').App;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  ReactDOM.render(
    <TypelessProvider
      rootEpic={rootEpic}
      rootReducer={rootReducer}
      store={store}
    >
      <App />
    </TypelessProvider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    onHmr(render);
  });
}
render();
