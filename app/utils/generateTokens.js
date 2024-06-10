import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default async (user) => {
  const role = user.role_name || user.role.name;

  const accessToken = jwt.sign(
    {
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN / 1000,
      subject: user.id.toString(),
    },
  );

  const refreshToken = crypto.randomBytes(123).toString('base64');

  await prisma.refresh_token.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10)),
    },
  });

  // Exemple de requête SQL équivalente pour créer un refresh token
  // const refreshTokenQuery = `
  //   INSERT INTO "refresh_token" (token, user_id, expires_at)
  //   VALUES ($1, $2, $3);
  // `;
  // const expiresAt = new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10));
  // await prisma.$queryRawUnsafe(refreshTokenQuery, refreshToken, user.id, expiresAt);

  return { accessToken, refreshToken };
};
