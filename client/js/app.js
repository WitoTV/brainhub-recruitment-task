import React from "react";
import ReactDOM from "react-dom";
import {Provider as Store} from 'react-redux';
import {createStore} from 'redux';

import RegisterForm from './components/registerForm';
import reducers from 'global/redux/reducers';

import '../scss/style.scss';

const store = createStore(reducers);

const app = (
	<Store store={store}>
		<RegisterForm />
	</Store>
)

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
