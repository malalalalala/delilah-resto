CREATE DATABASE IF NOT EXISTS delilahDB;
USE delilahDB;
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    password VARCHAR(150) NOT NULL,
    UNIQUE (user),
    UNIQUE (email)
);


USE delilahDB;
DROP TABLE IF EXISTS roles;
CREATE TABLE roles
(
	id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


USE delilahDB;
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    url_image VARCHAR(150) NOT NULL,
    price INT(50) NOT NULL
);


USE delilahDB;
DROP TABLE IF EXISTS payment_methods;
CREATE TABLE payment_methods
(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);


USE delilahDB;
DROP TABLE IF EXISTS order_status;
CREATE TABLE order_status
(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);


USE delilahDB;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders
(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    total_amount INT NOT NULL,
    payment_id INT NOT NULL,
    date_order DATETIME,
    FOREIGN KEY fk_orders_payment_methods(payment_id)
		REFERENCES payment_methods(id)
        ON UPDATE NO ACTION,
	status_id INT NOT NULL,
    FOREIGN KEY fk_orders_order_status(status_id)
		REFERENCES order_status(id)
        ON UPDATE NO ACTION,
	user_id INT REFERENCES users(id)
   );

 ALTER TABLE orders MODIFY date_order DATETIME DEFAULT   CURRENT_TIMESTAMP;


USE delilahDB;
DROP TABLE IF EXISTS product_order;
CREATE TABLE product_order(
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity TINYINT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    UNIQUE (order_id, product_id)
);


USE delilahDB;
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    UNIQUE (user_id, role_id)   
);






