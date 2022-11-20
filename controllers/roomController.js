import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import NotFoundError from '../errors/notFound.js';

export const getRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: rooms.length,
    rooms,
  });
});

export const getRoom = asyncHandler(async (req, res, next) => {
  const { id: roomId } = req.params;

  const room = await Room.findById(roomId);

  if (!room) {
    return next(
      new NotFoundError(`There is no room found with the given ID → ${roomId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    room,
  });
});

export const createRoom = asyncHandler(async (req, res, next) => {
  const { hotelId } = req.params;

  const room = await Room.create({ ...req.body });
  await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: room._id },
  });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    room,
  });
});

export const updateRoom = asyncHandler(async (req, res, next) => {
  const { id: roomId } = req.params;

  const room = await Room.findByIdAndUpdate(
    roomId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    return next(
      new NotFoundError(`There is no room found with the given ID → ${roomId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    room,
  });
});

export const deleteRoom = asyncHandler(async (req, res, next) => { });
