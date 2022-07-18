-- CreateTable
CREATE TABLE "Suggestion" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "addReactions" BOOLEAN NOT NULL DEFAULT true,
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cooldown" INTEGER NOT NULL DEFAULT 0,
    "useThreads" BOOLEAN NOT NULL DEFAULT false,
    "sendNotices" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Afk" (
    "userId" TEXT NOT NULL DEFAULT '',
    "guildId" TEXT,
    "reason" TEXT,
    "originalNick" TEXT,
    "startTime" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Afk_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Giveaway" (
    "messageId" TEXT NOT NULL DEFAULT '',
    "channelId" TEXT NOT NULL DEFAULT '',
    "authorId" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "endTimestamp" SERIAL NOT NULL,
    "winnerAmount" INTEGER NOT NULL DEFAULT 0,
    "participants" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Lockdown" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "blockedChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Lockdown_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Afk_userId_key" ON "Afk"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Giveaway_messageId_key" ON "Giveaway"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Lockdown_guildId_key" ON "Lockdown"("guildId");
