import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A room must have a title'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A room must have a price'],
  },
  maxPeople: {
    type: Number,
    required: [true, 'A room maxPeople field must be specified'],
  },
  desc: {
    type: String,
    required: [true, 'A room must have a description'],
    trim: true,
  },
  roomNumbers: [
    {
      number: Number,
      unavailableDates: { type: [Date] },
    },
  ],
}, {
  timestamps: true,
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;
