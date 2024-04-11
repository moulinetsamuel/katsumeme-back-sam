import { PrismaClient } from '@prisma/client';
import authenticate from '../utils/authenticate.js';
import generateTokens from '../utils/generateTokens.js';
import { AuthError } from '../error/api.error.js';

const prisma = new PrismaClient();

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await authenticate(email, password);

    if (!user) {
      throw new AuthError('Invalid email or password', 401);
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json({ accessToken, refreshToken });
  },

  async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthError('Refresh token is required', 400);
    }

    const oldRefreshToken = await prisma.refresh_token.findUnique({
      where: {
        token: refreshToken,
      },
      include: {
        user: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!oldRefreshToken) {
      throw new AuthError('Invalid refresh token', 401);
    }

    if (oldRefreshToken.expires_at < new Date()) {
      throw new AuthError('Refresh token expired', 401);
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(oldRefreshToken.user);

    await prisma.refresh_token.delete({
      where: {
        id: oldRefreshToken.id,
      },
    });

    return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  },
};
