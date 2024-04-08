import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthError } from '../error/api.error.js';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
      throw new AuthError('Authorization header not found', 401);
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw new AuthError('Access token not found', 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const userId = Number(decoded.sub);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AuthError('User not found', 401);
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      error.status = 401;
    }
    next(error);
  }
};
