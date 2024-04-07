import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      const error = new Error('Invalid authorization header');
      error.status = 401;
      throw error;
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw new Error('Access token not found', 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const userId = decoded.sub;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new Error('User not found');
      error.status = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
