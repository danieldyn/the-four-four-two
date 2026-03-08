const prisma = require("./src/db")

async function run() {
  const players = await prisma.player.findMany()

  console.log(players)
}

run()
