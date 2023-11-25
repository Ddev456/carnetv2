/*
  Warnings:

  - Added the required column `typeEvent` to the `UserNotifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeEvent" AS ENUM ('nursery', 'seedling', 'plantation', 'flowering');

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "eventFlowering" INTEGER,
ADD COLUMN     "eventHarvest" INTEGER,
ADD COLUMN     "eventPlantation" INTEGER;

-- AlterTable
ALTER TABLE "UserNotifications" ADD COLUMN     "typeEvent" "TypeEvent" NOT NULL;
