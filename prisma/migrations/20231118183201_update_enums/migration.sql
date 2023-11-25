/*
  Warnings:

  - The values [DRAFT,PUBLISHED] on the enum `CategoryState` will be removed. If these variants are still used in the database, this will fail.
  - The values [HIDDEN,PUBLISHED,PUBLIC] on the enum `PlantState` will be removed. If these variants are still used in the database, this will fail.
  - The values [NOT_STARTED,IN_PROGRESS,COMPLETED] on the enum `Progress` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryState_new" AS ENUM ('BROUILLON', 'PUBLIE');
ALTER TABLE "Category" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Category" ALTER COLUMN "state" TYPE "CategoryState_new" USING ("state"::text::"CategoryState_new");
ALTER TYPE "CategoryState" RENAME TO "CategoryState_old";
ALTER TYPE "CategoryState_new" RENAME TO "CategoryState";
DROP TYPE "CategoryState_old";
ALTER TABLE "Category" ALTER COLUMN "state" SET DEFAULT 'BROUILLON';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PlantState_new" AS ENUM ('BROUILLON', 'PUBLIE');
ALTER TABLE "Plant" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Plant" ALTER COLUMN "state" TYPE "PlantState_new" USING ("state"::text::"PlantState_new");
ALTER TYPE "PlantState" RENAME TO "PlantState_old";
ALTER TYPE "PlantState_new" RENAME TO "PlantState";
DROP TYPE "PlantState_old";
ALTER TABLE "Plant" ALTER COLUMN "state" SET DEFAULT 'BROUILLON';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Progress_new" AS ENUM ('NONFAVORI', 'AJOUTE');
ALTER TABLE "PlantOnUser" ALTER COLUMN "progress" DROP DEFAULT;
ALTER TABLE "PlantOnUser" ALTER COLUMN "progress" TYPE "Progress_new" USING ("progress"::text::"Progress_new");
ALTER TYPE "Progress" RENAME TO "Progress_old";
ALTER TYPE "Progress_new" RENAME TO "Progress";
DROP TYPE "Progress_old";
ALTER TABLE "PlantOnUser" ALTER COLUMN "progress" SET DEFAULT 'NONFAVORI';
COMMIT;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "state" SET DEFAULT 'BROUILLON';

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "state" SET DEFAULT 'BROUILLON';

-- AlterTable
ALTER TABLE "PlantOnUser" ALTER COLUMN "progress" SET DEFAULT 'NONFAVORI';
