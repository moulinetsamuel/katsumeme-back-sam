import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (email, password) => {
//  exemple de requête SQL équivalente à la requête Prisma ci-dessous
  // const userQuery = `
  // SELECT "user".*, "role"."name" as "role_name"
  // FROM "user"
  // JOIN "role" ON "user"."role_id" = "role"."id"
  // WHERE "user"."email" = $1;
  // `;
  // const userResult = await prisma.$queryRawUnsafe(userQuery, email);
  // const user = userResult[0];

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
