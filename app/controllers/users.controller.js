import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async signup(req, res) {
    const newUser = await prisma.user.create(req.body);
    res.status(201).json(newUser);
  },
};
