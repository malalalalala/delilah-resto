USE delilahDB;
SELECT *
FROM users;

  
UPDATE users
SET firstName='Tatiana', email='tati@gmail.com' 
WHERE id=1;

DELETE FROM users
WHERE id=2;

SELECT *
FROM orders o
JOIN payment_methods p
ON o.payment_id=p.payment_id;

USE DelilahBD;
INSERT INTO products (name, urlImage, price) VALUES ('pizza', 'www.google.com',1000);
INSERT INTO products (name, urlImage, price) VALUES ('hotdog', 'www.google.com',20000);
INSERT INTO products (name, urlImage, price) VALUES ('pasta', 'www.google.com',500);

