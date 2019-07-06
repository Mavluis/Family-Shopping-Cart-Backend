'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {

    const accountData = { ...req.body };
    console.log(accountData);
    try {
        const connection = await mysql.getConnection();
        const sqlQueryUser = `SELECT uuid FROM users 
        WHERE email = '${accountData.email}'`;
        const [uuid] = await connection.query(sqlQueryUser);
        console.log(uuid);

        const userId = [uuid];
        console.log(userId);

        const sqlQueryNote = `SELECT note FROM carts 
            WHERE cart_id = '${userId}'`;
        const [note] = await connection.query(sqlQueryNote);
        console.log(note);

        const sqlQueryName = `SELECT name FROM cart_products 
            INNER JOIN products ON cart_products.product_id = 
            products.product_id WHERE cart_id = '${userId}'`;
        const [name] = await connection.query(sqlQueryName);

        const cartProducts = name.concat(note);
        console.log(cartProducts);

        connection.release();
        return res.status(201).send();
    } catch (e) {
        return res.status(400).send(e);
        console.log("System Failure!!!");
    }
}

module.exports = { Cart };