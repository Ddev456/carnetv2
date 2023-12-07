/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "categoryId",
DROP COLUMN "rank";
