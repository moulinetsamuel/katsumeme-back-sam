import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const memesController = {
  async getAll(req, res) {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const allMemes = await prisma.meme.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc',
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            nickname: true,
            avatarUrl: true,
          },
        },
        likedBy: true,
        bookmarkedBy: true,
      },
    });
    // const completedMemes = allMemes.map((meme) => {
    //   // const numberOfLikes = meme.likedBy.filter(like => like.like === true).length;
    //   // const numberOfDislikes = meme.likedBy.filter);
    //   const userLiked = meme.likedBy.some((like) => like.userId === req.user.id);
    //   const isBookmarked = meme.bookmarkedBy.some((bookmark) => bookmark.userId === req.user.id);

    //   return {
    //     title: meme.title,
    //     tags: meme.tags.map((tag) => tag.name),
    //     imageUrl: meme.imageUrl,
    //     author: {
    //       nickname: meme.author.nickname,
    //       avatarUrl: meme.author.avatarUrl,
    //     },
    //     createdAt: meme.createdAt,
    //     // numberOfLikes,
    //     // numberOfDislikes,
    //     userLiked,
    //     isBookmarked,
    //   };
    // });

    res.status(200).send(allMemes);
  },
};

export default memesController;
