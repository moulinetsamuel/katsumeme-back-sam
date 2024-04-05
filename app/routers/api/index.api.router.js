import express from 'express';
import testRouter from './test.api.router.js';
import authRouter from './auth.api.router.js';

const router = express.Router();

router.use('/test', testRouter);
router.use('/auth', authRouter);

export default router;
