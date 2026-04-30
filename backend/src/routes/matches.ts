import express, { Request, Response, Router } from "express";
import prisma from "../db.js";

const router: Router = express.Router();

router.get("/random", async (_req: Request, res: Response) => {
  try {
    // Obtain all match IDs
    const matches = await prisma.match.findMany({
      select: { id: true }
    });

    // Sanity check
    if (matches.length === 0) {
      return res.status(404).json({ error: "No matches found in database" });
    }

    // Select a random ID
    const randomIndex = Math.floor(Math.random() * matches.length);
    const randomMatch = matches[randomIndex];

    if (!randomMatch) {
      throw new Error("Random selection failed");
    }

    // Fetch the full match data
    const match = await prisma.match.findUnique({
      where: { id: randomMatch.id },
      include: {
        lineups: {
          include: {
            player: true
          }
        }
      }
    });

    return res.json(match);
  } catch (err) {
    console.error("Match fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch match" });
  }
});

export default router;
