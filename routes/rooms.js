import express from 'express';

import authMiddiware from '../middlewares/authMiddleware.js';
import * as roomController from '../controllers/roomController.js';

const router = express.Router();

router.get('/', roomController.getRooms);

router.post(
  '/:hotelId',
  authMiddiware.protect,
  authMiddiware.restrictTo('admin'),
  roomController.createRoom
);

router.patch('/availability/:id', roomController.updateRoomAvailability);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authMiddiware.protect,
    authMiddiware.restrictTo('admin'),
    roomController.updateRoom
  );

router.delete(
  '/:id/:hotelId',
  authMiddiware.protect,
  authMiddiware.restrictTo('admin'),
  roomController.deleteRoom
);

export default router;
