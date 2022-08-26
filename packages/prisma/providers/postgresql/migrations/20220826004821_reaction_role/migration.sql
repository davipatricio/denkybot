-- CreateTable
CREATE TABLE "ReactionRole" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL DEFAULT '',
    "emojiId" TEXT NOT NULL DEFAULT '',
    "messageId" TEXT NOT NULL DEFAULT '',
    "guildId" TEXT NOT NULL DEFAULT '',
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReactionRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReactionRole_id_key" ON "ReactionRole"("id");
