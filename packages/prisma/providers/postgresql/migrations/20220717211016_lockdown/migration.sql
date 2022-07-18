-- CreateTable
CREATE TABLE "Lockdown" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "blockedChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Lockdown_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lockdown_guildId_key" ON "Lockdown"("guildId");
