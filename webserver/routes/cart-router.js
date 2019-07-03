'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const { createCart, createcartProducts, createProducts } = require('../controllers/post/create-cart');
const { Cart } = require('../controllers/get/cart');

const router = express.Router();

router.post('/create-cart', checkJwtToken, createCart, createcartProducts, createProducts);
router.get('/cart', Cart);

module.exports = router;
