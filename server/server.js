import path from 'path';
import express from 'express';
import {json as jsonBodyParser} from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(jsonBodyParser());
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug');
app.disable('x-powered-by');
app.use(express.static(path.resolve(__dirname, 'public_html')));

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/api/v1', routes);

export default app;