/*
  Warnings:

  - The `seedling` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nursery` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plantation` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `flowering` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `harvest` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "seedling",
ADD COLUMN     "seedling" INTEGER[],
DROP COLUMN "nursery",
ADD COLUMN     "nursery" INTEGER[],
DROP COLUMN "plantation",
ADD COLUMN     "plantation" INTEGER[],
DROP COLUMN "flowering",
ADD COLUMN     "flowering" INTEGER[],
DROP COLUMN "harvest",
ADD COLUMN     "harvest" INTEGER[];
