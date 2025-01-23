import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/cors';
import connectDB from './config/db';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB(process.env.MONGO_URI as string);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`\n→ Server running at: http://localhost:${PORT}`);
});
