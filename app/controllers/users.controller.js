import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default {
  async signup(req, res) {
    const {
      password, firstname, lastname, nickname, email,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.NB_OF_SALT_ROUNDs, 10));

    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        nickname,
        email,
        password: hashedPassword,
      },

    });
    console.log(newUser);

    res.status(201).json({ message: 'Your account has been created' });
  },
};
