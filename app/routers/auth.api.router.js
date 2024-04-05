import express from 'express';
import authController from '../controllers/auth.controller.js';
import tryCatcher from '../middlewares/tryCatcher.js';

const router = express.Router();

router.post('/login', tryCatcher(authController.login));
