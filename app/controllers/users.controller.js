import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

export default {
  async signup(req, res) {
    const {
      password, firstname, lastname, nickname, email,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.NB_OF_SALT_ROUNDs, 10));

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

  async getUser(req, res) {
    const userId = req.user.id;

    const userWithRole = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        firstname: true,
        lastname: true,
        nickname: true,
        avatar_url: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    cpretty(userWithRole);
    res.status(200).json(userWithRole);
  },
};
