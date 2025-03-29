-- CreateTable
CREATE TABLE "ShortenedUrl" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "ShortenedUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlAccess" (
    "id" TEXT NOT NULL,
    "shortenedUrlId" TEXT NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,

    CONSTRAINT "UrlAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_shortCode_key" ON "ShortenedUrl"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_userId_key" ON "ShortenedUrl"("userId");

-- AddForeignKey
ALTER TABLE "ShortenedUrl" ADD CONSTRAINT "ShortenedUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlAccess" ADD CONSTRAINT "UrlAccess_shortenedUrlId_fkey" FOREIGN KEY ("shortenedUrlId") REFERENCES "ShortenedUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
