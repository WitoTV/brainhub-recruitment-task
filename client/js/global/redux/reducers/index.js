import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducers = combineReducers({
	toastr: toastrReducer
});

export default reducers;
