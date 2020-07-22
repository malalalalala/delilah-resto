# DELILAH RESTÓ- REST API

Application to manage a restaurant orders and products

This project was developed as part of the Web Full Stack Development Acámica course and with it you will manage theusers, orders and products list from a restaurant.

This README.md will guide you to install and use this application.

## Documentation

Plese refer to this swagger link https://app.swaggerhub.com/apis/lauramosdim/delilah-resto/1.0.0#/

You can access to the swagger collection through this link https://app.getpostman.com/run-collection/b3c2599d449856e80c70

## Project Resources

- Node.js
- Express
- MySQL
- Sequelize
- JSON Web Tokens (JWT)
- bcryptjs (for hash password)
- Body-Parser
- atob


## Getting Started
Clone the repo
$ git clone https://github.com/lauramosdim/delilah-resto.git

or just download the ZIP directly from Github

## Install the dependencies
Use npm or yarn to install the dependencies.

$ npm install
$ yarn install

## Set up the data base

Open a new query in mysql and execute the queries in the **BDcreation.sql** file located in the resources folder (https://github.com/lauramosdim/delilah-resto/blob/master/resources/BDcreation.sql). The tables will be empty and you need to insert data in all of them before testing the API.

## Insert the data in the database tables.

Please run the following queries in MySQL, you can find them also in the **Querys** file located in the resources folder.

INSERT INTO `delilahdb`.`users` (`user`, `full_name`, `email`, `phone`, `delivery_address`, `password`) VALUES ('Victoria', 'Victoria Ramos', 'vicky@gmail.com', '1234578', 'cra 56', '$2b$10$ywyWY47DcKEDeRoflZ5WWeEYnkZq5YbKRaOt0ABoaodL1CCsI5JDu');  
INSERT INTO `delilahdb`.`users` (`user`, `full_name`, `email`, `phone`, `delivery_address`, `password`) VALUES ('Socorro', 'Socorro Agudelo', 'socorro@gmail.com', '1234558', 'cra 52', '$2b$10$ywyWY47DcKEDeRoflZ5WWeEYnkZq5YbKRaOt0ABoaodL1CCsI5JDu');  
INSERT INTO `delilahdb`.`products` (`name`, `url_image`, `price`) VALUES ('Lasagna', 'www.lasagna.com', '4000');    
INSERT INTO `delilahdb`.`products` (`name`, `url_image`, `price`) VALUES ('Pizza', 'www.pizza.com', '2000');  
INSERT INTO `delilahdb`.`products` (`name`, `url_image`, `price`) VALUES ('Rissotto', 'www.rissotto.con', '4500');  
INSERT INTO `delilahdb`.`products` (`name`, `url_image`, `price`) VALUES ('Lemonade', 'www.lemonade.com', '400');  
INSERT INTO `delilahdb`.`payment_methods` (`name`) VALUES ('Cash');  
INSERT INTO `delilahdb`.`payment_methods` (`name`) VALUES ('Credit Card');  
INSERT INTO `delilahdb`.`roles` (`name`) VALUES ('admin');  
INSERT INTO `delilahdb`.`roles` (`name`) VALUES ('user');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('New');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('Confirmed');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('In preparation');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('Sent');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('Cancelled');  
INSERT INTO `delilahdb`.`order_status` (`name`) VALUES ('Delivered');  
INSERT INTO `delilahdb`.`user_roles` (`user_id`, `role_id`) VALUES ('1', '1');  
INSERT INTO `delilahdb`.`user_roles` (`user_id`, `role_id`) VALUES ('2', '2');  

To post an order you can do it trough the POST path on the orders table which you will find in the following instructions. Please use the mentioned example to try the server. This will update the "product_order" table as well.

## Run the API
Initialize the Server. 

With Nodejs - node app.js

With Nodemon - nodemon app.js

This will start the application in the PORT in which your machine is configured or if not it will start for default on PORT 3000

http://localhost:3000/

## Testing the API

Use POSTMAN to try out all the API endpoints.

## Middlewares

validateTokenRole: This verifies the user role and provides access to certain endpoint accordingly

checkIfUser: This middelware is use to check if the user is registered so it gives access only to his orders list 

See more in - Middelwares

## ENDPOINTS

### USERS


#### POST - User login

With the existing users will be:

 http://localhost:3000/users/login

##### Body for user with admin role: 


{
  "user": "Victoria",
  "password": "malala"
}

##### Body for user with user role (customer): 


{
  "user": "Socorro",
  "password": "malala"
}



#### POST - Register an user

In order to register an admin user you should provide the role otherwise the user will be regirstered with the user role as the following example:

 http://localhost:3000/users/register
 
##### Body for user with user role (customer): 

 {
  "user": "Victoria",
  "full_name": "Victoria Ramos",
  "email": "lla@gmail.com",
  "phone": 234,
  "delivery_address": "Cl 42 #78-23",
  "password": "lalalalalaal0"
}

##### Body for user with admin role: 

 http://localhost:3000/users/register

Body request example: {
  "user": "Laura",
  "full_name": "Laura Ramos",
  "email": "lau@gmail.com",
  "phone": 234,
  "delivery_address": "Cl 42 #78-23",
  "password": "lalalalalaal0",
   "role": "admin"
}


#### GET - Get all users

 http://localhost:3000/users

### PRODUCTS

#### GET - Obtain the products list

http://localhost:3000/products

#### POST - Create a product

http://localhost:3000/api/products/

Body request example: {
  "id": 55,
  "name": "lasagna",
  "price": 1200,
  "url_image": "string"
}

#### PUT - Update a product

http://localhost:3000/products/:product_id

Body request example: Edit the key you can to edit

DELETE - Remove a product

http://localhost:3000/products/delete/:product_id

### ORDERS

#### GET - Obtain all orders

 http://localhost:3000/orders

#### GET - Obtain the orders per one user

  http://localhost:3000/orders/user/:user_id

#### POST - Generate a order

 http://localhost:3000/orders

Body request example: 
{  
   "products":[  
      {  
         "product_id":1,  
         "quantity":6  
      },  
      {  
         "product_id":2,  
         "quantity":5  
      }  
   ],  
   "payment_id":2,  
   "status_id":2,  
   "user_id":1,  
   "delivery_address":"cra 53 28"  
}  

#### PUT - Edit a order status

 http://localhost:3000/orders/:order_id/status

Body request example: {
  "status_id": 5
}

DELETE - Remove an order

 http://localhost:3000/orders/:order_id



