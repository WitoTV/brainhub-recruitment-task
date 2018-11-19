import app from './server';
import config from './config/config';
import mongoose from 'mongoose';

/*
 * Create a mongoDB connection
 */
const mongoUrl = config.DB;
mongoose.connect(mongoUrl, {
	'useNewUrlParser': true,
	'keepAlive': true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUrl}`);
});


app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started on port ${process.env.PORT || 3000}`);
});