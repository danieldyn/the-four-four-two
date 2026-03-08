const prisma = require("../db")

async function checkGuess(matchId, guess) {

 const players = await prisma.lineup.findMany({
   where: { matchId, starter: true },
   include: { player: true }
 })

 const found = players.find(
   p => p.player.slug === guess
 )

 if (found) {
   return {
     result: "correct",
     player: found.player.lastName,
     team: found.team
   }
 }

 return { result: "incorrect" }
}

module.exports = { checkGuess }
