-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
