-- DropForeignKey
ALTER TABLE "Options" DROP CONSTRAINT "Options_questionId_fkey";

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
