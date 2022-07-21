-- CreateTable
CREATE TABLE "Reminder" (
    "id" STRING NOT NULL DEFAULT '',
    "channelId" STRING,
    "authorId" STRING NOT NULL DEFAULT '',
    "text" STRING NOT NULL DEFAULT '',
    "endTimestamp" INT8 NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_id_key" ON "Reminder"("id");
