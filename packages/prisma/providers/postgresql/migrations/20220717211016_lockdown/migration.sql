-- CreateTable
CREATE TABLE "Lockdown" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "blockedChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startTime" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Lockdown_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lockdown_guildId_key" ON "Lockdown"("guildId");
