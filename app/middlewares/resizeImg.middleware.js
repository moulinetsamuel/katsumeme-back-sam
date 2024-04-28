import sharp from 'sharp';
import fs from 'fs';
import { ApiError } from '../error/api.error.js';

const resizeImg = (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError('No image provided', 400);
    }

    const inputPath = req.file.path;

    sharp(inputPath)
      .resize(500, 500, { fit: 'fill' })
      .toBuffer((err, buffer) => {
        if (err) {
          throw new ApiError('Error resizing image', 400);
        }

        fs.writeFile(inputPath, buffer, (writeErr) => {
          if (writeErr) {
            throw new ApiError('Error replacing image', 400);
          }
        });
      });

    next();
  } catch (error) {
    next(error);
  }
};

export default resizeImg;
