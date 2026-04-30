import { PrismaClient } from "@prisma/client";

// This ensures we don't create multiple Prisma instances during development restarts
const prisma = new PrismaClient();

export default prisma;
