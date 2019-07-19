'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./webserver/routes');
const mysqlPool = require('./databases/mysql-pool');
const app = express();
const { createProducts } = require('./webserver/fixture/loader');

/**
 *  CORS configuration
 */

/* app.use((req, res, next) => {
  const accessControlAllowMethods = [
    'GET',
    'POST',
    'DELETE',
    'HEAD',
    'PATCH',
    'PUT',
    'OPTIONS',
  ];

  const accessControlAllowHeaders = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Accept-Version',
    'Authorization',
    'Location',
  ];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', accessControlAllowMethods.join(','));
  res.header('Access-Control-Allow-Headers', accessControlAllowHeaders.join(','));
  res.header('Access-Control-Expose-Headers', accessControlAllowHeaders.join(','));
  next();
}); */

app.use(bodyParser.json());

app.use('/api', routers.accountRouter);
app.use('/api', routers.cartRouter);

process.on('uncaughtException', (err) => {
  console.error('excepción inesperada', err.message, err);
});

process.on('unhandledRejection', (err) => {
  console.error('Error inesperado', err.message, err);
});

async function init() {
  try {
    await mysqlPool.connect();

    /* Creates all products in the Products table the first 
    time the server is started and assigns a product_id to each product. */

    if (process.env.RUN_FIXTURE === "true") {
    await createProducts(['Beer', 
      'Biscuits', 
      'Cereals', 
      'Chips', 
      'Fruit', 
      'Milk', 
      'Potatoes', 
      'TomatoBrick', 
      'Water', 
      'Yogourt', 
      'Butter', 
      'ColdCuts', 
      'Eggs', 
      'Eggplant', 
      'Macaroni', 
      'Mushrooms', 
      'Olives', 
      'Sausages', 
      'Spaghetti', 
      'Squash', 
      'Apples', 
      'Celery', 
      'CleaningSupplies', 
      'Melon', 
      'Onions', 
      'ParchmentPaper', 
      'Pears', 
      'Pizza', 
      'Strawberries', 
      'Zucchini', 
      'Bananas', 
      'BottledWater', 
      'Cherry', 
      'Coffee', 
      'Deodorant', 
      'GlassCleaner', 
      'OrangeJuice', 
      'RedWine', 
      'ToiletPaper', 
      'Watermelon']);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = /* 3000 */ process.env.PORT;
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
}

init();
