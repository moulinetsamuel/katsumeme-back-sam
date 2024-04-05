import express from 'express';
import authController from '../../controllers/auth.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import zodValidator from '../../middlewares/zod.validation.schema.js';
import loginSchema from '../../schemas/auth.schema/post.login.js';

const router = express.Router();

router.post('/login', zodValidator(loginSchema), tryCatcher(authController.login));

export default router;
