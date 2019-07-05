'use strict'

const mysql = require('../../databases/mysql-pool');
const uuidV4 = require('uuid/v4');

async function createProduct(name) {

    const created_at = new Date();
    const sqlQuery = 'INSERT INTO products SET ?';
    const connection = await mysql.getConnection();
    const product_id = uuidV4();

    try {
        await connection.query(sqlQuery, {
            product_id,
            name,
            created_at
        });

        connection.release();
    } catch (e) {
        console.log(e.message);
    }
}

/**
 * 
 * @param {[string]} names 
 */
async function createProducts(names) {
    // names.forEach(name => createProduct(name)); // lo mismo
    names.forEach(createProduct);
}

module.exports = { createProducts };