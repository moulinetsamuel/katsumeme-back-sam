import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
    ],
  });
};

seed();
