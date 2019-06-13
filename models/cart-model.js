'use strict';

const mysqlPool = require('./databases/mysql-pool');

const { Schema } = mysqlPool;

const cartSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  posts: [Schema.ObjectId],
});

const Cart = mysqlPool.model('Cart', cartSchema);

module.exports = Cart;
