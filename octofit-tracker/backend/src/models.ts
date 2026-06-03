import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
}

export interface ITeam extends Document {
  name: string;
  members: number;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
}

export interface ILeaderboard extends Document {
  rank: number;
  name: string;
  score: number;
}

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: { type: Number, required: true }
});

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true }
});

const leaderboardSchema = new Schema<ILeaderboard>({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true }
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true }
});

const UserModel = mongoose.model<IUser>('User', userSchema);
const TeamModel = mongoose.model<ITeam>('Team', teamSchema);
const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);
const LeaderboardModel = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
const WorkoutModel = mongoose.model<IWorkout>('Workout', workoutSchema);

export { UserModel, TeamModel, ActivityModel, LeaderboardModel, WorkoutModel };
