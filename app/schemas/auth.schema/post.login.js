import { z } from 'zod';

export default z.object({
  email: z.string({ required_error: 'Email is required' }).min(1),
  password: z.string({ required_error: 'Password is required' }).min(1),
});
