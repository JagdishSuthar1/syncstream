/*
  Warnings:

  - A unique constraint covering the columns `[streamId,userId]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `extractedId` to the `ActiveStream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ActiveStream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActiveStream" DROP CONSTRAINT "ActiveStream_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Upvotes" DROP CONSTRAINT "Upvotes_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Upvotes" DROP CONSTRAINT "Upvotes_userId_fkey";

-- AlterTable
ALTER TABLE "ActiveStream" ADD COLUMN     "extractedId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_streamId_userId_key" ON "Upvotes"("streamId", "userId");

-- AddForeignKey
ALTER TABLE "ActiveStream" ADD CONSTRAINT "ActiveStream_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "ActiveStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
