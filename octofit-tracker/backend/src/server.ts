import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
import {
  usersRouter,
  teamsRouter,
  activitiesRouter,
  leaderboardRouter,
  workoutsRouter
} from './routes';
import {
  UserModel,
  TeamModel,
  ActivityModel,
  LeaderboardModel,
  WorkoutModel
} from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME || '';
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl,
    codespaceName: codespaceName || null,
    database: 'octofit_db'
  });
});

app.get('/api/verify', async (_req: Request, res: Response) => {
  const [usersCount, teamsCount, activitiesCount, leaderboardCount, workoutsCount] = await Promise.all([
    UserModel.countDocuments(),
    TeamModel.countDocuments(),
    ActivityModel.countDocuments(),
    LeaderboardModel.countDocuments(),
    WorkoutModel.countDocuments()
  ]);

  res.json({
    database: 'octofit_db',
    apiUrl,
    counts: {
      users: usersCount,
      teams: teamsCount,
      activities: activitiesCount,
      leaderboard: leaderboardCount,
      workouts: workoutsCount
    }
  });
});

export async function startServer(): Promise<void> {
  await connectDatabase();
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`Backend listening on ${apiUrl}`);
      resolve();
    });
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Backend startup failed:', error);
    process.exit(1);
  });
}
