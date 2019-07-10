'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {

    const { uuid } = req.claims;

    try {
        const connection = await mysql.getConnection();
        const sqlQueryUuidNote = `SELECT note, cart_id FROM carts 
        WHERE carts.user_id = "${uuid}" 
        ORDER BY carts.created_at DESC LIMIT 1`;
        const [cartInfo] = await connection.query(sqlQueryUuidNote);

        if (!cartInfo || !cartInfo[0] || !cartInfo[0].cart_id) {
            return res.status(201).send([]);
        }

        const sqlQueryName = `SELECT name FROM cart_products 
        INNER JOIN products ON cart_products.product_id = 
        products.product_id WHERE cart_id = "${cartInfo[0].cart_id}"`;
        const [products] = await connection.query(sqlQueryName);

        connection.release();
        return res.status(201).send({
            note: cartInfo[0].note,
            products: products.map(product => {
                return product.name
            })
        });
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = { Cart };