import { connectDatabase, disconnectDatabase } from '../config/database'
import { ActivityModel } from '../models/activity'
import { LeaderboardModel } from '../models/leaderboard'
import { TeamModel } from '../models/team'
import { UserModel } from '../models/user'
import { WorkoutModel } from '../models/workout'

const seed = async (): Promise<void> => {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data')

  await connectDatabase()

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ])

  await TeamModel.insertMany([
    {
      name: 'Octo Sprinters',
      description: 'Cardio-first team focused on consistent daily progress.',
      city: 'Seattle',
      memberCount: 3,
      points: 1540,
    },
    {
      name: 'Core Commanders',
      description: 'Strength and mobility training with weekly team goals.',
      city: 'Austin',
      memberCount: 2,
      points: 1325,
    },
  ])

  await UserModel.insertMany([
    {
      name: 'Maya Brooks',
      email: 'maya.brooks@example.com',
      age: 29,
      fitnessLevel: 'intermediate',
      goals: ['Improve 5K time', 'Build leg endurance'],
      teamName: 'Octo Sprinters',
    },
    {
      name: 'Ethan Cole',
      email: 'ethan.cole@example.com',
      age: 34,
      fitnessLevel: 'advanced',
      goals: ['Increase weekly mileage', 'Lower resting heart rate'],
      teamName: 'Octo Sprinters',
    },
    {
      name: 'Nora Patel',
      email: 'nora.patel@example.com',
      age: 26,
      fitnessLevel: 'beginner',
      goals: ['Stay active 4x/week', 'Improve core strength'],
      teamName: 'Core Commanders',
    },
  ])

  await ActivityModel.insertMany([
    {
      userEmail: 'maya.brooks@example.com',
      activityType: 'Run',
      durationMinutes: 42,
      caloriesBurned: 430,
      activityDate: new Date('2026-06-06T07:15:00Z'),
    },
    {
      userEmail: 'ethan.cole@example.com',
      activityType: 'Cycle',
      durationMinutes: 55,
      caloriesBurned: 610,
      activityDate: new Date('2026-06-06T18:40:00Z'),
    },
    {
      userEmail: 'nora.patel@example.com',
      activityType: 'Yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      activityDate: new Date('2026-06-07T06:20:00Z'),
    },
  ])

  await LeaderboardModel.insertMany([
    {
      userEmail: 'ethan.cole@example.com',
      teamName: 'Octo Sprinters',
      weeklyScore: 520,
      rank: 1,
      weekOf: new Date('2026-06-01T00:00:00Z'),
    },
    {
      userEmail: 'maya.brooks@example.com',
      teamName: 'Octo Sprinters',
      weeklyScore: 470,
      rank: 2,
      weekOf: new Date('2026-06-01T00:00:00Z'),
    },
    {
      userEmail: 'nora.patel@example.com',
      teamName: 'Core Commanders',
      weeklyScore: 390,
      rank: 3,
      weekOf: new Date('2026-06-01T00:00:00Z'),
    },
  ])

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Run Builder',
      difficulty: 'intermediate',
      durationMinutes: 40,
      focusAreas: ['Cardio', 'Pacing'],
      equipment: ['Running shoes'],
      instructions: 'Warm up for 10 minutes, run 20 minutes at tempo pace, cool down for 10 minutes.',
    },
    {
      title: 'Core Stability Circuit',
      difficulty: 'beginner',
      durationMinutes: 25,
      focusAreas: ['Core', 'Mobility'],
      equipment: ['Yoga mat'],
      instructions: 'Complete 3 rounds of planks, dead bugs, and glute bridges with short rests.',
    },
    {
      title: 'Power Intervals',
      difficulty: 'advanced',
      durationMinutes: 45,
      focusAreas: ['Strength', 'Explosiveness'],
      equipment: ['Kettlebell', 'Jump rope'],
      instructions: 'Alternate 1 minute high-intensity intervals with 1 minute recovery for 20 rounds.',
    },
  ])

  console.log('Seeding completed successfully.')
  await disconnectDatabase()
}

void seed().catch(async (error) => {
  console.error('Seeding failed.', error)
  await disconnectDatabase()
  process.exit(1)
})
