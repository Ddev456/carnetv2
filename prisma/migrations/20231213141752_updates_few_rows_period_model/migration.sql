/*
  Warnings:

  - You are about to drop the column `endMonth` on the `CulturePeriod` table. All the data in the column will be lost.
  - You are about to drop the column `startMonth` on the `CulturePeriod` table. All the data in the column will be lost.
  - Added the required column `endWeek` to the `CulturePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startWeek` to the `CulturePeriod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturePeriod" DROP COLUMN "endMonth",
DROP COLUMN "startMonth",
ADD COLUMN     "endWeek" INTEGER NOT NULL,
ADD COLUMN     "startWeek" INTEGER NOT NULL;
