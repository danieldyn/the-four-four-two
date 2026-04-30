import express, { Request, Response, Router } from "express";
import prisma from "../db.js";
import slugify from "../../utils/slugify.js";

const router: Router = express.Router();

/**
 * The shape of an incoming request body.
 * The match's ID may be a number or a string.
 * The guess that arrives from the frontend is normalised.
 */
interface GuessRequestBody {
  matchId: string | number;
  guess: string;
}

router.post("/", async (req: Request<{}, {}, GuessRequestBody>, res: Response) => {
  const { matchId, guess } = req.body;

  if (!guess) {
    return res.status(400).json({ error: "Missing guess" });
  }

  // Make sure the guess is normalised (GuessInput should already have done that)
  const normalisedGuess = slugify(guess);

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
    });

    // Add the response's payload
    if (lineup) {
      return res.json({ 
        result: "correct", 
        player: lineup.player, 
        team: lineup.team 
      });
    } else {
      return res.json({ result: "wrong" });
    }
  } catch (err) {
    console.error("Guess lookup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
