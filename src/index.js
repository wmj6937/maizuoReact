import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,combineReducers} from 'redux';
import Reducers from './reducers/reducers';
import {Provider} from 'react-redux';

const reducers = combineReducers(Reducers);

const store = createStore(reducers,{});

function renderPage (){
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
}
renderPage();
store.subscribe(renderPage);

registerServiceWorker();
