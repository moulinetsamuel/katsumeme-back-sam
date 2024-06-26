import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ApiError, AuthError } from '../error/api.error.js';

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
    const { title, tags } = req.body;
    const userId = req.user.id;

    await prisma.meme.create({
      data: {
        image_url: `/upload/memes/${uploadedFile.filename}`,
        author_id: Number(userId),
        title,
        tags: {
          create: tags.map((tagName) => ({
            tags: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
    });

    sharp(uploadedFile.path)
      .resize(500, 500, { fit: 'fill' })
      .toBuffer((err, buffer) => {
        if (err) {
          throw new ApiError('Erreur lors du redimensionnement de l\'image', 400);
        }

        fs.writeFile(uploadedFile.path, buffer, (writeErr) => {
          if (writeErr) {
            throw new ApiError('Erreur lors du remplacement de l\'image', 400);
          }
        });
      });
    res.status(200).json({ message: 'Fichier importé avec succès' });
  },

  async deleteMeme(req, res) {
    const memeId = Number(req.params.id);
    const userId = req.user.id;

    let meme;
    if (req.user.role.name === 'admin') {
      meme = await prisma.meme.findFirst({
        where: {
          id: memeId,
        },
      });

      if (!meme) {
        throw new ApiError('Ce mème n\'existe pas', 404);
      }
    } else {
      meme = await prisma.meme.findFirst({
        where: {
          id: memeId,
          author_id: userId,
        },
      });

      if (!meme) {
        throw new AuthError('Vous ne pouvez pas supprimer ce mème', 403);
      }
    }

    const filePath = path.join(process.cwd(), 'public', meme.image_url);
    fs.unlinkSync(filePath);

    await prisma.meme.delete({
      where: {
        id: memeId,
      },
    });

    return res.status(200).json({ message: 'Mème supprimé avec succès' });
  },

};

export default memesController;
