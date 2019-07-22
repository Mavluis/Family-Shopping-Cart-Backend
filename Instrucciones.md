# Case that has nothing created in product.
Before starting the program change in .env line RUN_FIXTURE="true", start nodemon, change line to "false".

# Creation line Select on the BB.DD.

CREATE VIEW CartProductName AS Select cart_id, name from cart_products INNER JOIN products ON cart_products.product_id = products.product_id
select * from CartProductName 
DROP VIEW CartProductName 

Select cart_id, name from cart_products INNER JOIN products ON cart_products.product_id = products.product_id

Select note from carts where cart_id = "1236cb42-b935-41eb-bf3b-816e0915396b"

# Products loader
Beer, 
Biscuits, 
Cereals, 
Chips, 
Fruit, 
Milk, 
Potatoes, 
TomatoBrick, 
Water, 
Yogourt, 
Butter, 
ColdCuts, 
Eggs, 
Eggplant, 
Macaroni, 
Mushrooms, 
Olives, 
Sausages, 
Spaghetti, 
Squash, 
Apples, 
Celery, 
CleaningSupplies, 
Melon, 
Onions, 
ParchmentPaper, 
Pears, 
Pizza, 
Strawberries, 
Zucchini, 
Bananas, 
BottledWater, 
Cherry, 
Coffee, 
Deodorant, 
GlassCleaner, 
OrangeJuice, 
RedWine, 
ToiletPaper, 
Watermelon

#Product Postman
"Beer", 
"Biscuits", 
"Cereals", 
"Chips", 
"Fruit", 
"Milk", 
"Potatoes", 
"TomatoBrick", 
"Water", 
"Yogourt", 
"Butter", 
"ColdCuts", 
"Eggs", 
"Eggplant", 
"Macaroni", 
"Mushrooms", 
"Olives", 
"Sausages", 
"Spaghetti", 
"Squash", 
"Apples", 
"Celery", 
"CleaningSupplies", 
"Melon", 
"Onions", 
"ParchmentPaper", 
"Pears", 
"Pizza", 
"Strawberries", 
"Zucchini", 
"Bananas", 
"BottledWater", 
"Cherry", 
"Coffee", 
"Deodorant", 
"GlassCleaner", 
"OrangeJuice", 
"RedWine", 
"ToiletPaper", 
"Watermelon"

/**
 *  CORS configuration
 */

app.use((req, res, next) => {
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
});

YA NO USO ESTE CORS configuration, USO EL SIGUIENTE Q HACE LO MISMO EN EL index.html DEL BACKEND:
const cors = require('cors');
app.use(cors());

PARA CAMBIAR EL PUERTO 300 A PRODUCCION: 
const port = 3000 /* process.env.PORT */;
A
const port = process.env.PORT;

create-account-controller.js CAMBIAR LA URL DE EMAIL DE VERIFICACION DE LOCAL A PRODUCCION:
const linkActivacion = `http://localhost:3000/api/account/activate?verification_code=${verificationCode}`;
const linkActivacion = `https://family-shopping-cart.herokuapp.com/api/account/activate?verification_code=${verificationCode}`;




