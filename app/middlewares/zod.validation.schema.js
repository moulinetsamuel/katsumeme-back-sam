import { fromZodError } from 'zod-validation-error';
import fs from 'fs';

export default (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    const zodError = fromZodError(error);
    zodError.status = 400;
    next(zodError);
  }
};
