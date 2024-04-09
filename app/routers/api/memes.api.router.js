import express from 'express';
import memesController from '../../controllers/memes.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import multerUpload from '../../middlewares/multer.middleware.js';

const router = express.Router();

router.use(multerUpload);
router.get('/', tryCatcher(memesController.getAll));

// router.get('/:id', tryCatcher(memesController.getOne));

// router.delete('/:id', tryCatcher(memesController.delete));

export default router;
