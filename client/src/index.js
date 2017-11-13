import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let middleWare = null;
if(window.__REDUX_DEVTOOLS_EXTENSION__){
  middleWare = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__());
}else{
  middleWare = applyMiddleware(thunk);
}

const store = createStore(rootReducer, middleWare);

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root'));
registerServiceWorker();
