'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {

    const accountData = { ...req.body };

    try {
        const connection = await mysql.getConnection();
        const sqlQueryUuidNote = `SELECT note FROM users 
        INNER JOIN carts ON users.uuid = carts.user_id 
        WHERE email = '${accountData.email}'`;
        const [note] = await connection.query(sqlQueryUuidNote);

        const sqlQueryCart = `SELECT cart_id FROM carts 
        INNER JOIN users ON users.uuid = 
        carts.user_id WHERE email = '${accountData.email}'`;
        const [cart] = await connection.query(sqlQueryCart);
        console.log(cart);

/* [ TextRow { cart_id: '6850cccb-df85-4bd4-83ba-f15f087e5431' } ] */

        const sqlQueryName = `SELECT name FROM cart_products 
        INNER JOIN products ON cart_products.product_id = 
        products.product_id WHERE cart_id = "${cart}"`;
        const [name] = await connection.query(sqlQueryName);
        console.log({name});

        const cartProducts = note.concat(name);
        console.log(cartProducts);

        connection.release();
        return res.status(201).send();
    } catch (e) {
        return res.status(400).send(e);
        console.log("System Failure!!!");
    }
}

module.exports = { Cart };