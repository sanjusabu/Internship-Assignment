const express = require('express')
// const { check } = require('express-validator');
const router = express.Router();

const usersController =  require('../controllers/usersControllers')

router.post('/signup',usersController.signup);
router.post('/login',usersController.login)
  module.exports = router;