-- CreateTable
CREATE TABLE "ReactionRole" (
    "id" STRING NOT NULL,
    "roleId" STRING NOT NULL DEFAULT '',
    "emojiId" STRING NOT NULL DEFAULT '',
    "messageId" STRING NOT NULL DEFAULT '',
    "guildId" STRING NOT NULL DEFAULT '',
    "type" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "ReactionRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReactionRole_id_key" ON "ReactionRole"("id");
