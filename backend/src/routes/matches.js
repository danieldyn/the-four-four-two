import express from "express"
import prisma from "../db.js"

const router = express.Router()

router.get("/random", async (req, res) => {
  const matches = await prisma.match.findMany({
    select: { id: true }
  })

  // This very basic randomiser may be changed later
  const random = matches[Math.floor(Math.random() * matches.length)]

  const match = await prisma.match.findUnique({
    where: { id: random.id },
    include: {
      lineups: {
        include: {
          player: true
        }
      }
    }
  })

  res.json(match)
})

export default router
