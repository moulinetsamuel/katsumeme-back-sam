import express from 'express';
import testController from '../controllers/test.controller.js';
import apiRouter from './api.router/index.api.router.js';

const router = express.Router();

router.get('/test', testController);
router.use('/api', apiRouter);

export default router;
