/*
  Warnings:

  - You are about to drop the column `cultureInfo` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `family` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `hardiness` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `harvestInfo` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `seedlingInfo` on the `Plant` table. All the data in the column will be lost.
  - Made the column `thumbnail` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seedling` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nursery` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plantation` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `flowering` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `harvest` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exposition` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `water` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spaceBetween` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spaceOnRow` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seedMinTemp` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seedMaxTemp` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seedDepth` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emergence` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `optimalTemp` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nitrogenN` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phosphorusP` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `potassiumK` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `efficiency` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `conservation` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isHardiness` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "cultureInfo",
DROP COLUMN "family",
DROP COLUMN "gender",
DROP COLUMN "hardiness",
DROP COLUMN "harvestInfo",
DROP COLUMN "seedlingInfo",
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "seedling" SET NOT NULL,
ALTER COLUMN "nursery" SET NOT NULL,
ALTER COLUMN "plantation" SET NOT NULL,
ALTER COLUMN "flowering" SET NOT NULL,
ALTER COLUMN "harvest" SET NOT NULL,
ALTER COLUMN "exposition" SET NOT NULL,
ALTER COLUMN "water" SET NOT NULL,
ALTER COLUMN "spaceBetween" SET NOT NULL,
ALTER COLUMN "spaceOnRow" SET NOT NULL,
ALTER COLUMN "seedMinTemp" SET NOT NULL,
ALTER COLUMN "seedMaxTemp" SET NOT NULL,
ALTER COLUMN "seedDepth" SET NOT NULL,
ALTER COLUMN "emergence" SET NOT NULL,
ALTER COLUMN "optimalTemp" SET NOT NULL,
ALTER COLUMN "nitrogenN" SET NOT NULL,
ALTER COLUMN "phosphorusP" SET NOT NULL,
ALTER COLUMN "potassiumK" SET NOT NULL,
ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "efficiency" SET NOT NULL,
ALTER COLUMN "conservation" SET NOT NULL,
ALTER COLUMN "isHardiness" SET NOT NULL;
