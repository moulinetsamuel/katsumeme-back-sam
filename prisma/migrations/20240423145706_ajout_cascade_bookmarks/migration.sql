-- DropForeignKey
ALTER TABLE "user_has_bookmark" DROP CONSTRAINT "user_has_bookmark_meme_id_fkey";

-- AddForeignKey
ALTER TABLE "user_has_bookmark" ADD CONSTRAINT "user_has_bookmark_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
