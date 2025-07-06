const express = require('express');
const router = express.Router();

const hotelController = require('../controller/hotelcontroller.js');




router.post('/hotel-reg', hotelController.hotelRegistration);
router.post('/room-reg',hotelController.roomRegistration);
router.post('/rooms/:hotelId', hotelController.getRoomDetails)
router.post('/room-update/:roomId', hotelController.roomDetailsUpdate)
router.get('/hotel-room',hotelController.hotelRoom)



module.exports = router;
