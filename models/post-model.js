'use strict';

const mysqlPool = require('./databases/mysql-pool');

const { Schema } = mysqlPool;

const postSchema = new Schema({
  author: String,
  content: String,
  likes: [String],
  comments: [{
    message: String,
    createdAt: Date,
    author: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
});

const Post = mysqlPool.model('Post', postSchema);

module.exports = Post;
