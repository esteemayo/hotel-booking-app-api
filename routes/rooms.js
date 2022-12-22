import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as roomController from '../controllers/roomController.js';

const router = express.Router();

router.get('/', roomController.getRooms);

router.post(
  '/:hotelId',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  roomController.createRoom
);

router.patch('/availability/:id', roomController.updateRoomAvailability);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    roomController.updateRoom
  );

router.delete(
  '/:id/:hotelId',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  roomController.deleteRoom
);

export default router;
