/*
  Warnings:

  - Made the column `department` on table `UserPreferences` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserPreferences" ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '56';
