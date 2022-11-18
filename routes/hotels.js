import express from 'express';
import * as hotelController from '../controllers/hotelController.js';

const router = express.Router();

router.get('/details/:slug', hotelController.getHotelBySlug);

router
  .route('/')
  .get(hotelController.getHotels)
  .post(hotelController.createHotel);

router
  .route('/:id')
  .get(hotelController.getHotelById)
  .patch(hotelController.updateHotel)
  .delete(hotelController.deleteHotel);

export default router;
