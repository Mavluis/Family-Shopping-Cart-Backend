'use strict';

const mysql = require('../../../databases/mysql-pool');

const sqlQuery = 'SELECT uuid.users, user_id.carts, amount.cart_products, name.products from users, carts, cart_products, products';

const connection = await mysql.getConnection();

connection.query(sqlQuery, {
    note,
    name,
    amount,
    cart_id,
    user_id: uuid
});

connection.release();

console.log("System Failure!!!");
