import express from "express"
import prisma from "../db.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const { matchId, guess } = req.body

  // Look for a matching player in the match lineups
  const lineup = await prisma.lineup.findFirst({
    where: {
      matchId: Number(matchId),
      player: {
        slug: guess
      }
    },
    include: { player: true }
  })

  if (lineup) {
    res.json({ result: "correct", player: lineup.player, team: lineup.team })
  } else {
    res.json({ result: "wrong" })
  }
})

export default router
