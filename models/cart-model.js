'use strict';

const mysql = require('mysql2');

const { Schema } = mysql;

const cartSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  posts: [],
});

const Cart = mysql.model('Cart', cartSchema);

module.exports = Cart;
