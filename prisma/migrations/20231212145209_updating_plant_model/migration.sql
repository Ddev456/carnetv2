/*
  Warnings:

  - You are about to drop the column `content` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `eventFlowering` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `eventHarvest` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `eventPlantation` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `optimaltemp` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `description` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_plantId_fkey";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "content",
DROP COLUMN "eventFlowering",
DROP COLUMN "eventHarvest",
DROP COLUMN "eventPlantation",
DROP COLUMN "optimaltemp",
ADD COLUMN     "advice" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL;
