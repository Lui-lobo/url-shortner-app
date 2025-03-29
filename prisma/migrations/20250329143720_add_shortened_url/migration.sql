/*
  Warnings:

  - A unique constraint covering the columns `[shortenedUrl]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ShortenedUrl" ADD COLUMN     "shortenedUrl" TEXT NOT NULL DEFAULT 'N/A';

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_shortenedUrl_key" ON "ShortenedUrl"("shortenedUrl");
