import { NextFunction, Request, Response } from 'express'
import { defaultMessages } from '../utils/errorMessages'

const DEFAULT_STATUS_CODE = 500

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') console.error(err)

  res
    .status(err.statusCode || DEFAULT_STATUS_CODE)
    .json({ message: err.message || defaultMessages.serverError })

  next()
}
