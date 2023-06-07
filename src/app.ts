import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

//Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application Routes
app.use('/api/v1/users/', UserRoutes)

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   //res.send('Working Successfully!')
//   throw new Error('Tasting Error')
//   //next('Error')//Error
//   // Promise.reject(new Error('unhandled Promise rejection'))
//   //console.log(x)
// })

//global error handler
app.use(globalErrorHandler)

export default app
