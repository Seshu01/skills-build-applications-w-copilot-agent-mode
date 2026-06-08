import { Schema, model, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
)

export type Team = InferSchemaType<typeof teamSchema>
export const TeamModel = model('Team', teamSchema)
