//routes for kitchen
const path = require('path');
const express = require('express');

const homeCon = require('../controllers/kitchen/home');
const groceryCon = require('../controllers/kitchen/grocery');
const { route } = require('./login');
const router = express.Router();

router.get('/home',homeCon.get_test);
router.post('/home',homeCon.post_test);

router.get('/grocery',groceryCon.get_test);
router.post('/grocery',groceryCon.post_test);

module.exports = router;
