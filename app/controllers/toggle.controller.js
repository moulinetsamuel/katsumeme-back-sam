import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const toggleController = {
  toggleLike: async (req, res) => {
    const memeId = req.params.id;
    const userId = req.user.id;

    const existingLike = await prisma.meme_has_like.findUnique({
      where: {
        user_id: userId,
        meme_id: Number(memeId),
      },
    });

    if (existingLike) {
      await prisma.meme_has_like.delete({
        where: {
          id: existingLike.id,
        },
      });

      res.status(200).json({ message: 'Like successfully removed' });
    } else {
      await prisma.meme_has_like.create({
        data: {
          like: true,
          user_id: userId,
          meme_id: Number(memeId),
        },
      });

      res.status(200).json({ message: 'Like successfully added' });
    }
  },
};

export default toggleController;
