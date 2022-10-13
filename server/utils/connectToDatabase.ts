import mongoose from 'mongoose'

const connectToDatabase = async (uri: string) => {
  try {
    const { connection } = await mongoose.connect(uri)
    console.warn(`Connected to database on ${connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectToDatabase
