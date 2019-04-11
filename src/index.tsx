import React from 'react';
import ReactDOM from 'react-dom';
import { DefaultTypelessProvider, onHmr } from 'typeless';

const MOUNT_NODE = document.getElementById('app');

if (!MOUNT_NODE) {
  throw new Error('<div id="app" /> not found');
}

const render = () => {
  const App = require('./components/App').App;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  try {
    ReactDOM.render(
      <DefaultTypelessProvider>
        <App />
      </DefaultTypelessProvider>,
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
    onHmr(render);
  });
}
render();
