
'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./webserver/routes');
const mysqlPool = require('./databases/mysql-pool');

const app = express();
app.use(bodyParser.json());

app.use('/api', routers.accountRouter);
app.use('/api', routers.postRouter);
app.use('/api', routers.userRouter);

process.on('uncaughtException', (err) => {
  console.error('excepción inesperada', err.message, err);
});

process.on('unhandledRejection', (err) => {
  console.error('Error inesperado', err.message, err);
});

async function init() {
  try {
    await mysqlPool.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = 3000/* process.env.PORT */;
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
}

init();
