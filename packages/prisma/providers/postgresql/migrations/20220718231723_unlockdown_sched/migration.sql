-- CreateTable
CREATE TABLE "UnlockdownTask" (
    "guildId" TEXT NOT NULL DEFAULT '',
    "endTimestamp" SERIAL NOT NULL,

    CONSTRAINT "UnlockdownTask_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnlockdownTask_guildId_key" ON "UnlockdownTask"("guildId");
