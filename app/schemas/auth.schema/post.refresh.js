import { z } from 'zod';

export default z.object({
  refreshToken: z.string({ required_error: 'Refresh token is required' }).min(1),
});
