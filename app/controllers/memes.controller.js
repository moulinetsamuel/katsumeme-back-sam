import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

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
      include: {
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

    const allMemesWithTagsLikesAndDislikes = allMemesWithTagsAndLikes.map((meme, index) => ({
      ...meme,
      dislikeCount: dislikeNumber[index],
    }));

    const activeUserId = Number(req.query.user_id);

    const memesCompleted = await Promise.all(allMemesWithTagsLikesAndDislikes.map(async (meme) => {
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

      return {
        ...meme,
        isBookmarked: !!memeIsBookmarked, // Convertit en booléen
        likedByUser: likedByUser ? likedByUser.like : null, // null si l'utilisateur n'a pas encore donné de valeur
      };
    }));

    // cpretty(allMemesWithTagsLikesAndDislikes);
    // cpretty(allCompleteMemes);

    cpretty(memesCompleted);
    res.status(200).send(memesCompleted);
  },
};

export default memesController;
