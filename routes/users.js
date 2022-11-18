import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.register);

export default router;
