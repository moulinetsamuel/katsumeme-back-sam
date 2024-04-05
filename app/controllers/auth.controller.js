import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default {
  async login(req, res) {
    const { email, password } = req.body;
  },
};
