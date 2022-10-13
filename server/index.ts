import express, { Express } from 'express'
import dotenv from 'dotenv'
import connectToDatabase from './utils/connectToDatabase'
import taskRoutes from './routes/task.routes'
import { errorHandler } from './controller/error.controller'
import morgan from 'morgan'

dotenv.config({ path: './.env.local' })

connectToDatabase(process.env.MONGO_URI as string)

const app: Express = express()
const port = process.env.PORT || 3001

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

// * routes
app.use('/api/tasks', taskRoutes)

// * handle 404
app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Route is not found' })
  next()
})

// * handle errors
app.use(errorHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
