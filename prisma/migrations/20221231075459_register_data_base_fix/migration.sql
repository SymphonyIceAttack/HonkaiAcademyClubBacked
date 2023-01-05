/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("account", "id", "nickname", "password") SELECT "account", "id", "nickname", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
