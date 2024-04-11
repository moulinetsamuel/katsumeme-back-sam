import express from 'express';
import auth from '../../middlewares/auth.middleware.js';
import toggleController from '../../controllers/toggle.controller.js';
import tryCatcher from '../../middlewares/tryCatcher.js';

const router = express.Router();

router.get('/like/meme/:id', auth, tryCatcher(toggleController.toggleLike));
// router.get('/dislike/meme', auth, tryCatcher(toggleController.toggleDislike));
// router.get('/bookmark/meme', auth, tryCatcher(toggleController.toggleBookmark));

export default router;
