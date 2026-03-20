/*
  Warnings:

  - A unique constraint covering the columns `[matchId,playerId]` on the table `Lineup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lineup" ADD COLUMN "minuteIn" INTEGER;
ALTER TABLE "Lineup" ADD COLUMN "minuteOut" INTEGER;
ALTER TABLE "Lineup" ADD COLUMN "position" TEXT;
ALTER TABLE "Lineup" ADD COLUMN "shirtNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Lineup_matchId_playerId_key" ON "Lineup"("matchId", "playerId");
