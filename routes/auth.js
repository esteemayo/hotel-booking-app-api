import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/login', authController.login);

export default router;
