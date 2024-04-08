import { fromZodError } from 'zod-validation-error';

export default (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    const zodError = fromZodError(error);
    zodError.status = 400;
    next(zodError);
  }
};
