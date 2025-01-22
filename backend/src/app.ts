import express, { Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("hello, ts with express");
});

app.listen(PORT, () => {
  console.log("\n");
  console.log(`→ Server running at: http://localhost:${PORT}`);
});
