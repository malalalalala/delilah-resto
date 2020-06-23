CREATE DATABASE IF NOT EXISTS delilahDB;
USE delilahDB;
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    deliveryAdress VARCHAR(255) NOT NULL,
    password VARCHAR(150) NOT NULL
);
USE delilahDB;
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    urlImage VARCHAR(150) NOT NULL,
    price INT(50) NOT NULL
);
USE delilahDB;
DROP TABLE IF EXISTS payment_methods;
CREATE TABLE payment_methods
(
	payment_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

USE delilahDB;
DROP TABLE IF EXISTS order_statuses;
CREATE TABLE order_statuses
(
	status_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

USE delilahDB;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders
(
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    total_amount INT NOT NULL,
    payment_id INT NOT NULL,
    FOREIGN KEY fk_orders_payment_methods(payment_id)
		REFERENCES payment_methods(payment_id)
        ON UPDATE NO ACTION,
	status_id INT NOT NULL,
    FOREIGN KEY fk_orders_order_statuses(status_id)
		REFERENCES order_statuses(status_id)
        ON UPDATE NO ACTION,
	user_id INT REFERENCES users(user_id)
);

products






