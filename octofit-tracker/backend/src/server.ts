import express from 'express'
import { connectDatabase } from './config/database'
import { ActivityModel } from './models/activity'
import { LeaderboardModel } from './models/leaderboard'
import { TeamModel } from './models/team'
import { UserModel } from './models/user'
import { WorkoutModel } from './models/workout'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users', (_req, res) => {
  void UserModel.find().sort({ createdAt: -1 }).then((users) => {
    res.json(users)
  }).catch((error: unknown) => {
    res.status(500).json({ message: 'Failed to fetch users', error })
  })
})

app.get('/api/teams', (_req, res) => {
  void TeamModel.find().sort({ points: -1 }).then((teams) => {
    res.json(teams)
  }).catch((error: unknown) => {
    res.status(500).json({ message: 'Failed to fetch teams', error })
  })
})

app.get('/api/activities', (_req, res) => {
  void ActivityModel.find().sort({ activityDate: -1 }).then((activities) => {
    res.json(activities)
  }).catch((error: unknown) => {
    res.status(500).json({ message: 'Failed to fetch activities', error })
  })
})

app.get('/api/leaderboard', (_req, res) => {
  void LeaderboardModel.find().sort({ rank: 1 }).then((entries) => {
    res.json(entries)
  }).catch((error: unknown) => {
    res.status(500).json({ message: 'Failed to fetch leaderboard entries', error })
  })
})

app.get('/api/workouts', (_req, res) => {
  void WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).then((workouts) => {
    res.json(workouts)
  }).catch((error: unknown) => {
    res.status(500).json({ message: 'Failed to fetch workouts', error })
  })
})

app.get('/api/config', (_req, res) => {
  res.json({
    baseUrl,
    isCodespaces: Boolean(codespaceName),
  })
})

const start = async (): Promise<void> => {
  try {
    await connectDatabase()
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
