import { PrismaClient } from '@prisma/client';
import { ApiError } from '../error/api.error.js';

const prisma = new PrismaClient();

const toggleController = {
  toggleLike: async (req, res) => {
    const memeId = Number(req.params.id);
    const userId = Number(req.user.id);

    const existingMeme = await prisma.meme.findUnique({
      where: {
        id: memeId,
      },
    });

    if (!existingMeme) {
      throw new ApiError('Meme not found', 404);
    }

    const existingLike = await prisma.meme_has_like.findUnique({
      where: {
        user_id_meme_id: {
          user_id: userId,
          meme_id: memeId,
        },
      },
    });

    if (existingLike) {
      if (existingLike.like === true) {
        await prisma.meme_has_like.delete({
          where: {
            user_id_meme_id: {
              user_id: userId,
              meme_id: memeId,
            },
          },
        });
        res.status(200).json({ message: 'Like successfully removed' });
      } else {
        await prisma.meme_has_like.update({
          where: {
            user_id_meme_id: {
              user_id: userId,
              meme_id: memeId,
            },
          },
          data: {
            like: true,
          },
        });

        res.status(200).json({ message: 'Like successfully updated' });
      }
    } else {
      await prisma.meme_has_like.create({
        data: {
          like: true,
          user_id: userId,
          meme_id: memeId,
        },
      });

      res.status(200).json({ message: 'Like successfully added' });
    }
  },

  toggleDislike: async (req, res) => {
    const memeId = Number(req.params.id);
    const userId = Number(req.user.id);

    const existingLike = await prisma.meme_has_like.findFirst({
      where: {
        user_id: userId,
        meme_id: memeId,
      },
    });

    if (existingLike) {
      if (existingLike.like === false) {
        await prisma.meme_has_like.delete({
          where: {
            user_id_meme_id: {
              user_id: userId,
              meme_id: memeId,
            },
          },
        });
        res.status(200).json({ message: 'Dislike successfully removed' });
      } else {
        await prisma.meme_has_like.update({
          where: {
            user_id_meme_id: {
              user_id: userId,
              meme_id: memeId,
            },
          },
          data: {
            like: false,
          },
        });

        res.status(200).json({ message: 'Dislike successfully updated' });
      }
    } else {
      await prisma.meme_has_like.create({
        data: {
          like: false,
          user_id: userId,
          meme_id: memeId,
        },
      });

      res.status(200).json({ message: 'Dislike successfully added' });
    }
  },

  toggleBookmark: async (req, res) => {
    const memeId = Number(req.params.id);
    const userId = Number(req.user.id);

    const existingBookmark = await prisma.user_has_bookmark.findFirst({
      where: {
        user_id: userId,
        meme_id: memeId,
      },
    });
    if (existingBookmark) {
      await prisma.user_has_bookmark.delete({
        where: {
          user_id_meme_id: {
            user_id: userId,
            meme_id: memeId,
          },
        },
      });

      res.status(200).json({ message: 'Bookmark successfully removed' });
    } else {
      await prisma.user_has_bookmark.create({
        data: {
          user_id: userId,
          meme_id: memeId,
        },
      });

      res.status(200).json({ message: 'Bookmark successfully added' });
    }
  },
};

export default toggleController;
