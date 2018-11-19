import mongoose from 'mongoose';

const AttendantSchema = new mongoose.Schema({
	'first_name': {
		type: String,
		required: [true, 'First name is required']
	},
	'last_name': {
		type: String,
		required: [true, 'Last name is required']
	},
	'email': {
		type: String,
		required: [true, 'Email is required']
	},
	'event_date': {
		type: Date,
		required: [true, 'Event Date is required']
	},
});
const AttendantModel = mongoose.model('Attendant', AttendantSchema);

export default AttendantModel;