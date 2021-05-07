const path = require('path');
const express = require('express');

const homeCon = require('../controllers/customer/home');
const cartCon = require('../controllers/customer/cart');
const ordersCon = require('../controllers/customer/orders');
const profileCon = require('../controllers/customer/profile');
const tableCon = require('../controllers/customer/tables');
const booktableCon=  require('../controllers/customer/booktable');
const { route } = require('./login');
const router = express.Router();

router.get('/home',homeCon.get_home);
router.post('/home',homeCon.post_add_cart);

router.get('/cart',cartCon.get_cart);
router.post('/cart',cartCon.post_delete_item);

router.get('/profile',profileCon.get_profile);
router.post('/profile',profileCon.post_edit_profile);

router.get('/orders',ordersCon.get_orders);
router.post('/orders',ordersCon.post_add_order);

router.get('/tables',tableCon.get_cust_table);
router.post('/tables',tableCon.post_choose_slot);

router.get('/booktable',booktableCon.get_avl_tables);
router.post('/booktable',booktableCon.post_select_table);

// router.get('/prods',adminCon.get_test_products);
// // router.post('/prods',adminCon.post_test_products);

// router.get('/cart', cartCon.get_test_cart);
// router.post('/cart',cartCon.post_test_cart);

// router.get('/orders',ordersCon.get_orders);
// router.post('/orders',ordersCon.post_add_order);
module.exports = router;
