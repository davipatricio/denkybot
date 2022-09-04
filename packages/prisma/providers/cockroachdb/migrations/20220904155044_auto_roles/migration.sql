-- CreateTable
CREATE TABLE "AutoRole" (
    "guildId" STRING NOT NULL DEFAULT '',
    "roles" STRING[] DEFAULT ARRAY[]::STRING[],
    "ignoreBots" BOOL NOT NULL DEFAULT false,
    "delay" INT8 NOT NULL DEFAULT 0,

    CONSTRAINT "AutoRole_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoRole_guildId_key" ON "AutoRole"("guildId");
