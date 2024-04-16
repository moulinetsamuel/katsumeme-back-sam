import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default z.object({
  firstname: z.string({ required_error: 'firstname is required' }).min(2, { message: 'firstname must be at least 2 characters' }),
  lastname: z.string({ required_error: 'lastname is required' }).min(2, { message: 'lastname must be at least 2 characters' }),
  nickname: z.string({ required_error: 'nickname is required' }).min(3, { message: 'nickname must be at least 3 characters' }).max(20, { message: 'nickname must be at most 20 characters' })
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
      path: ['nickname'],
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
      path: ['email'],
    }),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
  confirm_password: z.string().min(8)
    .refine((data) => data.password === data.confirm_password, {
      message: "Password don't match each other",
      path: ['confirm_password'],
    }),
}).strict();
