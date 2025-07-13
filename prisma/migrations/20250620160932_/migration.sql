/*
  Warnings:

  - A unique constraint covering the columns `[spacecode]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Space_spacecode_key" ON "Space"("spacecode");
