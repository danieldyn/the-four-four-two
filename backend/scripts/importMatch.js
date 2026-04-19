import fs from "fs"
import prisma from "../src/db.js"
import slugify from "../utils/slugify.js"
import splitName from "../utils/splitName.js"

/**
 * Coordinates the JSON match import process, leading to a new entry in the Prisma database.
 * @param {file} file 
 */
async function importMatch(file) {
  if (!file) {
    console.error("Please provide a JSON file")
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(file, "utf-8"))

  const match = await prisma.match.create({
    data: {
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      competition: data.competition,
      date: new Date(data.date),
      score: data.score,
      venue: data.venue
    }
  })

  /**
   * Adds a player to the given team, using a full-name slug to avoid confusion
   * @param {*} player 
   * @param {*} team 
   */
  async function addPlayer(player, team) {
    const { firstName, lastName } = splitName(player.name)
    const slug = slugify(player.name)

    const rawAlias = player.alias ?? null // Alias entry missing equivalent with null
    const alias = rawAlias ? slugify(rawAlias) : null

    const display = player.display ?? lastName // Display entry missing leads to last name fallback

    let dbPlayer = await prisma.player.findUnique({
      where: { slug }
    })

    if (!dbPlayer) {
      dbPlayer = await prisma.player.create({
        data: {
          firstName,
          lastName,
          slug,
          alias,
          display
        }
      })
    }

    await prisma.lineup.create({
      data: {
        matchId: match.id,
        playerId: dbPlayer.id,
        team,
        shirtNumber: player.number,
        position: player.position,
        starter: true
      }
    })
  }

  for (const p of data.homeLineup) {
    await addPlayer(p, data.homeTeam)
  }

  for (const p of data.awayLineup) {
    await addPlayer(p, data.awayTeam)
  }

  // Debug message in the terminal
  console.log(`Imported: ${match.homeTeam} vs ${match.awayTeam}`)
}

const file = process.argv[2]

importMatch(file)
  .then(() => process.exit())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
