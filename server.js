/* eslint-disable */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';

import app from './app.js';

dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try {
    const cons = await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log(`Connected to MongoDB ↔ ${cons.connection.port}`.gray.bold);
  } catch (err) {
    throw err;
  }
};

app.set('port', process.env.PORT || 8800);

const server = app.listen(app.get('port'), async () => {
  await connectDB();
  console.log(`App listening on port ↔ ${server.address().port}`.green.bold);
});
