'use strict';

const mysql = require('mysql2');

const { Schema } = mysql;

const userSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  fullName: String,
  idproducts: {
    isPublicProfile: Boolean,
    linkedIn: String,
    twitter: String,
    github: String,
    description: String,
  },
});

userSchema.index(
  {
    fullName: 'text',
  },
);

const User = mysql.model('User', userSchema);

module.exports = User;
