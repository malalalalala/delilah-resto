# DELILAH RESTÓ- REST API

Application to manage a restaurant orders and products

This project was developed as part of the Web Full Stack Development Acámica course and with it you will manage theusers, orders and products list from a restaurant.

This README.md will guide you to install and use this application.

## Documentation

Plese refer to this swagger link https://app.swaggerhub.com/apis/lauramosdim/delilah-resto/1.0.0#/

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

Open a new query in mysql and execute the queries in the BDcreation.sql file located in the resources folder. The tables will be empty and you need to insert data in all of them before testing the API.

## Run the API
Initialize the Server. 

With Nodejs - node app.js

With Nodemon - nodemon app.js

This will start the application in the PORT in which your machine is configured or if not it will start for default on PORT 3000

http://localhost:3000/

## Testing the API

Use POSTMAN to try out all the API endpoints.

## Middelwares

validateTokenRole: This verifies the user role and provides access to certain endpoint accordingly

checkIfUser: This middelware is use to check if the user is registered so it gives access only to his orders list 

See more in - Middelwares

## ENDPOINTS

### USERS

#### POST - Register a user

 http://localhost:3000/users/register

Body request example: {
  "user": "Laura",
  "full_name": "Laura Ramos",
  "email": "lla@gmail.com",
  "phone": 234,
  "delivery_address": "Cl 42 #78-23",
  "password": "lalalalalaal0"
}

#### POST - User login

 http://localhost:3000/users/login

Body request example: {
  "user": "Laura",
  "password": "lalalala"
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

Body request example: {
  "payment_id": 2,
  "status_id": 5,
  "user_id": 1,
  "delivery_address": "cra 82 45 54",
  "products": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}

#### PUT - Edit a order status

 http://localhost:3000/orders/:order_id/status

Body request example: {
  "status_id": 5
}

DELETE - Remove an order

 http://localhost:3000/orders/:order_id



