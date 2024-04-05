import express from 'express';
import tryCatcher from '../../middlewares/tryCatcher.js';
import testController from '../../controllers/test.controller.js';

const router = express.Router();

router.get('/', tryCatcher(testController.roadTest));

export default router;
