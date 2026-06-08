"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    teamName: { type: String, required: true, trim: true },
    weeklyScore: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekOf: { type: Date, required: true },
}, { timestamps: true });
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
