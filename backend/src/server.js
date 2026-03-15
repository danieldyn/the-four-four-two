import express from "express"
import cors from "cors"
import matches from "./routes/matches.js"
import guessesRouter from "./routes/guesses.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/matches", matches)
app.use("/guess", guessesRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})