'use strict';

const mysql = require('../../../databases/mysql-pool');
const uuidV4 = require('uuid/v4');

async function createCart(req, res, next) {
  
  const requestData = { ...req.body };
  const note = requestData.note;
  const { uuid } = req.claims;
  const cart_id = uuidV4();
  const created_at = new Date();
  
  const sqlQuery = 'INSERT INTO carts SET ?';
  const connection = await mysql.getConnection();
  
  console.log({ requestData, uuid, note, cart_id })
  console.log("System Failure!!!");
  try {
    await connection.query(sqlQuery, {
      note,
      cart_id,
      created_at,
      user_id: uuid,
    });
    connection.release();

    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }
}

module.exports = createCart;

async function createcartProducts(req, res, next) {
  
  const requestData = { ...req.body };
  const amount = requestData.amount;
  const { uuid } = req.claims;
  const product_id = uuidV4();

  const sqlQuery = 'INSERT INTO cart_products SET ?';
  const connection = await mysql.getConnection();

  console.log({ requestData, uuid, product_id })
  try {
    await connection.query(sqlQuery, {
      amount,
      cart_id,
      product_id
    });

    connection.release();
    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }

  /*   try {
      return res.status(201).send();
    } catch (e) {
      res.status(500).send(e.message);
    } */
}

module.exports = createcartProducts;
