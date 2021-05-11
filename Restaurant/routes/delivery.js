//routes for delivery
const path = require('path');
const express = require('express');

const homeCon = require('../controllers/delivery/home');
const profileCon = require('../controllers/delivery/profile');
const { route } = require('./login');
const router = express.Router();

router.get('/home',homeCon.get_test);
router.post('/home',homeCon.post_test);

router.get('/profile',profileCon.get_profile);
router.post('/profile',profileCon.post_edit_profile);

module.exports = router;
