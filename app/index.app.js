import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import router from './routers/index.router.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { ApiError } from './error/api.error.js';

const app = express();

const allowedOrigins = process.env.FRONTEND_URL.split(',');

const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      callback(new ApiError(msg, 404), false);
    }
  },
  credentials: true,
};

// Add rate limit policy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100K requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headereLs
  legacyHeaders: false, // Disable the `X-Ratimit-*` headers
});
app.use(limiter);

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static('public'));

app.use(router);
app.use(errorMiddleware);

export default app;
