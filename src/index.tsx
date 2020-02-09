import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './modules';
import App from './App';

const store = createStore(rootReducer);
store.subscribe(()=> {console.log(store.getState())} );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);