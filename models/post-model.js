'use strict';

const mysqlPool = require('./databases/mysql-pool');

const { Schema } = mysqlPool;

const postSchema = new Schema({
  id: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
});

const Post = mysqlPool.model('Post', postSchema);

module.exports = Post;
