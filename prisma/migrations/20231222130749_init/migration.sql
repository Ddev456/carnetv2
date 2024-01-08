-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('LEGUMES', 'FRUITIERS', 'FLEURS', 'AROMATIQUES', 'ENGRAISVERTS', 'AUTRES');

-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('COVERSOWING', 'SOWING', 'TRANSPLANTING', 'PLANTING', 'FLOWERING', 'HARVESTING');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('POTAGER', 'JOURNAL');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('ARROSAGE', 'BOUTURAGE', 'FLORAISON', 'GERMINATION', 'PLANTATION', 'REMPOTAGE', 'SEMISEXTERIEUR', 'SEMISSOUSABRI', 'TAILLE', 'RECOLTE', 'DIVERS');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshTokenExpiresIn" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "visitedExplorer" BOOLEAN NOT NULL DEFAULT false,
    "visitedCalendar" BOOLEAN NOT NULL DEFAULT false,
    "visitedPlanner" BOOLEAN NOT NULL DEFAULT false,
    "visitedJournal" BOOLEAN NOT NULL DEFAULT false,
    "department" TEXT NOT NULL DEFAULT '56',
    "gardeningDays" INTEGER[],

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultivationPeriod" (
    "id" SERIAL NOT NULL,
    "startWeek" INTEGER NOT NULL,
    "endWeek" INTEGER NOT NULL,
    "periodType" "PeriodType" NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "CultivationPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "advice" TEXT[],
    "thumbnail" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "vegetationZero" INTEGER NOT NULL,
    "optimalTemp" INTEGER NOT NULL,
    "growingTime" INTEGER NOT NULL,
    "readyToPlantTime" INTEGER NOT NULL,
    "exposition" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "spaceBetween" INTEGER NOT NULL,
    "spaceOnRow" INTEGER NOT NULL,
    "seedMinTemp" INTEGER NOT NULL,
    "seedMaxTemp" INTEGER NOT NULL,
    "seedDepth" INTEGER NOT NULL,
    "emergence" INTEGER NOT NULL,
    "nitrogenN" INTEGER NOT NULL,
    "phosphorusP" INTEGER NOT NULL,
    "potassiumK" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "conservation" INTEGER NOT NULL,
    "isHardiness" BOOLEAN NOT NULL,
    "categoryType" "CategoryType" NOT NULL DEFAULT 'AUTRES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "plantId" TEXT,
    "plantName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "category" "TaskCategory" NOT NULL DEFAULT 'DIVERS',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plantId" TEXT,
    "userId" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultivationPeriod" ADD CONSTRAINT "CultivationPeriod_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
