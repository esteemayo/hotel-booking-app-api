import fs from 'fs';
import dotenv from 'dotenv';

import User from '../../models/User.js';
import Room from '../../models/Room.js';
import Hotel from '../../models/Hotel.js';
import connectDB from '../../config/db.js';

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
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

const removeData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Hotel.deleteMany();
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === '--load') {
  loadData();
} else if (process.argv[2] === '--remove') {
  removeData();
}
