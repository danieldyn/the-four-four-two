-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lineup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "shirtNumber" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "starter" BOOLEAN NOT NULL DEFAULT true,
    "minuteIn" INTEGER,
    "minuteOut" INTEGER,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "goalsScored" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lineup_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lineup_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lineup" ("id", "matchId", "minuteIn", "minuteOut", "playerId", "position", "shirtNumber", "starter", "team") SELECT "id", "matchId", "minuteIn", "minuteOut", "playerId", "position", "shirtNumber", "starter", "team" FROM "Lineup";
DROP TABLE "Lineup";
ALTER TABLE "new_Lineup" RENAME TO "Lineup";
CREATE UNIQUE INDEX "Lineup_matchId_playerId_key" ON "Lineup"("matchId", "playerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
