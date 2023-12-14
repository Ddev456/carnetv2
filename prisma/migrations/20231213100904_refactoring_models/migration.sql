/*
  Warnings:

  - You are about to drop the column `typeEvent` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `cultureStages` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `floweringDuration` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `harvestingDuration` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('COVERSOWING', 'SOWING', 'TRANSPLANTING', 'PLANTING', 'FLOWERING', 'HARVESTING');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('POTAGER', 'JOURNAL');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "typeEvent",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "NotificationType" NOT NULL,
ALTER COLUMN "plantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "cultureStages",
DROP COLUMN "floweringDuration",
DROP COLUMN "harvestingDuration",
DROP COLUMN "state";

-- DropEnum
DROP TYPE "PlantState";

-- DropEnum
DROP TYPE "TypeEvent";

-- CreateTable
CREATE TABLE "CulturePeriod" (
    "id" TEXT NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "periodType" "PeriodType" NOT NULL,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "CulturePeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CulturePeriod" ADD CONSTRAINT "CulturePeriod_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
