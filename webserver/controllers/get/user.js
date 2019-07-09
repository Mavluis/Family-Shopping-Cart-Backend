'use strict';

const mysql = require('../../../databases/mysql-pool');

async function User(req, res, next) {

    const requestData = { ...req.body };
    console.log(requestData);

    try {
        const connection = await mysql.getConnection();
        const sqlQuery = `SELECT note FROM users 
        INNER JOIN carts ON users.uuid = carts.user_id 
        WHERE email = '${accountData.email}' 
        ORDER BY carts.created_at DESC LIMIT 1`;
        const [note] = await connection.query(sqlQuery);

        connection.release();
        return res.status(201).send();
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = { User };