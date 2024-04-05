import express from 'express';
import usersController from '../../controllers/users.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import zodValidator from '../../middlewares/zod.validation.schema.js';
import signupSchema from '../../schemas/users.schema/post.signup.js';

const router = express.Router();

router.post('/', zodValidator(signupSchema), tryCatcher(usersController.signup));

export default router;
