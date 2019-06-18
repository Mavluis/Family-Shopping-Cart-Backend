'use strict';

const Joi = require('joi');
const Cart = require('../../../databases/mysql-pool');

async function validate(payload) {
  const schema = {
    content: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(payload, schema);
}

async function createCart(req, res, next) {
  const postData = { ...req.body };
  const { claims } = req;
  const { uuid } = claims;

  try {
    await validate(postData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const data = {
    owner: uuid,
    id: uuid,
    deletedAt: null,
  };

  try {
    const cartCreated = await Cart.create(data);
    // 
    const filter = {
      uuid,
    };

    const operation = {
      $addToSet: {
        posts: cartCreated._id,
      },
    };

    await Cart.findOneAndUpdate(filter, operation);

    return res.status(201).send(cartCreated);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = createCart;
