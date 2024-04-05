import express from 'express';
import testRouter from './test.api.router.js';
import authRouter from './auth.api.router.js';
import memesRouter from './memes.api.router.js';

const router = express.Router();

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/memes', memesRouter);

export default router;
