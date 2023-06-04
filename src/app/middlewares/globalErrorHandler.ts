import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import { error } from 'winston'
import ApiError from '../../errors/ApiError'
import { Error } from 'mongoose'
import config from '../../config'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    const simplefiedError = handleValidationError(err)
    statusCode = simplefiedError.statusCode
    message = simplefiedError.message
    errorMessage = simplefiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
