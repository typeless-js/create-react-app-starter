import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware, RootEpic, RootReducer } from 'typeless';

export const rootEpic = new RootEpic();
export const rootReducer = new RootReducer();

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
