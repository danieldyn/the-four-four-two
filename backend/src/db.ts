import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: 'file:./prisma/dev.db'
})

// This ensures we don't create multiple Prisma instances during development restarts
const prisma = new PrismaClient({ adapter });

export default prisma;
