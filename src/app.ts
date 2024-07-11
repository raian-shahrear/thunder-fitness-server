import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Thunder Fitness server.');
});

export default app;
