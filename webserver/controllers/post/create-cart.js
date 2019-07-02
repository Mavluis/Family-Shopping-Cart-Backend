'use strict';

const mysql = require('../../../databases/mysql-pool');
const uuidV4 = require('uuid/v4');

const cart_id = uuidV4();

/* Create a Cart by login */

async function createCart(req, res, next) {

  const requestData = { ...req.body };
  const note = requestData.note;
  const { uuid } = req.claims;
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

const product_id = uuidV4();

/* Create a product Cart by login */

async function createcartProducts(req, res, next) {

  const requestData = { ...req.body };
  const amount = requestData.amount;
  const created_at = new Date();
  
  const sqlQuery = 'INSERT INTO cart_products SET ?';
  const connection = await mysql.getConnection();
  
  try {
    await connection.query(sqlQuery, {
      cart_id,
      product_id,
      amount,
      created_at
    });
    
    connection.release();
    next();
    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }
}

/* Create a list of products and their names from a login */

async function createProducts(req, res, next) {
  
  const requestData = { ...req.body };
  const name = requestData.name;
  const created_at = new Date();
  const sqlQuery = 'INSERT INTO products SET ?';
  const connection = await mysql.getConnection();
  
  try {
    await connection.query(sqlQuery, {
      product_id,
      name,
      created_at
    });
    
    connection.release();
    return res.status(201).send();
  } catch (e) {
    return res.status(400).send(e);
  }
  
  try {
    return res.status(201).send();
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = { createCart, createcartProducts, createProducts };
