/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Afk` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Giveaway" (
    "messageId" TEXT NOT NULL DEFAULT '',
    "channelId" TEXT NOT NULL DEFAULT '',
    "authorId" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "endTimestamp" BIGSERIAL NOT NULL,
    "winnerAmount" INTEGER NOT NULL DEFAULT 0,
    "participants" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Giveaway_messageId_key" ON "Giveaway"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Afk_userId_key" ON "Afk"("userId");
