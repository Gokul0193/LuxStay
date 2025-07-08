const express = require('express');
const router = express.Router();

const hotelController = require('../controller/hotelcontroller.js');




router.post('/hotel-reg', hotelController.hotelRegistration);
router.post('/room-reg',hotelController.roomRegistration);
router.post('/rooms/:hotelId', hotelController.getRoomDetails)
router.post('/room-update/:roomId', hotelController.roomDetailsUpdate)
router.get('/hotel-room',hotelController.hotelRoom)
router.post('/room-booking',hotelController.booking)
router.get('/bookings/:userId',hotelController.bookingDetails)
router.put('/bookings/:bookingId',hotelController.roomPayment)
module.exports = router;
