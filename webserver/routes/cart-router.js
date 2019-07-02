'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const { createCart, createcartProducts, createProducts } = require('../controllers/post/create-cart');

const router = express.Router();

router.post('/create-cart', checkJwtToken, createCart, createcartProducts, createProducts);

module.exports = router;
