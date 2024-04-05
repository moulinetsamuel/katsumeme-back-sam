import { z } from 'zod';

export default z.object({
  firstname: z.string({ required_error: 'firstname is required' }).min(2),
  lastname: z.string({ required_error: 'lastname is required' }).min(2),
  nickname: z.string({ required_error: 'nickname is required and needs to be between 3 and 10 characters' }).min(3).max(10),
  image_url: z.string().url(),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }).min(8),
});
