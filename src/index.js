import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import AppStore from './stores/AppStore';
import registerServiceWorker from './registerServiceWorker';

const store = new AppStore();
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
);

registerServiceWorker();
