const express = require("express")
const router = express.Router()

const { checkGuess } = require("../services/guessService")

router.post("/", async (req, res) => {
  const { matchId, guess } = req.body

  const result = await checkGuess(matchId, guess)

  res.json(result)
})

module.exports = router
