# TheShoppingCart

Family-Shopping-Cart

Aplicacion Web Family Shopping Cart

It is a web application, where the whole family can add products in the family shopping basket, the process is very simple.

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
