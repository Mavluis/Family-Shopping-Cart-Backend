'use strict';

const Joi = require('joi');
const PostModel = require('../../../models/post-model');
const CartModel = require('../../../models/cart-model');

async function validate(payload) {
  const schema = {
    content: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(payload, schema);
}

async function createPost(req, res, next) {
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
    const postCreated = await PostModel.create(data);
    // 
    const filter = {
      uuid,
    };

    const operation = {
      $addToSet: {
        posts: postCreated._id,
      },
    };

    await CartModel.findOneAndUpdate(filter, operation);

    return res.status(201).send(postCreated);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = createPost;
