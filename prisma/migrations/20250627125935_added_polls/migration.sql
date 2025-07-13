-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'CLOSE');

-- CreateTable
CREATE TABLE "Polls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "status" "StatusType" NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "want" INTEGER NOT NULL,
    "dontWant" INTEGER NOT NULL,

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Polls" ADD CONSTRAINT "Polls_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
