import { z } from 'zod';

export default z.object({
  title: z.string({ required_error: 'Title is required' }).min(3, { message: 'Title must be at least 3 characters' }).max(40, { message: 'Title must be at most 40 characters' }),
  tags: z.array(z.string().min(3, { message: 'Tag must be at least 3 characters' }).max(20, { message: 'Tag must be at most 20 characters' })).min(1, { message: 'You need to enter at least 1 Tag' }).max(5, { message: 'You can enter at most 5 Tag' }),
});
