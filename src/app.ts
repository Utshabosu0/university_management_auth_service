import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(cookieParser());

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
app.use('/api/v1/', routes);

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   //res.send('Working Successfully!')
//   throw new Error('Tasting Error')
//   //next('Error')//Error
//   // Promise.reject(new Error('unhandled Promise rejection'))
//   //console.log(x)
// })

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
