import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { ProppyProvider } from 'proppy-react';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import models from './modules';
import 'bulma/css/bulma.min.css';

const store = init({ models });
const { dispatch, getState } = store;

const providers = { dispatch, store, getState };

ReactDOM.render((
  <Provider store={store}>
    <ProppyProvider providers={providers}>
      <App />
    </ProppyProvider>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
