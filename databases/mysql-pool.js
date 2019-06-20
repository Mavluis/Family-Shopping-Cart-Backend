'use strict';

const mysql = require('mysql2');

async function connect() {
  const options = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    timezone: 'Z',
    typeCast(field, next) {
      // https://github.com/sidorares/node-mysql2/issues/262
      if (field.type === 'DATETIME') {
        const utcTime = Math.floor((new Date(`${field.string()} UTC`)).getTime() / 1000);
        const fixedDate = new Date(0);
        fixedDate.setUTCSeconds(utcTime);

        return fixedDate;
      }
      return next();
    },
    // debug: true,
    multipleStatements: true,
  };

  /**
   * Create connection pool and
   * promisify it to use async / await
   */

  const pool = mysql.createPool(options);
  this.pool = pool.promise();

  try {
    const connection = await this.pool.getConnection();
    if (connection) {
      connection.release();
    }
  } catch (e) {
    console.error('mysql pool connect', e);
    throw e;
  }
}

async function getConnection() {
  if (this.pool === null) {
    throw new Error("MySQL connection didn't established. You must connect first.");
  }

  const connection = await this.pool.getConnection();

  return connection;
}

module.exports = {
  connect,
  getConnection,
};
