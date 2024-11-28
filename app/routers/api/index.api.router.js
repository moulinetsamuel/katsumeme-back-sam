import express from 'express';
import authRouter from './auth.api.router.js';
import memesRouter from './memes.api.router.js';
import usersRouter from './users.api.router.js';
import toggleRouter from './toggle.api.router.js';
import profilRouter from './profil.api.router.js';
import auth from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/memes', memesRouter);
router.use('/users', usersRouter);
router.use('/toggle', toggleRouter);
router.use('/profil', auth, profilRouter);

export default router;
