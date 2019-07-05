'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {

    try {
        const connection = await mysql.getConnection();
        const sqlQuery = `SELECT cart_id, name FROM cart_products 
            INNER JOIN products ON cart_products.product_id = 
            products.product_id`;
        const [result] = await connection.query(sqlQuery);

        const sqlQuery1 = `SELECT user_id, note FROM carts INNER JOIN 
            users ON carts.user_id = users.uuid`;
        const [result1] = await connection.query(sqlQuery1);

        console.log(result);
        console.log(result1);

        console.log("System Failure!!!");

        connection.release();
        return res.status(201).send();
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = { Cart };