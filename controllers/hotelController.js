import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';

export const getHotels = asyncHandler(async (req, res, next) => { });

export const getHotelById = asyncHandler(async (req, res, next) => { });

export const getHotelBySlug = asyncHandler(async (req, res, next) => { });

export const createHotel = asyncHandler(async (req, res, next) => { });

export const updateHotel = asyncHandler(async (req, res, next) => { });

export const deleteHotel = asyncHandler(async (req, res, next) => { });
