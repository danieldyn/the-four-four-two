const express = require("express")
const router = express.Router()

const prisma = require("../db")

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

module.exports = router
