import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import store from './store/store';
import App from './App';
import axios from 'axios';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
