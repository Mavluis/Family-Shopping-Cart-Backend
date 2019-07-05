# TheShoppingCart

Family-Shopping-Cart

Aplicacion Web Family Shopping Cart

It is a web application, where the whole family can add products in the family shopping basket, the process is very simple.

# Caso que no tenga nada creado en product.
Antes de arrancar el programa cambiar en .env linea RUN_FIXTURE="true", arrancar nodemon, cambiar linea a "false".

# Creacion linea Select en la BB.DD.
CREATE VIEW CartProductName AS Select cart_id, name from cart_products INNER JOIN products ON cart_products.product_id = products.product_id
select * from CartProductName 
DROP VIEW CartProductName 

Select cart_id, name from cart_products INNER JOIN products ON cart_products.product_id = products.product_id