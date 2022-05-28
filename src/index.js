/* Libraries Imported */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/index.scss';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducerFunc from './redux/reducerFunc'
const store = createStore(reducerFunc)

ReactDOM.render(
  <Provider store={store}>
    {/* show main Menu */}
    <App />
  </Provider>,
  document.getElementById('root')
);

