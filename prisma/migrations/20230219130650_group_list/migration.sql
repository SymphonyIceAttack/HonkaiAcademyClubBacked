-- CreateTable
CREATE TABLE "GroupListShare" (
    "id" TEXT NOT NULL,
    "MaskShare" TEXT NOT NULL,

    CONSTRAINT "GroupListShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupListShare_MaskShare_idx" ON "GroupListShare" USING HASH ("MaskShare");
