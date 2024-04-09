import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/memes',

  filename: (req, file) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extname = path.extname(file.originalname);
    return uniqueSuffix + extname;
  },
});

const multerUpload = multer({ storage });

export default multerUpload;
