'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const sendgridMail = require('@sendgrid/mail');
const mysql = require('../../databases/mysql-pool');
const Cart = require('../controllers/post/create-cart');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function validate(payload) {
  const validation = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    fullName: Joi.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9 ]*$/).required()
  };
  return Joi.validate(payload, validation);
}

const now = new Date();
const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

async function createCart(uuid) {
  const data = {
    user_id: uuid,
    note: string,
    cart_id: string,
    created_at: createdAt
  };

  const cart = await Cart.create(data);

  return cart;
}

async function createProfile(uuid) {
  const userProfileData = {
    uuid,
    fullName: null,
    preferences: {
      password: null,
      newpassword: null,
      repeatnewpass: null,
      regularlist: null,
    },
  };

  const profileCreated = await Cart.create(userProfileData);

  return profileCreated;
}

async function addVerificationCode(uuid) {
  const verificationCode = uuidV4();
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const sqlQuery = 'INSERT INTO users_activation SET ?';
  const connection = await mysql.getConnection();

  await connection.query(sqlQuery, {
    user_uuid: uuid,
    verification_code: verificationCode,
    created_at: createdAt,
  });

  connection.release();

  return verificationCode;
}

async function sendEmailRegistration(userEmail, verificationCode) {
  const linkActivacion = `http://localhost:3000/api/account/activate?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'familyshoppingcart@yopmail.com',
      name: 'Family Shopping Cart',
    },
    subject: 'Welcome to Family Shopping Cart',
    html: `Don't ever forget any product in the supermarket. <br> <br>
    To confirm the account <a href="${linkActivacion}">CLICK HERE TO ACTIVATE</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}

async function createAccount(req, res, next) {
  const accountData = req.body;
  try {
    await validate(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const now = new Date();
  const securePassword = await bcrypt.hash(accountData.password, 10);
  const uuid = uuidV4();
  const fullName = accountData.fullName;
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

  const connection = await mysql.getConnection();

  const sqlInsercion = 'INSERT INTO users SET ?';

  try {
    const resultado = await connection.query(sqlInsercion, {
      uuid,
      fullName,
      email: accountData.email,
      password: securePassword,
      created_at: createdAt,
    });
    connection.release();

    const verificationCode = await addVerificationCode(uuid);

    await sendEmailRegistration(accountData.email, verificationCode);
    await createCart(uuid);
    await createProfile(uuid);

    return res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = createAccount;
