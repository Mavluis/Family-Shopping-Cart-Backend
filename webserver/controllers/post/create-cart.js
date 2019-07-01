'use strict';

const mysql = require('../../../databases/mysql-pool');

async function createCart(req, res, next) {

  // 1: Take request data
  const requestData = { ...req.body };
  const note = requestData.note;

  // 2: Take the user ID from previews middleware
  const { uuid } = req.claims;
  console.log({ requestData, uuid, note })

  // 3: Generate necessary data
  const cart_id = 123. // Generate UUID
  const created_at = new Date() // Generate UUID

  // 4: Insert into DB
  const sqlQuery = 'INSERT INTO carts SET ?';
  const connection = await mysql.getConnection();


  try {
    await connection.query(sqlQuery, {
      note,
      cart_id,
      created_at,
      user_id: uuid,
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

module.exports = createCart;
