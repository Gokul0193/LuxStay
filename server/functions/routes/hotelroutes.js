const express = require('express');
const router = express.Router();

const hotelController = require('../controller/hotelcontroller.js');




router.post('/hotel-reg', hotelController.hotelRegistration);
router.post('/room-reg',hotelController.roomRegistration);
router.get('/:hotelId',hotelController.getRooms);


module.exports = router;
