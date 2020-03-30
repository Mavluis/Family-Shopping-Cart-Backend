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
    await createProducts([
      'Agua', 
      'Arroz', 
      'Atun', 
      'Bastoncillos', 
      'Cafe', 
      'Cervezas', 
      'Champu', 
      'Chocolate', 
      'Detergente', 
      'Espaguetis', 

      'Fiambre', 
      'Galletas', 
      'Garbanzos', 
      'Gel', 
      'Huevos', 
      'Kiwis', 
      'Leche', 
      'Lentejas', 
      'Macarrones', 
      'Mantequilla', 

      'Manzanas', 
      'Mermelada', 
      'Naranjas', 
      'Nueces', 
      'Pan molde', 
      'Pan tostado', 
      'Papel(cocina)', 
      'Papel(WC)', 
      'Patatas', 
      'Patatas(bolsa)', 

      'Peras', 
      'Pizzas', 
      'Platanos', 
      'Suavizante', 
      'Tomate(brick)', 
      'Tomates', 
      'Vino', 
      'Yogures', 
      'Zumos', 
      'Zumos(brick)'
    ]);
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

