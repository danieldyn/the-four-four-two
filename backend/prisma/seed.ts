import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import slugify from '../utils/slugify.js';
import splitName from '../utils/splitName.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

/**
 * Identical player shape with the one used by the match importer.
 */
interface PlayerInput {
  name: string;
  number: number;
  position: string;
  alias?: string;
  display?: string;
}

/**
 * Parses and adds one match to the database, ensuring there are no duplicates.
 */
async function processMatch(data: any) {
  // Use a findFirst check to see if this specific game already exists
  let match = await prisma.match.findFirst({
    where: {
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      date: new Date(data.date)
    }
  });

  // Avoid having duplicates in the database
  if (!match) {
    match = await prisma.match.create({
      data: {
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        competition: data.competition,
        date: new Date(data.date),
        score: data.score,
        venue: data.venue
      }
    });
  }

  const addPlayerToLineup = async (player: PlayerInput, teamName: string) => {
    const { firstName, lastName } = splitName(player.name);
    const slug = slugify(player.name);
    const alias = player.alias ? slugify(player.alias) : null;
    const display = player.display ?? lastName;

    // Upsert Player
    const dbPlayer = await prisma.player.upsert({
      where: { slug },
      update: { alias, display }, // Update display/alias if they changed in JSON
      create: { firstName, lastName, slug, alias, display }
    });

    // Upsert Lineup
    await prisma.lineup.upsert({
      where: {
        matchId_playerId: { matchId: match.id, playerId: dbPlayer.id }
      },
      update: {},
      create: {
        matchId: match.id,
        playerId: dbPlayer.id,
        team: teamName,
        shirtNumber: player.number,
        position: player.position,
        starter: true
      }
    });
  };

  // Ensure lineups exist in the payload before iterating
  if (data.homeLineup) {
    for (const p of data.homeLineup) await addPlayerToLineup(p, data.homeTeam);
  }
  if (data.awayLineup) {
    for (const p of data.awayLineup) await addPlayerToLineup(p, data.awayTeam);
  }

  console.log(`Processed: ${data.homeTeam} vs ${data.awayTeam}`);
}

/**
 * Reads a JSON file, normalises it to an array, and processes each match sequentially.
 */
async function processMatchFile(filePath: string) {
  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const matches = Array.isArray(rawData) ? rawData : [rawData];

  for (const match of matches) {
    await processMatch(match);
  }
}

// Recursive crawler to find all .json files in /data
async function main() {
  const dataDir = path.join(__dirname, '../data');
  const folders = fs.readdirSync(dataDir);

  for (const folder of folders) {
    const folderPath = path.join(dataDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
      for (const file of files) {
        await processMatchFile(path.join(folderPath, file));
      }
    }
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
