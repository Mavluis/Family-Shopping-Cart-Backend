'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routers = require('./webserver/routes');
const mysqlPool = require('./databases/mysql-pool');
const app = express();

const { createProducts } = require('./webserver/fixture/loader');

app.use(cors());

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

  const port = process.env.PORT;
  // const port = 3000;
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
}

init();
