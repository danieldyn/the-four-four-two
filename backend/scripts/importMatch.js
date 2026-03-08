const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

async function run() {
  const match = await prisma.match.create({
    data: {
      competition: "World Cup",
      date: new Date("2006-07-09"),
      venue: "Berlin",
      homeTeam: "France",
      awayTeam: "Italy",
      score: "1-1 (5-3 pens)"
    }
  })

  const france = [
    "Barthez","Sagnol","Thuram","Gallas","Abidal",
    "Makelele","Vieira","Ribery","Zidane","Malouda","Henry"
  ]

  const italy = [
    "Buffon","Zambrotta","Cannavaro","Materazzi","Grosso",
    "Camoranesi","Pirlo","Gattuso","Perrotta","Totti","Toni"
  ]

  async function insert(team, names) {
    for (const name of names) {
      const player = await prisma.player.create({
        data: {
          firstName: "",
          lastName: name,
          slug: slugify(name) 
        }
      })

      await prisma.lineup.create({
        data: {
          matchId: match.id,
          team,
          playerId: player.id,
          starter: true
        }
      })
    }
  }

  await insert("France", france)
  await insert("Italy", italy)
}

run()
