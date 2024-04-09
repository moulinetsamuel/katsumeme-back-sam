import express from 'express';
import memesController from '../../controllers/memes.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import { memeUpload } from '../../middlewares/multer.middleware.js';
import zodValidationSchema from '../../middlewares/zod.validation.schema.js';
import postMemes from '../../schemas/memes.schema/post.memes.js';
import auth from '../../middlewares/auth.middleware.js';

const router = express.Router();

// router.use(multerUpload);
router.get('/', tryCatcher(memesController.getAll));
router.post('/', auth, memeUpload.single('meme'), zodValidationSchema(postMemes), tryCatcher(memesController.uploadMeme));

// router.get('/:id', tryCatcher(memesController.getOne));

// router.delete('/:id', tryCatcher(memesController.delete));

export default router;
