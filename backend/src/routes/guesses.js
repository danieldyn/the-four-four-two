import express from "express"
import prisma from "../db.js"
import slugify from "../../utils/slugify.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const { matchId, guess } = req.body
  if (!guess)
    return res.status(400).json({ error: "Missing guess" })

  // Make sure the guess is normalised (GuessInput should already have done that)
  const normalisedGuess = slugify(guess)

  try {
    const lineups = await prisma.lineup.findMany({
      where: { matchId: Number(matchId) },
      include: { player: true }
    })

    // Check if any player's slug ends with the guess
    const lineup = lineups.find(l => l.player.slug.endsWith(normalisedGuess))

    if (lineup) {
      return res.json({ result: "correct", player: lineup.player, team: lineup.team })
    } else {
      return res.json({ result: "wrong" })
    }
  } catch (err) {
    console.error("Guess lookup error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router
