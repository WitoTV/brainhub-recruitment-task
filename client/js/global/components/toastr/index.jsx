import React from 'react';
import ReduxToastr from 'react-redux-toastr'

import './style.scss';

class Toastr extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ReduxToastr
				timeOut={4000}
				preventDuplicates
				newestOnTop={false}
				position="top-right"
				transitionIn="bounceInDown"
				transitionOut="fadeOut"
			/>
		);
		}
}

export default Toastr;