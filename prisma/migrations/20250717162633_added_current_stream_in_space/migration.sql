/*
  Warnings:

  - Added the required column `currentStream` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "currentStream" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_currentStream_fkey" FOREIGN KEY ("currentStream") REFERENCES "ActiveStream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
