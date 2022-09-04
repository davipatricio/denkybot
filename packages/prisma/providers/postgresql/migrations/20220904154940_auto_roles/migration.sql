-- CreateTable
CREATE TABLE "AutoRole" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ignoreBots" BOOLEAN NOT NULL DEFAULT false,
    "delay" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "AutoRole_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoRole_guildId_key" ON "AutoRole"("guildId");
