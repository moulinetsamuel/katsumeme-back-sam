import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const memesController = {
  async getAll(req, res) {
    const { page = 1 } = req.query;
    const pageSize = 6;
    const offset = (page - 1) * pageSize;

    const allMemes = await prisma.meme.findMany({
      take: pageSize,
      skip: offset,
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).send(allMemes);
  },
};

export default memesController;
