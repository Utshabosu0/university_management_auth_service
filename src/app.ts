import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application Routes
app.use('/api/v1/users/', usersRouter)

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

//global error handler
app.use(globalErrorHandler)

export default app
