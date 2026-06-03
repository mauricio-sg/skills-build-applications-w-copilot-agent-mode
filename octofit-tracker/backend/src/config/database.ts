import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGO_URI, {
    dbName: 'octofit_db'
  });
  console.log('Connected to MongoDB at', MONGO_URI);
}

export default mongoose;
