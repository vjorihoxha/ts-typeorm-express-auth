import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './utils/response/customSuccess';
import { errorHandler } from './middlewares/errorHandler';
import { dbCreateConnection } from './typeorm/dbCreateConnection';
import 'dotenv/config';
import routes from './routes';
import multer from 'multer';

// create and setup express app and its middlewares
const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(upload.array());
app.use(helmet());
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
