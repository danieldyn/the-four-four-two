import express, { Application } from "express";
import cors from "cors";
import matches from "./routes/matches.js";
import guessesRouter from "./routes/guesses.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/matches", matches);
app.use("/guess", guessesRouter);

const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`);
});
