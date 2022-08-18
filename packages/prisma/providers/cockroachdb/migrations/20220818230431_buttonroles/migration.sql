-- AlterTable
ALTER TABLE "Afk" ALTER COLUMN "startTime" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Giveaway" ALTER COLUMN "endTimestamp" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "endTimestamp" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UnlockdownTask" ALTER COLUMN "endTimestamp" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "ButtonRole" (
    "messageId" STRING NOT NULL DEFAULT '',
    "guildId" STRING NOT NULL DEFAULT '',
    "roles" STRING[] DEFAULT ARRAY[]::STRING[],
    "type" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "ButtonRole_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ButtonRole_messageId_key" ON "ButtonRole"("messageId");
