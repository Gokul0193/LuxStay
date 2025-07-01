const express=require('express');
const router=express.Router();
const userController=require('../controller/authcontroller.js');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/google-login',userController.googleLogin);
router.post('/reg-update',userController.updateReg)
module.exports=router;