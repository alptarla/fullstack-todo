import { NextFunction, Request, Response } from 'express'
import Task, { ITask } from '../models/Task'
import createError from 'http-errors'
import mongoose from 'mongoose'
import { defaultMessages } from '../utils/errorMessages'

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ITask = req.body

    await Task.create({
      ...body,
      createdAt: Date.now(),
    })

    res.status(200).json({ message: defaultMessages.success })
  } catch (error: any) {
    next(createError(500, error?.message || defaultMessages.serverError))
  }
}

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200).json({ tasks })
  } catch (error: any) {
    next(createError(500, error?.message || defaultMessages.serverError))
  }
}

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id))
      return next(createError(400, defaultMessages.objectId))

    const task: ITask | null = await Task.findById(req.params.id)
    if (!task) return next(createError(404, `Task ${defaultMessages.notFound}`))

    res.status(200).json({ task })
  } catch (error: any) {
    next(createError(500, error?.message || defaultMessages.serverError))
  }
}
