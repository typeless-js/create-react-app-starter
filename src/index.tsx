import React from 'react';
import ReactDOM from 'react-dom';
import { Hmr, Registry, startHmr, TypelessContext } from 'typeless';

const MOUNT_NODE = document.getElementById('app');

if (!MOUNT_NODE) {
  throw new Error('<div id="app" /> not found');
}

const registry = new Registry();

const render = () => {
  const App = require('./components/App').App;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  try {
    ReactDOM.render(
      <Hmr>
        <TypelessContext.Provider value={{ registry }}>
          <App />
        </TypelessContext.Provider>
      </Hmr>,
      MOUNT_NODE
    );
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
    throw e;
  }
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    startHmr();
    render();
  });
}
render();
