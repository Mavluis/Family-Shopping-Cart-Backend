'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const { createCart, createcartProducts } = require('../controllers/post/create-cart');
const { Cart } = require('../controllers/get/cart');
const { User } = require('../controllers/get/user');

const router = express.Router();

router.post('/create-cart', checkJwtToken, createCart, createcartProducts);
router.get('/cart', checkJwtToken, Cart);
router.get('/user', checkJwtToken, User);

module.exports = router;
