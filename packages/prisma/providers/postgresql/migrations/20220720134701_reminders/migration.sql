-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL DEFAULT '',
    "channelId" TEXT,
    "authorId" TEXT NOT NULL DEFAULT '',
    "text" TEXT NOT NULL DEFAULT '',
    "endTimestamp" BIGINT NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_id_key" ON "Reminder"("id");
