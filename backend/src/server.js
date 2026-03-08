const express = require("express")
const cors = require("cors")

const matches = require("./routes/matches")
const guesses = require("./routes/guesses")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/matches", matches)
app.use("/guess", guesses)

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
