import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'

import ApiError from '../../errors/ApiError'
import config from '../../config'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'validationError') {
    const simplefiedError = handleValidationError(error)
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
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
