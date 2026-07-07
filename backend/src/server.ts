import express, { Application } from "express";
import cors from "cors";
import matches from "./matches.js";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173", // Local frontend development
  "https://danieldyn.github.io"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps) or part of the allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

// Endpoints
app.use("/matches", matches);

const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`);
});
