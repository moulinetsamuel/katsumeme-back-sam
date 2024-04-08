import authenticate from '../utils/authenticate.js';
import generateTokens from '../utils/generateTokens.js';
import { AuthError } from '../error/api.error.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await authenticate(email, password);

    if (!user) {
      throw new AuthError('Invalid email or password', 401);
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json({ accessToken, refreshToken });
  },
};
