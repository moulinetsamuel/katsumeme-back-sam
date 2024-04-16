import express from 'express';
import authController from '../../controllers/auth.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import zodValidator from '../../middlewares/zod.validation.schema.js';
import loginSchema from '../../schemas/auth.schema/post.login.js';
import refreshSchema from '../../schemas/auth.schema/post.refresh.js';

const router = express.Router();

router.post('/login', zodValidator(loginSchema), tryCatcher(authController.login));
router.post('/refresh', zodValidator(refreshSchema), tryCatcher(authController.refresh));

export default router;
