import mongoose from 'mongoose'

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected')
    return
  }
  const db = await mongoose.connect(
    process.env.DATABASE_URI || 'mongodb://localhost:27017/sodkeeb'
  )
  return db
}
