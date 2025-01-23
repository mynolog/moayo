import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`\n→ Server running at: http://localhost:${PORT}`);
});
