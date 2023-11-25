/*
  Warnings:

  - Made the column `plantCategory` on table `UserNotifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plantName` on table `UserNotifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserNotifications" ALTER COLUMN "plantCategory" SET NOT NULL,
ALTER COLUMN "plantName" SET NOT NULL;
