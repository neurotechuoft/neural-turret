import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './helpers/registerServiceWorker';
import Control from './containers/Control/Control';

ReactDOM.render(<Control/>, document.getElementById('root'));


registerServiceWorker();