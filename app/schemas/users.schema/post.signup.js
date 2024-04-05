import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default z.object({
  firstname: z.string({ required_error: 'firstname is required' }).min(2),
  lastname: z.string({ required_error: 'lastname is required' }).min(2),
  nickname: z.string({ required_error: 'nickname is required and needs to be between 3 and 10 characters' }).min(3).max(10)
    .refine(async (value) => {
      const exists = await prisma.user.findUnique({
        where: { nickname: value },
      });
      if (exists) {
        return false;
      }
      return true;
    }, {
      message: 'Someone already use this nickname',
    }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' })
    .refine(async (value) => {
      const exists = await prisma.user.findUnique({
        where: { email: value },
      });
      if (exists) {
        return false;
      }
      return true;
    }, {
      message: 'Email already exists',
    }),
  password: z.string({ required_error: 'Password is required' }).min(8),
  confirm_password: z.string().min(8)
    .refine((data) => data.password === data.confirm_password, {
      message: "Password don't match each other",
      path: ['confirm_password'],
    }),
}).strict();
