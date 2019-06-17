'use strict';

const mysql = require('mysql2');

const { Schema } = mysql;

const userSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  fullName: String,
  id: Boolean,
});

userSchema.index(
  {
    fullName: 'text',
  },
);

const User = mysql.model('User', userSchema);

module.exports = User;
