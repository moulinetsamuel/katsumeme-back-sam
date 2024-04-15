import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default {
  async signup(req, res) {
    const {
      password, firstname, lastname, nickname, email,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.NB_OF_SALT_ROUNDS, 10));

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        nickname,
        email,
        password: hashedPassword,
      },

    });

    res.status(201).json({ message: 'Your account has been created' });
  },

  getUser(req, res) {
    const { user } = req;
    delete user.password;
    delete user.role_id;

    res.status(200).json(user);
  },
};
