import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import App from './App';
import { reducers } from './reducers';
import { ThemeProvider, createTheme } from '@material-ui/core';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  typography: {
    fontFamily: ['nunito', 'sans serif'].join(','),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
