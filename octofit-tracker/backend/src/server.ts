import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_tracker'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri)
    app.listen(port, () => {
      console.log(`OctoFit backend running on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

void start()
