-- AlterTable
ALTER TABLE "Afk" ALTER COLUMN "startTime" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ButtonRole" ADD COLUMN     "guildId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "roles" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Giveaway" ALTER COLUMN "endTimestamp" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "endTimestamp" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UnlockdownTask" ALTER COLUMN "endTimestamp" SET DEFAULT 0;
