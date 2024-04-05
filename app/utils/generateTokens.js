import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (user) => {
  const accessToken = jwt.sign(
    {
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN / 1000,
      subject: user.id.toString(),
    },
  );
  console.log('test', new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10)));
  const refreshToken = jwt.sign(
    {
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN / 1000,
      subject: user.id.toString(),
    },
  );

  await prisma.refresh_token.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10)),
    },
  });

  return { accessToken, refreshToken };
};
