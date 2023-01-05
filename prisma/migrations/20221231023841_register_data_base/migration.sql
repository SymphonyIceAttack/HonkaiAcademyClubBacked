-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "avatarImgage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "avatarImgage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "equipmentImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "equipmentImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MoeChapterImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MoeChapterImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "avatarImgage_userId_key" ON "avatarImgage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "equipmentImage_userId_key" ON "equipmentImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MoeChapterImage_userId_key" ON "MoeChapterImage"("userId");
