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
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
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

hotelSchema.index({ city, cheapestPrice });
hotelSchema.index({ slug: 1 });

hotelSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true });

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const hotelWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (hotelWithSlug.length) {
    this.slug = `${this.slug}-${hotelWithSlug.length + 1}`;
  }
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;
