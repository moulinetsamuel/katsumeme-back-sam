import express from 'express';
import tryCatcher from '../../middlewares/tryCatcher.js';
import usersController from '../../controllers/users.controller.js';

const router = express.Router();

router.get('/', tryCatcher(usersController.getUser));

export default router;
