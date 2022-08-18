-- CreateTable
CREATE TABLE "ButtonRole" (
    "messageId" TEXT NOT NULL DEFAULT '',
    "roles" TEXT[],
    "type" INTEGER NOT NULL,

    CONSTRAINT "ButtonRole_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ButtonRole_messageId_key" ON "ButtonRole"("messageId");
