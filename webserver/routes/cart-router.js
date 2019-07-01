'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const createCart = require('../controllers/post/create-cart');
const createcartProducts = require('../controllers/post/create-cart-products');

const router = express.Router();

router.post('/create-cart', checkJwtToken, createCart);
router.post('/create-cart_products', checkJwtToken, createcartProducts);

module.exports = router;
