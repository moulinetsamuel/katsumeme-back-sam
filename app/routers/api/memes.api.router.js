import express from 'express';
import memesController from '../../controllers/memes.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import upload from '../../middlewares/multer.middleware.js';
import zodValidationSchema from '../../middlewares/zod.validation.schema.js';
import postMemes from '../../schemas/memes.schema/post.memes.js';
import auth from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', tryCatcher(memesController.getAll));
router.post('/', auth, upload.single('meme'), zodValidationSchema(postMemes), tryCatcher(memesController.uploadMeme));

export default router;
