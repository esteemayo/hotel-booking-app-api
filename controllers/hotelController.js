import slugify from 'slugify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';
import NotFoundError from '../errors/notFound.js';

export const getHotels = asyncHandler(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((item) => delete queryObj[item]);

  console.log(queryObj);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);

  let query = Hotel.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 100;
  const skip = (page - 1) * limit;

  if (req.query.page) {
    query = query.skip(skip).limit(limit);
  }

  const hotels = await query;

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
    return Hotel.countDocuments({ city: city })
  }));

  res.status(StatusCodes.OK).json({
    status: 'success',
    list,
  });
});

export const countByType = asyncHandler(async (req, res, next) => {

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
