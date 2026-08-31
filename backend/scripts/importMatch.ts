import fs from "node:fs";
import prisma from "../src/db.js";
import slugify from "../utils/slugify.js";
import splitName, { NameSplit } from "../utils/splitName.js";

/**
 * The shape of a player in the imported JSON lineup.
 * Players might have an alias that everyone calls them by, 
 * which is significant for UX and the corectness of the game.
 * The displayed name will greatly influence what appear on the UI
 * and may sometimes differ from the alias of the player. An example
 * would be players wearing their first name on the back of their
 * shirt, but being referred to using their full name for clarity.
 */
interface PlayerInput {
  name: string;
  number: number;
  position: string;
  alias?: string;
  display?: string;
  goalsScored?: number;
  isCaptain?: boolean;
}

/**
 * The shape of the entire JSON match file.
 * The match requires some standard data for context and
 * informative UI, plus two starting elevens of PlayerInput.
 */
interface MatchJson {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  venue: string;
  date: string;
  score: string;
  homeLineup: PlayerInput[];
  awayLineup: PlayerInput[];
}

/**
 * Coordinates the JSON match import process, leading to 
 * a new entry in the Prisma database.
 */
async function importMatch(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    console.error("Please provide a path to a JSON file");
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: MatchJson = JSON.parse(rawData);

  // Create the Match record in the database
  const match = await prisma.match.create({
    data: {
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      competition: data.competition,
      date: new Date(data.date),
      score: data.score,
      venue: data.venue
    }
  });

  /**
   * Internal helper, adds a player to the given team, using a 
   * full-name slug to avoid confusion.
   */
  async function addPlayer(player: PlayerInput, team: string): Promise<void> {
    const { firstName, lastName }: NameSplit = splitName(player.name);
    const slug: string = slugify(player.name);

    // Handle optional fields
    const alias: string | null = player.alias ? slugify(player.alias) : null;
    const display: string = player.display ?? lastName;

    // Check if player exists or create them
    let dbPlayer = await prisma.player.findUnique({
      where: { slug }
    });

    if (!dbPlayer) {
      dbPlayer = await prisma.player.create({
        data: {
          firstName,
          lastName,
          slug,
          alias,
          display
        }
      });
    }

    // Create the Lineup entry (the link between Match and Player)
    await prisma.lineup.create({
      data: {
        matchId: match.id,
        playerId: dbPlayer.id,
        team,
        shirtNumber: player.number,
        position: player.position,
        starter: true,
        isCaptain: player.isCaptain ?? false,
        goalsScored: player.goalsScored ?? 0
      }
    });
  }

  // Process both teams
  for (const p of data.homeLineup) {
    await addPlayer(p, data.homeTeam);
  }

  for (const p of data.awayLineup) {
    await addPlayer(p, data.awayTeam);
  }

  console.log(`Successfully imported: ${match.homeTeam} vs ${match.awayTeam}`);
}

// Execute the script
const filePath: string | undefined = process.argv[2];

importMatch(filePath)
  .then(() => {
    console.log("Exiting process...");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Import failed:", err);
    process.exit(1);
  });
