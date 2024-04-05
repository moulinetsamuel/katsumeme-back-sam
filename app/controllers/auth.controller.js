import authenticate from '../utils/authenticate.js';
import generateTokens from '../utils/generateTokens.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await authenticate(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json({ accessToken, refreshToken });
  },
};
