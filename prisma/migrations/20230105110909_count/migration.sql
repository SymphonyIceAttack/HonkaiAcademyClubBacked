/*
  Warnings:

  - Added the required column `MissingTimes` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "MissingTimes" INTEGER NOT NULL
);
INSERT INTO "new_User" ("account", "id", "nickname", "password") SELECT "account", "id", "nickname", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
