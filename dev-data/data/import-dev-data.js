import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import 'colors';

import User from '../../models/User.js';
import Room from '../../models/Room.js';
import Hotel from '../../models/Hotel.js';
import connectDB from '../../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config.env' });

// database connection
connectDB();

// read JSON file
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf-8'));
const hotels = JSON.parse(fs.readFileSync(`${__dirname}/hotels.json`, 'utf-8'));

// import data into DB
const loadData = async () => {
  try {
    await Room.create(rooms);
    await Hotel.create(hotels);
    await User.create(users, { validateBeforeSave: false });
    console.log(
      'šššššššš Data successfully loaded! šššššššš'.green.bold
    );
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// remove all data from DB
const removeData = async () => {
  try {
    console.log('š¢š¢ Goodbye Data...');
    await User.deleteMany();
    await Room.deleteMany();
    await Hotel.deleteMany();
    console.log(
      'Data successfully deleted! To load sample data, run\n\n\t npm run sample\n\n'
        .blue.bold
    );
    process.exit();
  } catch (err) {
    console.log(
      '\nšššššššš Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
        .red.bold
    );
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === '--load') {
  loadData();
} else if (process.argv[2] === '--remove') {
  removeData();
}
