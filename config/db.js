import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'colors';

dotenv.config({ path: './config.env' });

const devEnv = process.env.NODE_ENV !== 'production';
const { DATABASE, DATABASE_LOCAL, DATABASE_PASSWORD } = process.env;

const dbLocal = DATABASE_LOCAL;
const MONGO_URI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

const db = devEnv ? dbLocal : MONGO_URI;

const connectDB = async () => {
  try {
    const cons = await mongoose.connect(db);
    console.log(`Connected to MongoDB ↔ ${cons.connection.port}`.gray.bold);
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected'.red.bold);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected'.cyan.bold);
});

export default connectDB;
