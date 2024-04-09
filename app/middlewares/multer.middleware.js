import multer from 'multer';

const memeStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/upload/memes');
  },

  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `meme-${uniqueSuffix}.png`);
  },
});

const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/upload/avatars');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `avatar-${uniqueSuffix}.png`);
  },
});

const memeUpload = multer({ memeStorage });
const avatarUpload = multer({ avatarStorage });

export { memeUpload, avatarUpload };
