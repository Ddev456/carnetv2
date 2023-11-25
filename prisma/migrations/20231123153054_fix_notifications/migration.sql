/*
  Warnings:

  - The values [flowering] on the enum `TypeEvent` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `startDate` on table `UserNotifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeEvent` on table `UserNotifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeEvent_new" AS ENUM ('nursery', 'seedling', 'plantation');
ALTER TABLE "UserNotifications" ALTER COLUMN "typeEvent" TYPE "TypeEvent_new" USING ("typeEvent"::text::"TypeEvent_new");
ALTER TYPE "TypeEvent" RENAME TO "TypeEvent_old";
ALTER TYPE "TypeEvent_new" RENAME TO "TypeEvent";
DROP TYPE "TypeEvent_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserNotifications" ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "typeEvent" SET NOT NULL,
ALTER COLUMN "typeEvent" SET DEFAULT 'nursery';
