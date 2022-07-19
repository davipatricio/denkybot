-- CreateTable
CREATE TABLE "UnlockdownTask" (
    "guildId" STRING NOT NULL DEFAULT '',
    "endTimestamp" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "UnlockdownTask_pkey" PRIMARY KEY ("guildId")
);
