const express = require('express');
const {registerUser, authUser, updateUserProfile, forgetPassword} = require('../controllers/userControllers.js');
const {protect} = require('../middleWares/authMiddleWare.js')

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect,updateUserProfile);
router.route('/forgetPassword').post(forgetPassword);

module.exports =  router;