import jwt from 'jsonwebtoken';

export default async (user) => {
  const accessToken = jwt.sign(
    {
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: user.id.toString(),
    },
  );

  const refreshToken = jwt.sign(
    {
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10)),
      subject: user.id.toString(),
    },
  );

  return { accessToken, refreshToken };
};
