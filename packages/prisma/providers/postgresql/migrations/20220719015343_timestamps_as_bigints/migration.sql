-- AlterTable
ALTER TABLE "Afk" ALTER COLUMN "startTime" DROP DEFAULT,
ALTER COLUMN "startTime" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Giveaway" ALTER COLUMN "endTimestamp" DROP DEFAULT,
ALTER COLUMN "endTimestamp" SET DATA TYPE BIGINT;
DROP SEQUENCE "Giveaway_endTimestamp_seq";

-- AlterTable
ALTER TABLE "UnlockdownTask" ALTER COLUMN "endTimestamp" DROP DEFAULT,
ALTER COLUMN "endTimestamp" SET DATA TYPE BIGINT;
DROP SEQUENCE "UnlockdownTask_endTimestamp_seq";
