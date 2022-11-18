import slugify from 'slugify';
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel must have a name'],
    trim: true,
  },
  slug: String,
  type: {
    type: String,
    required: [true, 'Hotel must have a type'],
  },
  city: {
    type: String,
    required: [true, 'Hotel must belong to a city'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Hotel must have an address'],
    trim: true,
  },
  distance: {
    type: String,
    required: [true, 'Hotel must have a distance field'],
    trim: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: [true, 'Hotel must have a title'],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, 'Hotel must have a description'],
    trim: true,
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5'],
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, 'Cheapest price must be supplied'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;
