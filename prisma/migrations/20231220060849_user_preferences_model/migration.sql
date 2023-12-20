/*
  Warnings:

  - You are about to drop the column `department` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gardeningDays` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "department",
DROP COLUMN "gardeningDays";

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "visitedExplorer" BOOLEAN NOT NULL DEFAULT false,
    "visitedCalendar" BOOLEAN NOT NULL DEFAULT false,
    "visitedPlanner" BOOLEAN NOT NULL DEFAULT false,
    "department" TEXT,
    "gardeningDays" INTEGER[],

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
