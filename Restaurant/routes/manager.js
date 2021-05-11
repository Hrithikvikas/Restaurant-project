//routes for manager
const path = require('path');
const express = require('express');

const homeCon = require('../controllers/manager/home');
const cartCon = require('../controllers/manager/cart');
const analyticsCon = require('../controllers/manager/analytics');
const pending_approvalCon = require('../controllers/manager/pending_approval');
const groceryCon = require('../controllers/manager/grocery');
const edit_menuCon=  require('../controllers/manager/edit_menu');
const menuCon= require('../controllers/manager/menu');
const prep_ordCon = require('../controllers/manager/prepared_orders');

const router = express.Router();

router.get('/home',homeCon.get_test);
router.post('/home',homeCon.post_test);

router.get('/cart',cartCon.get_test);
router.post('/cart',cartCon.post_delete_item);

router.get('/analytics',analyticsCon.get_test);
router.post('/analytics',analyticsCon.post_test);

router.get('/pending_approval',pending_approvalCon.get_pending);
router.post('/pending_approval',pending_approvalCon.post_test);

router.get('/grocery',groceryCon.get_test);
router.post('/grocery',groceryCon.post_test);

router.get('/edit_menu',edit_menuCon.get_test);
router.post('/edit_menu',edit_menuCon.post_test);

router.post('/orders',cartCon.post_make_order);

router.get('/menu',menuCon.get_test);
router.post('/menu',menuCon.post_add_cart);

router.get('/prepared_orders',prep_ordCon.get_prepared_orders);

module.exports = router;
