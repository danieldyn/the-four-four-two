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
    // Query the DB for a player based on perfect input, last name slug or the alias
    const lineup = await prisma.lineup.findFirst({
      where: {
        matchId: Number(matchId),
        player: {
          OR: [
            { slug: normalisedGuess },
            { slug: { endsWith: `-${normalisedGuess}` } },
            { alias: normalisedGuess }
          ]
        }
      },
      include: { player: true }
    })

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
