import 'reflect-metadata';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';

import './utils/response/customSuccess';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { dbCreateConnection } from './typeorm/dbCreateConnection';

// create and setup express app and its middlewares
const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(upload.array());
app.use(helmet());

try {
	const accessLogStream = fs.createWriteStream(
		path.join(__dirname, '../log/access.log'),
		{
			flags: 'a',
		},
	);
	app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
	console.log(err);
}
app.use(morgan('combined'));

app.use('/', routes);
app.use(errorHandler);

const port = process.env.SERVER_PORT || 8080;
// start express server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

(async () => {
	await dbCreateConnection();
})();
