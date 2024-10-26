import { Application, Request, Response } from 'express'
import cors from 'cors';
import express from "express";
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express()

app.use(express.json());
app.use(cors());

app.use("/api/user", UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;
