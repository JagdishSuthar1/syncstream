-- CreateTable
CREATE TABLE "_Banned_Users" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Banned_Users_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Banned_Users_B_index" ON "_Banned_Users"("B");

-- AddForeignKey
ALTER TABLE "_Banned_Users" ADD CONSTRAINT "_Banned_Users_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banned_Users" ADD CONSTRAINT "_Banned_Users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
