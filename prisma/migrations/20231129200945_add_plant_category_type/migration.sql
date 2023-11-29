-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('LEGUMES', 'FRUITIERS', 'FLEURS', 'AROMATIQUES', 'ENGRAISVERTS', 'AUTRES');

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "categoryType" "CategoryType" NOT NULL DEFAULT 'AUTRES';
