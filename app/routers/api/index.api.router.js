import express from 'express';
import testRouter from './test.api.router.js';
import authRouter from './auth.api.router.js';
import memesRouter from './memes.api.router.js';
import usersRouter from './users.api.router.js';
import toggleRouter from './toggle.api.router.js';
import auth from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use('/test', auth, testRouter);
router.use('/auth', authRouter);
router.use('/memes', memesRouter);
router.use('/users', usersRouter);
router.use('/toggle', toggleRouter);

export default router;
