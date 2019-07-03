'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {
    
    const accountData = { ...req.body };
    const sqlQuery = `SELECT 
    uuid.users, user_id.carts, amount.cart_products, 
    name.products from users, carts, cart_products, 
    products WHERE email = '${accountData.email}'`;
    const connection = await mysql.getConnection();
    
    try {
        await connection.query(sqlQuery, {
            note,
            name,
            amount,
            cart_id,
            user_id: uuid
        });
        connection.release();
        return res.status(201).send();
    } catch (e) {
        console.log("System Failure!!!");
        return res.status(400).send(e);
    }
}

module.exports = { Cart };