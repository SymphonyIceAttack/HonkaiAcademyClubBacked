-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "MissingTimes" INTEGER NOT NULL DEFAULT 0,
    "Attendance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatarImgage" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "avatarImgage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipmentImage" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "equipmentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoeChapterImage" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MoeChapterImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendanceRecordSheet" (
    "id" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isMiss" BOOLEAN NOT NULL,

    CONSTRAINT "attendanceRecordSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");

-- CreateIndex
CREATE UNIQUE INDEX "avatarImgage_userId_key" ON "avatarImgage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "equipmentImage_userId_key" ON "equipmentImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MoeChapterImage_userId_key" ON "MoeChapterImage"("userId");

-- AddForeignKey
ALTER TABLE "avatarImgage" ADD CONSTRAINT "avatarImgage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipmentImage" ADD CONSTRAINT "equipmentImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoeChapterImage" ADD CONSTRAINT "MoeChapterImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendanceRecordSheet" ADD CONSTRAINT "attendanceRecordSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
