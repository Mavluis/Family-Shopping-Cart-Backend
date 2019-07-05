'use strict';

const mysql = require('../../../databases/mysql-pool');
const uuidV4 = require('uuid/v4');

/* Create a Cart by login */

async function createCart(req, res, next) {

  req.datas = {
    cart_id: uuidV4()
  }

  const requestData = { ...req.body };

  const note = requestData.note;
  const { uuid } = req.claims;
  const { cart_id } = req.datas;
  const created_at = new Date();
  const sqlQuery = 'INSERT INTO carts SET ?';
  const connection = await mysql.getConnection();

  try {
    await connection.query(sqlQuery, {
      note,
      cart_id,
      created_at,
      user_id: uuid
    });
    connection.release();
    next();
    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }
}

/* Create a product Cart by login */

async function createcartProducts(req, res, next) {

  const { names } = { ...req.body };
  const { cart_id } = req.datas;
  const created_at = new Date();

  const sqlQuery = 'INSERT INTO cart_products SET ?';
  const connection = await mysql.getConnection();

  try {
    names.forEach(async name => {
      const [rows] = await connection.execute(`SELECT product_id FROM products WHERE name = '${name}'`)
      const product_id = rows[0].product_id;
      await connection.query(sqlQuery, {
        cart_id,
        product_id,
        created_at
      });
    });

    connection.release();
    next();
    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }
}

module.exports = { createCart, createcartProducts };
