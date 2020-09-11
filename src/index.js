import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import counterApp from './reducers';
import './App.scss';
import './style.css';


const store = createStore(counterApp);
console.log(store.getState());
const appElement = document.getElementById('root');
ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    appElement
);
