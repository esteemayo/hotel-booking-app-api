import slugify from 'slugify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';
import APIFeatures from '../utils/apiFeatures.js';
import NotFoundError from '../errors/notFound.js';

export const getHotels = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Hotel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const hotels = await features.query;

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: hotels.length,
    hotels,
  })
});

export const countByCity = asyncHandler(async (req, res, next) => {
  const cities = req.query.cities.split(',');

  const list = await Promise.all(cities.map((city) => {
    return Hotel.countDocuments({ city })
  }));

  res.status(StatusCodes.OK).json({
    status: 'success',
    list,
  });
});

export const countByType = asyncHandler(async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
  const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
  const resortCount = await Hotel.countDocuments({ type: 'resort' });
  const villaCount = await Hotel.countDocuments({ type: 'villa' });
  const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

  res.status(StatusCodes.OK).json([
    { type: 'hotel', count: hotelCount },
    { type: 'apartment', count: apartmentCount },
    { type: 'resort', count: resortCount },
    { type: 'villa', count: villaCount },
    { type: 'cabin', count: cabinCount },
  ]);
});

export const getHotelById = asyncHandler(async (req, res, next) => {
  const { id: hotelId } = req.params;

  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    return next(
      new NotFoundError(`There is no hotel found with the given ID → ${hotelId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    hotel,
  });
});

export const getHotelBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const hotel = await Hotel.findOne({ slug });

  if (!hotel) {
    return next(
      new NotFoundError(`There is no hotel found with the given SLUG → ${slug}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    hotel,
  });
});

export const createHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    hotel,
  });
});

export const updateHotel = asyncHandler(async (req, res, next) => {
  const { id: hotelId } = req.params;

  if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });

  const hotel = await Hotel.findByIdAndUpdate(
    hotelId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!hotel) {
    return next(
      new NotFoundError(`There is no hotel found with the given ID → ${hotelId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    hotel,
  });
});

export const deleteHotel = asyncHandler(async (req, res, next) => {
  const { id: hotelId } = req.params;

  const hotel = await Hotel.findByIdAndDelete(hotelId);

  if (!hotel) {
    return next(
      new NotFoundError(`There is no hotel found with the given ID → ${hotelId}`)
    );
  }

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    hotel: null,
  });
});
