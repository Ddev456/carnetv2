/*
  Warnings:

  - The `plantId` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "plantId",
ADD COLUMN     "plantId" INTEGER;
