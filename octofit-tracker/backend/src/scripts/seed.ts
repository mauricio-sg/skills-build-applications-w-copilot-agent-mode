import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel
} from '../models';

const mongoUri = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.create([
    { name: 'Ariana Torres', email: 'ariana@octofit.local', role: 'member' },
    { name: 'Marcus Lee', email: 'marcus@octofit.local', role: 'coach' },
    { name: 'Priya Singh', email: 'priya@octofit.local', role: 'member' }
  ]);

  const teams = await TeamModel.create([
    { name: 'Sunrise Sprinters', members: 8 },
    { name: 'Night Shift Ninjas', members: 11 }
  ]);

  const activities = await ActivityModel.create([
    { userId: users[0]._id.toString(), type: 'running', durationMinutes: 50 },
    { userId: users[1]._id.toString(), type: 'cycling', durationMinutes: 70 },
    { userId: users[2]._id.toString(), type: 'yoga', durationMinutes: 30 }
  ]);

  const leaderboard = await LeaderboardModel.create([
    { rank: 1, name: 'Sunrise Sprinters', score: 1345 },
    { rank: 2, name: 'Night Shift Ninjas', score: 1280 },
    { rank: 3, name: 'Weekend Warriors', score: 1175 }
  ]);

  const workouts = await WorkoutModel.create([
    { title: 'Power HIIT', description: 'Fast-paced intervals to build strength and endurance.', difficulty: 'advanced' },
    { title: 'Core Stabilizer', description: 'Focus on abs, glutes, and back stability.', difficulty: 'intermediate' },
    { title: 'Recovery Stretch', description: 'Gentle mobility routine to help your body recover.', difficulty: 'beginner' }
  ]);

  console.log('Inserted sample data:');
  console.log(`- users: ${users.length}`);
  console.log(`- teams: ${teams.length}`);
  console.log(`- activities: ${activities.length}`);
  console.log(`- leaderboard: ${leaderboard.length}`);
  console.log(`- workouts: ${workouts.length}`);

  await mongoose.connection.close();
  console.log('Seed complete');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
