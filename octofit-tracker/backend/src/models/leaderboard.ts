import { Schema, model, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    teamName: { type: String, required: true, trim: true },
    weeklyScore: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekOf: { type: Date, required: true },
  },
  { timestamps: true }
)

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>
export const LeaderboardModel = model('Leaderboard', leaderboardSchema)
