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
    "startTime" INTEGER NOT NULL,

    CONSTRAINT "Afk_pkey" PRIMARY KEY ("userId")
);
