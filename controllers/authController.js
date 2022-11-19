import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import BadRequestError from '../errors/badRequest.js';
import UnauthenticatedError from '../errors/unauthenticated.js';
import createSendToken from '../utils/createSendToken.js';

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new BadRequestError('Please provide username and password'));
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new UnauthenticatedError('Incorrect username or password'));
  }

  createSendToken(user, StatusCodes.OK, req, res);
});
