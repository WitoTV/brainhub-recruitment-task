import Attendant from './attendant.model';
import * as yup from 'yup';

const add = (req, res) => {
	/*
	 * Create validation schema for user input.
	*/
	const validation = yup.object().shape({
		'first_name': yup.string().required('First name is required'),
		'last_name': yup.string().required('Last name is required'),
		'email': yup.string().required('Email is required').email('Entered email address is invalid'),
		'event_date':  yup.date('Invalid date format').required('Event date is required')
	});
	/*
	 * Validate data send from frontend with validation matching the one on frontend.
	*/
	validation
		.validate(req.body, {'stripUnknown': true, 'abortEarly': false})
		.then((value) => {
			let attendant = new Attendant(value);
			attendant
				.save()
				.then((savedAttendant) => {
					res.status(200);
					res.send({'message': 'Your entery have been added to our database.'});
				})
				.catch((error) => {
					res.status(500);
					res.send({
						'type': 'connection',
						'message': 'Error occured while adding record to the database, try again later.'
					});
				});
		})
		.catch((error) => {
			/*
			 * In case of any validation error, we create frontend friendly error response with status code 400.
			*/
			let errorResponse = {
				'type': 'validation',
				'errors': {}
			};
			error.inner.map((fieldError) => errorResponse.errors[fieldError.path] = fieldError.message);
			res.status(400);
			res.send(errorResponse);
		})
}

export default {add};