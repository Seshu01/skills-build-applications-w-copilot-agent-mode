import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users/', (_req, res) => {
  res.json({ message: 'Users route is ready' })
})

app.get('/api/teams/', (_req, res) => {
  res.json({ message: 'Teams route is ready' })
})

app.get('/api/activities/', (_req, res) => {
  res.json({ message: 'Activities route is ready' })
})

app.get('/api/leaderboard/', (_req, res) => {
  res.json({ message: 'Leaderboard route is ready' })
})

app.get('/api/workouts/', (_req, res) => {
  res.json({ message: 'Workouts route is ready' })
})

app.get('/api/config', (_req, res) => {
  res.json({
    baseUrl,
    isCodespaces: Boolean(codespaceName),
  })
})

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri)
    app.listen(port, () => {
      console.log(`OctoFit backend running on port ${port}`)
      console.log(`OctoFit API base URL: ${baseUrl}`)
    })
  } catch (error) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

void start()
