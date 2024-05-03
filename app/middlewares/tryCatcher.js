import fs from 'fs';

export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
