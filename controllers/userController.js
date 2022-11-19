import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import createSendToken from '../utils/createSendToken.js';

export const register = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  if (user) {
    createSendToken(user, StatusCodes.CREATED, req, res);
  }
});
