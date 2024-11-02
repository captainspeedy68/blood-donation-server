import { Application, Request, Response} from 'express'
import cors from 'cors'
import express from 'express'

import { handleError } from './app/middlewares/globalErrorHandler'
import { notFound } from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api',router)

const test = (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', test)


// Use the error handler
app.use(handleError);


// not found route
app.use(notFound);

export default app;
