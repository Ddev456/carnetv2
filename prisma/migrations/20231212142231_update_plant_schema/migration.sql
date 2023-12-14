/*
  Warnings:

  - You are about to drop the column `flowering` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `harvest` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `nursery` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `plantation` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `seedling` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `floweringDuration` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `growingTime` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harvestingDuration` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optimaltemp` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readyToPlantTime` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegetationZero` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "flowering",
DROP COLUMN "harvest",
DROP COLUMN "nursery",
DROP COLUMN "plantation",
DROP COLUMN "seedling",
ADD COLUMN     "cultureStages" INTEGER[],
ADD COLUMN     "floweringDuration" INTEGER NOT NULL,
ADD COLUMN     "growingTime" INTEGER NOT NULL,
ADD COLUMN     "harvestingDuration" INTEGER NOT NULL,
ADD COLUMN     "optimaltemp" INTEGER NOT NULL,
ADD COLUMN     "readyToPlantTime" INTEGER NOT NULL,
ADD COLUMN     "vegetationZero" INTEGER NOT NULL;
