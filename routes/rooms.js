import express from 'express';

import authMiddiware from '../middlewares/authMiddleware.js';
import * as roomController from '../controllers/roomController.js';

const router = express.Router();

router
  .route('/')
  .get(roomController.getRooms)
  .post(
    authMiddiware.protect,
    authMiddiware.restrictTo('admin'),
    roomController.createRoom
  );

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authMiddiware.protect,
    authMiddiware.restrictTo('admin'),
    roomController.updateRoom
  )
  .delete(
    authMiddiware.protect,
    authMiddiware.restrictTo('admin'),
    roomController.deleteRoom
  );

export default router;
