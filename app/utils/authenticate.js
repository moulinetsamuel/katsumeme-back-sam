import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return false;
  }

  return user;
};
