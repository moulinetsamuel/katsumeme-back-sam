import multer from 'multer';

const memeStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/upload/memes');
  },

  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `meme-${uniqueSuffix}.jpg`);
  },
});

const upload = multer({ storage: memeStorage });

export default upload;
