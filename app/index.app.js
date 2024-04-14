import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './routers/index.router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(router);
app.use(errorMiddleware);

export default app;
