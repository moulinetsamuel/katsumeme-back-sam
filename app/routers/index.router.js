import express from 'express';
import authRouter from './auth.api.router.js';
import testController from '../controllers/test.controller.js';

const router = express.Router();

router.get('/test', testController);
router.use('/auth', authRouter);

export default router;
