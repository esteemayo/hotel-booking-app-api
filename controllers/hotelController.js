import slugify from 'slugify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';
import NotFoundError from '../errors/notFound.js';

export const getHotels = asyncHandler(async (req, res, next) => {
  const hotels = await Hotel.find();

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: hotels.length,
    hotels,
  })
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
  const {
    body: { name, slug },
    params: { id: hotelId },
  } = req;

  if (name) slug = slugify(name, { lower: true });

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
