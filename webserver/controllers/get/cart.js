'use strict';

const mysql = require('../../../databases/mysql-pool');

async function Cart(req, res, next) {

    try {

        const connection = await mysql.getConnection();
        const sqlQuery = `SELECT name FROM cart_products 
        INNER JOIN products ON cart_products.product_id = 
        products.product_id WHERE cart_id = '6850cccb-df85-4bd4-83ba-f15f087e5431'`;
        const [result] = await connection.query(sqlQuery);

        const sqlQuery1 = `SELECT note FROM carts 
        WHERE user_id = '4debe0f9-4835-46c8-bd10-a056d5859409'`;
        const [result1] = await connection.query(sqlQuery1);
        
        console.log(result);
        console.log(result1);
        
        connection.release();
        return res.status(201).send();
    } catch (e) {
        return res.status(400).send(e);
        console.log("System Failure!!!");
    }
}

module.exports = { Cart };