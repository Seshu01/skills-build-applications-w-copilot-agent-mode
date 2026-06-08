import { Schema, model, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true }
)

export type Activity = InferSchemaType<typeof activitySchema>
export const ActivityModel = model('Activity', activitySchema)
