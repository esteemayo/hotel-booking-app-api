import express from 'express';

import authMiddiware from '../middlewares/authMiddleware.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);

router.patch(
  '/update-my-password',
  authMiddiware.protect,
  authController.updatePassword
);

export default router;
