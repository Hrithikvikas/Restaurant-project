const path = require('path');
const express = require('express');


const loginCon = require('../controllers/login');
const signupCon= require('../controllers/signup');


const router = express.Router();


router.get('/login',loginCon.get_login);
router.post('/login',loginCon.post_login);

router.get('/signup',signupCon.get_signup);
router.post('/signup',signupCon.post_signup);


module.exports = router;
