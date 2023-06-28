/*
  Warnings:

  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_bookId_fkey";

-- DropTable
DROP TABLE "Stats";

-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "numRequests" INTEGER NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
