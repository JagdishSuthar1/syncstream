/*
  Warnings:

  - You are about to drop the column `dontWant` on the `Polls` table. All the data in the column will be lost.
  - You are about to drop the column `want` on the `Polls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Polls" DROP COLUMN "dontWant",
DROP COLUMN "want";

-- CreateTable
CREATE TABLE "_Want_Poll" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Want_Poll_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_dontWant_Poll" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_dontWant_Poll_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Want_Poll_B_index" ON "_Want_Poll"("B");

-- CreateIndex
CREATE INDEX "_dontWant_Poll_B_index" ON "_dontWant_Poll"("B");

-- AddForeignKey
ALTER TABLE "_Want_Poll" ADD CONSTRAINT "_Want_Poll_A_fkey" FOREIGN KEY ("A") REFERENCES "Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Want_Poll" ADD CONSTRAINT "_Want_Poll_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dontWant_Poll" ADD CONSTRAINT "_dontWant_Poll_A_fkey" FOREIGN KEY ("A") REFERENCES "Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dontWant_Poll" ADD CONSTRAINT "_dontWant_Poll_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
