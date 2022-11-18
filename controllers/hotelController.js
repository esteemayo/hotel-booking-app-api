import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';

export const getHotels = asyncHandler(async (req, res, next) => {
  const hotels = await Hotel.find();

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: hotels.length,
    hotels,
  })
});

export const getHotelById = asyncHandler(async (req, res, next) => { });

export const getHotelBySlug = asyncHandler(async (req, res, next) => { });

export const createHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    hotel,
  });
});

export const updateHotel = asyncHandler(async (req, res, next) => { });

export const deleteHotel = asyncHandler(async (req, res, next) => { });
