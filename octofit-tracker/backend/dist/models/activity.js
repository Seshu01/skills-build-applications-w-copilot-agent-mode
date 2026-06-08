"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    activityDate: { type: Date, required: true },
}, { timestamps: true });
exports.ActivityModel = (0, mongoose_1.model)('Activity', activitySchema);
