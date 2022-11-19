import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.register);

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteuser);

export default router;
