-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lineup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchId" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "starter" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Lineup_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lineup_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lineup" ("id", "matchId", "playerId", "team") SELECT "id", "matchId", "playerId", "team" FROM "Lineup";
DROP TABLE "Lineup";
ALTER TABLE "new_Lineup" RENAME TO "Lineup";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
