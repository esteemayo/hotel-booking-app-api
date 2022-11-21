import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.patch('/reset-password/:token', authController.resetPassword);

export default router;
