import express from 'express';
import memesController from '../../controllers/memes.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';
import upload from '../../middlewares/multer.middleware.js';
import zodValidationSchema from '../../middlewares/zod.validation.schema.js';
import postMemes from '../../schemas/memes.schema/post.memes.js';
import auth from '../../middlewares/auth.middleware.js';
import resizeImg from '../../middlewares/resizeImg.middleware.js';

const router = express.Router();

router.get('/', tryCatcher(memesController.getAll));
router.post('/', auth, upload.single('meme'), resizeImg, zodValidationSchema(postMemes), tryCatcher(memesController.uploadMeme));
router.delete('/:id', auth, tryCatcher(memesController.deleteMeme));

export default router;
