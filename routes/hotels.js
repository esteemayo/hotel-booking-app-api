import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as hotelController from '../controllers/hotelController.js';

const router = express.Router();

router.get('/count-by-city', hotelController.countByCity);

router.get('/count-by-type', hotelController.countByType);

router.get('/room/:id', hotelController.getHotelRooms);

router.get('/details/:slug', hotelController.getHotelBySlug);

router
  .route('/')
  .get(hotelController.getHotels)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    hotelController.createHotel
  );

router
  .route('/:id')
  .get(hotelController.getHotelById)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    hotelController.updateHotel
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    hotelController.deleteHotel
  );

export default router;
