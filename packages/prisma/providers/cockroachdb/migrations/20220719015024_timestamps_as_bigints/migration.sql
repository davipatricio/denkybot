/*
  Warnings:

  - Changed the type of `startTime` on the `Afk` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimestamp` on the `Giveaway` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimestamp` on the `UnlockdownTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Afk" DROP COLUMN "startTime";
ALTER TABLE "Afk" ADD COLUMN     "startTime" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "Giveaway" DROP COLUMN "endTimestamp";
ALTER TABLE "Giveaway" ADD COLUMN     "endTimestamp" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "UnlockdownTask" DROP COLUMN "endTimestamp";
ALTER TABLE "UnlockdownTask" ADD COLUMN     "endTimestamp" INT8 NOT NULL;
