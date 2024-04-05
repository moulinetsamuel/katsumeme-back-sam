import express from 'express';
import memesRouter from './memes.api.router.js';

const router = express.Router();

router.use('/memes', memesRouter);

export default router;
