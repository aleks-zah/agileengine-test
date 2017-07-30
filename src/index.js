import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { productsReducer, fetchProductsEpic, addProductEpic, removeProductEpic } from './products/reducer';
import 'rxjs';

const rootEpic = combineEpics(
  addProductEpic,
  fetchProductsEpic,
  removeProductEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { getJSON: ajax.getJSON, post: ajax.post, ajax },
});
const store = createStore(productsReducer, applyMiddleware(epicMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
