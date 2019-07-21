'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mysql = require('../../databases/mysql-pool');

/* Validate email and password so that it does not contain 
strange characters, that the email is more than 2 characters after 
the @ and the password that contains between 3 and 30 characters. */

async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(payload, schema);
}

async function login(req, res, next) {

  /* Validate input data with Joi */

  const accountData = { ...req.body };

  try {
    await validateData(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /* Check if the user exists in the bbdd */

  try {
    const connection = await mysql.getConnection();
    const sqlQuery = `SELECT
    uuid, email, password, activated_at
    FROM users
    WHERE email = '${accountData.email}'`;

    const [result] = await connection.query(sqlQuery);
    if (result.length === 1) {
      const userData = result[0];

      /* Verify if you have activated the account */

      const modifyDate = userData.activated_at;
      if (isNaN(modifyDate)) {
        return res.status(403).send();
      }

      /* Check if the user exists in the BB.DD */

      const laPasswordEstaOk = await bcrypt.compare(accountData.password, userData.password);
      if (laPasswordEstaOk === false) {
        return res.status(401).send();
      }

      const payloadJwt = {
        uuid: userData.uuid,
        role: 'admin',
      };

      const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      const response = {
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };

      return res.status(200).json(response);
    }

    return res.status(404).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = login;
