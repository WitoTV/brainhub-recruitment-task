import React from 'react'
import {Provider as Store} from 'react-redux';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store'
import RegisterForm from './';

const initialState = {
	toastr: {}
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('(Component) <RegisterForm />', () => {
	test ('(Component) <Form /> should have rendered 1 <form>', () => {
		const wrapper = mount(<Store store={store}><RegisterForm /></Store>);
		expect(wrapper.find('form').length).toBe(1);
	})

	test ('(Component) <Field /> should have rendered 4 <input>', () => {
		const wrapper = mount(<Store store={store}><RegisterForm /></Store>);
   		expect(wrapper.find('input').length).toBe(4);
	});
});