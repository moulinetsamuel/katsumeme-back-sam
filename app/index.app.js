import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import router from './routers/index.router.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { ApiError } from './error/api.error.js';

const app = express();

// Configuration CORS
const allowedOrigins = process.env.FRONTEND_URL.split(',');
const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      callback(new ApiError(msg, 404), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100K requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Body Parsing and Cookie Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use(express.static('public'));

// Router and Error Middleware
app.use(router);
app.use(errorMiddleware);

export default app;
