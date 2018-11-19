import mongoose from 'mongoose';
import request from 'supertest';
import Attendant from './attendant.model';
import app from '../../server';
import config from '../../config/config';


describe('(API) Attendant', () => {
	beforeAll((done) => {
		const mongoUrl = config.testDB;
		mongoose.connect(mongoUrl, {
			'useNewUrlParser': true,
			'keepAlive': true
		}).then(() => {
			mongoose.connection.db.dropDatabase();
			done();
		});
	});
	test ('Should respond with 200 if data is correct',  async (done) => {
		const response = await request(app)
			.post('/api/v1/attendant/add')
			.send({
				'first_name': 'First Name',
				'last_name': 'Last Name',
				'email': 'test@test.test',
				'event_date': new Date
			});
		expect(response.statusCode).toBe(200);
		done();
	});
	test ('Should respond with 500 on incorrect input', async (done) => {
		const response = await request(app)
			.post('/api/v1/attendant/add')
			.send({
				'last_name': 'Last Name',
				'event_date': ':)'
			});
		expect(response.statusCode).toBe(400);
		done();
	});
});

describe('(Model) Attendant', () => {
	beforeAll((done) => {
		const mongoUrl = 'mongodb://127.0.0.1/brainhub_task_test';
		mongoose.connect(mongoUrl, {
			'useNewUrlParser': true,
			'keepAlive': true
		}).then(() => {
			mongoose.connection.db.dropDatabase();
			done();
		});
		
	});
	test ('Should add document to collection', (done) => {
		const attendantTemplate = {
			'first_name': 'First Name',
			'last_name': 'Last Name',
			'email': 'test@test.test',
			'event_date': new Date
		}
		let attendant = new Attendant(attendantTemplate);
		attendant
			.save()
			.then((savedAttendant) => {
				expect(savedAttendant.first_name).toEqual(attendantTemplate.first_name);
				expect(savedAttendant.last_name).toEqual(attendantTemplate.last_name);
				expect(savedAttendant.email).toEqual(attendantTemplate.email);
				expect(savedAttendant.event_date).toEqual(attendantTemplate.event_date);
				done();
			})
	});
	
	test ('Should add document to collection', (done) => {
		const attendantTemplate = {
			'first_name': '',
			'last_name': 'Last Name',
			'email': '',
			'event_date': ''
		}
		let attendant = new Attendant(attendantTemplate);
		attendant
			.save()
			.catch((error) => {
				expect(error).toBeTruthy();
				done();
			})
	});
})

afterAll((done) => {
	mongoose.connection.db.dropDatabase();
	done();
})