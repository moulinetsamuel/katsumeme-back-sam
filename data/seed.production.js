import { Prisma } from '@prisma/client';

const prisma = new Prisma();

const seed = async () => {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
    ],
  });
};

seed();
