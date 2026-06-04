import express, { Request, Response, Router } from "express";
import prisma from "../db.js";

const router: Router = express.Router();

router.get("/random", async (_req: Request, res: Response) => {
  try {
    // Extract the category from the URL query string
    const category = (_req.query.category as string | undefined)?.trim();

    // Database filtering criteria
    const whereClause = category 
      ? { competition: { contains: category } } 
      : {};

    const count = await prisma.match.count({
      where: whereClause
    });

    if (count === 0)
      return res.status(404).json({ error: "No matches found for this category" });

    // Select a random match
    const skip = Math.floor(Math.random() * count);
    const match = await prisma.match.findFirst({
      where: whereClause,
      skip: skip,
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
