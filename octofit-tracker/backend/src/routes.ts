import { Request, Response, Router } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel
} from './models';

const usersRouter = Router();
const teamsRouter = Router();
const activitiesRouter = Router();
const leaderboardRouter = Router();
const workoutsRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  const users = await UserModel.find().lean();
  res.json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const newUser = await UserModel.create({
    name: payload.name || 'New User',
    email: payload.email || 'no-reply@octofit.dev',
    role: payload.role || 'member'
  });
  res.status(201).json(newUser);
});

teamsRouter.get('/', async (_req: Request, res: Response) => {
  const teams = await TeamModel.find().lean();
  res.json(teams);
});

teamsRouter.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const newTeam = await TeamModel.create({
    name: payload.name || 'New Team',
    members: payload.members || 1
  });
  res.status(201).json(newTeam);
});

activitiesRouter.get('/', async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find().lean();
  res.json(activities);
});

activitiesRouter.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const newActivity = await ActivityModel.create({
    userId: payload.userId || '',
    type: payload.type || 'unknown',
    durationMinutes: payload.durationMinutes || 0
  });
  res.status(201).json(newActivity);
});

leaderboardRouter.get('/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

leaderboardRouter.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const newEntry = await LeaderboardModel.create({
    rank: payload.rank || 0,
    name: payload.name || 'Unknown',
    score: payload.score || 0
  });
  res.status(201).json(newEntry);
});

workoutsRouter.get('/', async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find().lean();
  res.json(workouts);
});

workoutsRouter.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const newWorkout = await WorkoutModel.create({
    title: payload.title || 'New Workout',
    description: payload.description || 'A new workout session.',
    difficulty: payload.difficulty || 'beginner'
  });
  res.status(201).json(newWorkout);
});

export { usersRouter, teamsRouter, activitiesRouter, leaderboardRouter, workoutsRouter };
