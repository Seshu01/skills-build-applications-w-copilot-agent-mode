"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users/', (_req, res) => {
    void user_1.UserModel.find().sort({ createdAt: -1 }).then((users) => {
        res.json(users);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to fetch users', error });
    });
});
app.get('/api/teams/', (_req, res) => {
    void team_1.TeamModel.find().sort({ points: -1 }).then((teams) => {
        res.json(teams);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    });
});
app.get('/api/activities/', (_req, res) => {
    void activity_1.ActivityModel.find().sort({ activityDate: -1 }).then((activities) => {
        res.json(activities);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    });
});
app.get('/api/leaderboard/', (_req, res) => {
    void leaderboard_1.LeaderboardModel.find().sort({ rank: 1 }).then((entries) => {
        res.json(entries);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to fetch leaderboard entries', error });
    });
});
app.get('/api/workouts/', (_req, res) => {
    void workout_1.WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).then((workouts) => {
        res.json(workouts);
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    });
});
app.get('/api/config', (_req, res) => {
    res.json({
        baseUrl,
        isCodespaces: Boolean(codespaceName),
    });
});
const start = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(port, () => {
            console.log(`OctoFit backend running on port ${port}`);
            console.log(`OctoFit API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend', error);
        process.exit(1);
    }
};
void start();
