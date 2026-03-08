const prisma = require("../db")

async function checkGuess(matchId, guess) {
  const players = await prisma.lineup.findMany({
    where: { matchId, starter: true },
    include: { player: true }
  })

  // Accept guesses with inconsistent capitalization or special characters
  const slug = guess
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const found = players.find(
    p => p.player.slug === slug
  )

  if (found) {
    return { result: "correct", player: found.player.lastName }
  }

  return { result: "incorrect" }
}

module.exports = { checkGuess }
