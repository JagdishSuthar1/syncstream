/*
  Warnings:

  - A unique constraint covering the columns `[currentStream]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_currentStream_fkey";

-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "currentStream" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Space_currentStream_key" ON "Space"("currentStream");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_currentStream_fkey" FOREIGN KEY ("currentStream") REFERENCES "ActiveStream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
