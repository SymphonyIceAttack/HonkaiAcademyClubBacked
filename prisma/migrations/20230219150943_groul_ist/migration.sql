/*
  Warnings:

  - You are about to drop the `GroupListShare` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GroupListShare";

-- CreateTable
CREATE TABLE "grouplistshare" (
    "id" TEXT NOT NULL,
    "MaskShare" TEXT NOT NULL,

    CONSTRAINT "grouplistshare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "grouplistshare_MaskShare_idx" ON "grouplistshare" USING HASH ("MaskShare");
