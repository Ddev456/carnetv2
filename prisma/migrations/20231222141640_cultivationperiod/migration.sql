/*
  Warnings:

  - You are about to drop the column `endWeek` on the `CultivationPeriod` table. All the data in the column will be lost.
  - You are about to drop the column `startWeek` on the `CultivationPeriod` table. All the data in the column will be lost.
  - The `periodType` column on the `CultivationPeriod` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CultivationPeriod" DROP COLUMN "endWeek",
DROP COLUMN "startWeek",
ADD COLUMN     "coversowingPeriod" INTEGER[],
ADD COLUMN     "floweringPeriod" INTEGER[],
ADD COLUMN     "harvestingPeriod" INTEGER[],
ADD COLUMN     "plantingPeriod" INTEGER[],
ADD COLUMN     "sowingPeriod" INTEGER[],
ADD COLUMN     "transplantingPeriod" INTEGER[],
DROP COLUMN "periodType",
ADD COLUMN     "periodType" TEXT[];

-- DropEnum
DROP TYPE "PeriodType";
