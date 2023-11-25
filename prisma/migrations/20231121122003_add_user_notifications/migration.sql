-- CreateTable
CREATE TABLE "UserNotifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNotifications" ADD CONSTRAINT "UserNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
