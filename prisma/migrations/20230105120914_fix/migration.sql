-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "MissingTimes" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("MissingTimes", "account", "id", "nickname", "password") SELECT "MissingTimes", "account", "id", "nickname", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
