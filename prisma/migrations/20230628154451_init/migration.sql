/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_bookId_fkey";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "year" DATE NOT NULL,
    "description" TEXT,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "lastName" VARCHAR(255) NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
