import { Schema, model, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    focusAreas: [{ type: String, required: true }],
    equipment: [{ type: String, required: true }],
    instructions: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export type Workout = InferSchemaType<typeof workoutSchema>
export const WorkoutModel = model('Workout', workoutSchema)
