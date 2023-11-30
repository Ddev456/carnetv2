/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlantOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnUser" DROP CONSTRAINT "CategoryOnUser_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnUser" DROP CONSTRAINT "CategoryOnUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PlantOnUser" DROP CONSTRAINT "PlantOnUser_plantId_fkey";

-- DropForeignKey
ALTER TABLE "PlantOnUser" DROP CONSTRAINT "PlantOnUser_userId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryOnUser";

-- DropTable
DROP TABLE "PlantOnUser";

-- DropEnum
DROP TYPE "CategoryState";

-- DropEnum
DROP TYPE "Progress";
