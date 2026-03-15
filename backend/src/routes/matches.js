// backend/routes/matches.js
import express from "express"
import prisma from "../db.js"

const router = express.Router()

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)

  const match = await prisma.match.findUnique({
    where: { id },
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
