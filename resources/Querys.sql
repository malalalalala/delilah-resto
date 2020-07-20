INSERT INTO `delilahdb`.`users` (`user`, `full_name`, `email`, `phone`, `delivery_address`, `password`) VALUES ('Victoria', 'Victoria Ramos', 'vicky@gmail.com', '1234578', 'cra 56', 'malala');
INSERT INTO `delilahdb`.`users` (`user`, `full_name`, `email`, `phone`, `delivery_address`, `password`) VALUES ('Socorro', 'Socorro Agudelo', 'socorro@gmail.com', '1234558', 'cra 52', 'malala');
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




USE delilahDB;
SELECT *
FROM users;


SELECT *
FROM orders o
JOIN payment_methods p
ON o.payment_id=p.payment_id;

USE DelilahBD;
INSERT INTO products (name, urlImage, price) VALUES ('pizza', 'www.google.com',1000);
INSERT INTO products (name, urlImage, price) VALUES ('hotdog', 'www.google.com',20000);
INSERT INTO products (name, urlImage, price) VALUES ('pasta', 'www.google.com',500);

USE delilahDB;


select r.name role from roles r
where id in (
SELECT  ur.role_id
FROM users u INNER JOIN user_roles ur
where u.id=ur.user_id and  u.user = 'Sergio');



select r.name role, user.user_id , user.password pass from roles r , (SELECT  ur.role_id, u.id user_id, u.password password
FROM users u INNER JOIN user_roles ur
where u.id=ur.user_id and  u.email = 'jaja@gmail.com' ) user 
where id = user.role_id;

select r.name role, user.user_id , user.password pass from roles r , (SELECT  ur.role_id, u.id user_id, u.password password   
                FROM users u INNER JOIN user_roles ur
                on u.id=ur.user_id and ( u.email = 'undefined' OR u.user = 'Tata') ) user
                where id = user.role_id;

SELECT  (select r.name role from roles r where r. Id = ur.role_id) , u.id user_id, u.password pass
               FROM users u INNER JOIN user_roles ur
               on u.id=ur.user_id and  (u.email = 'undefined' OR u.user = 'Tata');
               
              SELECT  u.id user_id, u.password pass
               FROM users u INNER JOIN user_roles ur
               on u.id=ur.user_id and u.user = 'Tata';
		
	SELECT * FROM
    orders AS o
    JOIN payment_methods AS pm
    ON o.payment_id=pm.id;

USE delilahbd;
INSERT INTO orders (total_amount,payment_id,date_order,status_id,user_id)
VALUES (1200,1,NOW(),1,1);

USE delilahbd;
INSERT INTO orders (total_amount,payment_id,date_order,status_id,user_id)
VALUES (2500,2,NOW(),2,31);

USE delilahbd;
INSERT INTO orders (total_amount,payment_id,date_order,status_id,user_id)
VALUES (2500,2,NOW(),2,67);
INSERT INTO orders (total_amount,payment_id,date_order,status_id,user_id)
VALUES (30000,2,NOW(),2,67);

USE delilahbd;
SELECT o.id, total_amount,payment_id,date_order,status_id,user_id,os.name AS status_name,user,full_name,email,phone,delivery_address,password,pm.name AS payment_name
FROM orders AS o
JOIN order_status AS os
	ON o.status_id=os.id
JOIN users AS u
	ON o.user_id=u.id
JOIN payment_methods AS pm
	ON o.payment_id=pm.id;
    
USE delilahbd;
SELECT *
FROM product_order 
WHERE order_id=2;

USE delilahbd;
SELECT o.id, total_amount,payment_id,date_order,status_id,user_id,os.name AS status_name,
user,full_name,email,phone,delivery_address,password,pm.name AS payment_name
FROM orders AS o
JOIN order_status AS os
	ON o.status_id=os.id
JOIN users AS u
	ON o.user_id=u.id
JOIN payment_methods AS pm;

SELECT price FROM products WHERE id =1;

INSERT INTO `delilahdb`.`roles` (`id`, `name`) VALUES ('1', 'admin');
INSERT INTO `delilahdb`.`roles` (`id`, `name`) VALUES ('2', 'user');
INSERT INTO `delilahdb`.`payment_methods` (`id`, `name`) VALUES ('1', 'Cash');
INSERT INTO `delilahdb`.`payment_methods` (`id`, `name`) VALUES ('2', 'CRedit Card');

