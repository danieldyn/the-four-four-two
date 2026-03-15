const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const fs = require("fs")

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

async function importMatch(file) {
  const data = JSON.parse(fs.readFileSync(file))

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

  async function addPlayer(player, team) {

    const lastName = player.name.split(" ").slice(-1)[0]
    const slug = slugify(lastName)

    let dbPlayer = await prisma.player.findUnique({
      where: { slug }
    })

    if (!dbPlayer) {
      dbPlayer = await prisma.player.create({
        data: {
          firstName: player.name.replace(" " + lastName, ""),
          lastName,
          slug
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

  console.log("Imported:", match.homeTeam, "vs", match.awayTeam)
}

importMatch(process.argv[2])
  .then(() => process.exit())

