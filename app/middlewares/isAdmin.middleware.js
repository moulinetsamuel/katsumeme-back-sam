import { AuthError } from '../error/api.error.js';

export default async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role.name !== 'admin') {
      throw new AuthError('Unauthorized', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
