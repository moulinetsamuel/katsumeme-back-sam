import { z } from 'zod';

const tagSchema = z.string({ required_error: 'Tag is not valide' }).min(3).max(20);

export default z.object({
  title: z.string({ required_error: 'Title is required' }).min(3).max(40),
  tags: z.array(tagSchema).min(1).max(5),
});
