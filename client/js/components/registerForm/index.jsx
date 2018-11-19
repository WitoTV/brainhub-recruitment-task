import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import {toastr} from 'react-redux-toastr';
import Toastr from 'global/components/toastr';

import './style.scss';

/*
 *	We set the default date to today's date + reset the time. 
 */
const defaultDate  = new Date();
defaultDate.setHours(0,0,0,0);

/*
 * Create validation shema for user input. Same kind of validation exists on backend for safety reasons.
 */
const validation = yup.object().shape({
	'first_name': yup.string().required('First name is required'),
	'last_name': yup.string().required('Last name is required'),
	'email': yup.string().required('Email is required').email('Entered email address is invalid'),
	'event_date': yup.date('Invalid date format').min(defaultDate).required('Event date is required')
});

class RegisterForm extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const template = (
			<Formik
				initialValues={{
					'first_name': '',
					'last_name': '',
					'email': '',
					'event_date': defaultDate
				}}
				validationSchema={validation}
				onSubmit={(values, {setErrors, resetForm, setSubmitting}) => {
					fetch('/api/v1/attendant/add', {
						'method': 'POST',
						'body': JSON.stringify(values),
						'headers': {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					})
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
						throw response.json();
					})
					.then((data) => {
						resetForm();
						toastr.success('Entery added', data.message);
						setSubmitting(false);
					})
					.catch((errorPromise) => {
						errorPromise.then((errorMessage) => {
							if (errorMessage.type === 'validation') {
								toastr.error('Something went wrong', 'You have errors in your entery, please correct them and try again.');
								setErrors(errorMessage.errors);
							} else {
								toastr.error('Something went wrong', errorMessage.message);
							}
							setSubmitting(false);
						});
					});
				}}
				render={({errors, touched, isSubmitting}) => {
					const formTemplate = (
						<React.Fragment>
							<Form className={'form-wrapper'}>
								<div className={'input-wrapper'}>
									<label className={'input-wrapper__label'}>First Name</label>
									<Field
										className={'input-wrapper__field'}
										placeholder={'First Name'}
										type={'text'}
										name={'first_name'}
									/> 
									{errors.first_name && touched.first_name && <span className={'input-wrapper__error'}>{errors.first_name}</span>}
								</div>
								<div className={'input-wrapper'}>
									<label className={'input-wrapper__label'}>Last Name</label>
									<Field
										className={'input-wrapper__field'}
										placeholder={'Last Name'}
										type={'text'}
										name={'last_name'}
									/> 
									{errors.last_name && touched.last_name && <span className={'input-wrapper__error'}>{errors.last_name}</span>}
								</div>
								<div className={'input-wrapper'}>
									<label className={'input-wrapper__label'}>Email</label>
									<Field
										className={'input-wrapper__field'}
										placeholder={'Email Address'}
										type={'email'}
										name={'email'}
									/> 
									{errors.email && touched.email && <span className={'input-wrapper__error'}>{errors.email}</span>}
								</div>
								<div className={'input-wrapper'}>
									<label className={'input-wrapper__label'}>Event Date</label>
									<Field
										name={'event_date'}
										render={(props) => {
											const datepickerTemplate = (
												<DatePicker
													className={'input-wrapper__field'}
													minDate={new Date()}
													dateFormat={'dd/MM/yyyy'}
													selected={props.field.value}
													showDisabledMonthNavigation
													placeholderText="Event Date"
													shouldCloseOnSelect={false}
													onChange={(value) => props.form.setFieldValue(props.field.name, (!!value ? value : defaultDate), true)}
												/>
											);
											return datepickerTemplate;
										}}
									/>
									{errors.event_date && touched.event_date && <span className={'input-wrapper__error'}>{errors.event_date}</span>}
								</div> 
								<button
									className={'submit-wrapper'}
									disabled={isSubmitting}
									type={'submit'}
								>
									{'Submit'}
								</button>
							</Form>
							<Toastr />
						</React.Fragment>
					);
					return formTemplate;
				}}
			/>
		);
		return template;
	}
}

export default RegisterForm;