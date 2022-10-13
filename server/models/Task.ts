import mongoose from 'mongoose'
const { Schema } = mongoose

export type TaskLabelType = 'High' | 'Medium' | 'Low'

export type TaskStatusType = 'Next Up' | 'In Progress' | 'Completed'

export interface ITask {
  _id: string
  title: string
  description?: string
  createdAt: Date
  dueDate?: Date
  label: TaskLabelType
  status: TaskStatusType
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, required: true },
  dueDate: { type: Date, required: false },
  label: { type: String, default: 'Medium' },
  status: { type: String, default: 'Next Up' },
})

export default mongoose.model<ITask>('Task', taskSchema)
