'use strict';

const Joi = require('joi');
const Cart = require('../carts');

async function validate(payload) {
  const joi = {
    content: Joi.string().min(5).max(1024).required(),
  };
  
  return Joi.validate(payload, joi);
}

async function createCart(req, res, next) {
  const accountData = req.body;
  console.log(accountData)
  const sqlQuery = 'INSERT INTO carts SET ?';
  const connection = await mysql.getConnection();
  await connection.query(sqlQuery, {
    user_id: uuid,
    note: string,
    cart_id: string,
    created_at: createdAt,
  });
  
  connection.release();
  
  try {
    await validate(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }
  
  const data = {
    user_id: uuid,
    note: string,
    cart_id: string,
    created_at: createdAt,
  };
  
  try {
    const cartCreated = await Cart.create(data);
    console.log(cartCreated)
    return res.status(201).send(cartCreated);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = createCart;
