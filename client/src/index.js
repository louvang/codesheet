import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes/Routes';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
