-- DropForeignKey
ALTER TABLE "meme_has_comment" DROP CONSTRAINT "meme_has_comment_meme_id_fkey";

-- DropForeignKey
ALTER TABLE "meme_has_like" DROP CONSTRAINT "meme_has_like_meme_id_fkey";

-- DropForeignKey
ALTER TABLE "memes_has_tags" DROP CONSTRAINT "memes_has_tags_meme_id_fkey";

-- AddForeignKey
ALTER TABLE "meme_has_comment" ADD CONSTRAINT "meme_has_comment_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meme_has_like" ADD CONSTRAINT "meme_has_like_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memes_has_tags" ADD CONSTRAINT "memes_has_tags_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
