import express, { Request, Response, Router } from "express";
import prisma from "./db.js";

const router: Router = express.Router();

/**
 * Endpoint that provides a random match object from the database.
 * Designed to be used when pressing the "New Game" button, so
 * it allows the URL query to specify the category and the IDs
 * of the already played matches from that category.
 */
router.get("/random", async (_req: Request, res: Response) => {
  try {
    // Extract additional information from the URL query string
    const category = (_req.query.category as string | undefined)?.trim();
    const excluded = _req.query.exclude as string | undefined;

    let excludedIds: number[] = [];
    if (excluded)
      excludedIds = excluded.split(",").map((id) => parseInt(id, 10)).filter((id) => !isNaN(id));

    // Database filtering criteria
    const whereClause: any = {};
    if (category)
      whereClause.competition = { contains: category };

    if (excludedIds.length > 0)
      whereClause.id = { notIn: excludedIds };

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
      orderBy: { id: 'asc' },
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
