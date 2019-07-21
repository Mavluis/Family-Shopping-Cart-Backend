'use strict';

const mysql = require('../../../databases/mysql-pool');

/* Select the fullName of the BB.DD for insertion on either side of the api. */

async function User(req, res, next) {

    const { uuid } = req.claims;

    try {
        const connection = await mysql.getConnection();
        const sqlQuery = `SELECT fullName FROM users  
        WHERE uuid = '${uuid}'`;
        const [fullName] = await connection.query(sqlQuery);

        connection.release();
        return res.status(201).send(fullName[0]);
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = { User };
