import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const memesController = {
  async getAll(req, res) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const offset = (page - 1) * limit;

    const allMemesWithTagsAndLikes = await prisma.meme.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc',
      },
      include: {
        tags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            nickname: true,
            avatar_url: true,
          },
        },
        _count: {
          select: {
            liked_by: {
              where: { like: true },
            },
          },
        },
      },
    });

    const countDislikes = await prisma.meme.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        _count: {
          select: {
            liked_by: {
              where: { like: false },
            },
          },
        },
      },
    });

    const dislikeNumber = countDislikes.map((meme) => meme._count);

    const memesCompleted = allMemesWithTagsAndLikes.map((meme, index) => ({
      ...meme,
      dislikeCount: dislikeNumber[index],
    }));

    const activeUserId = Number(req.query.user_id);
    if (activeUserId) {
      const memesCompletedWithUser = await Promise.all(memesCompleted.map(async (meme) => {
        const memeId = meme.id;

        // Vérifiez si le mème en question est bookmarké par l'utilisateur actif
        const memeIsBookmarked = await prisma.user_has_bookmark.findFirst({
          where: {
            user_id: activeUserId, // L'ID de l'utilisateur actif
            meme_id: memeId, // L'ID du mème
          },
        });

        // Vérifiez si l'utilisateur a liké ce mème
        const likedByUser = await prisma.meme_has_like.findFirst({
          where: {
            user_id: activeUserId, // L'ID de l'utilisateur actif
            meme_id: memeId, // L'ID du mème
          },
        });

        let isliked;
        if (likedByUser !== null) {
          isliked = likedByUser.like;
        }
        return {
          ...meme,
          isBookmarked: !!memeIsBookmarked, // Convertit en booléen
          isliked,
        };
      }));
      return res.status(200).json(memesCompletedWithUser);
    }

    return res.status(200).json(memesCompleted);
  },

  async uploadMeme(req, res) {
    const uploadedFile = req.file;
    const meme = await prisma.meme.create({
      data: {
        image_url: uploadedFile.path,
      },
    });
    res.status(200).json({ message: 'Fichier importé avec succès', meme });
  },

};

export default memesController;
