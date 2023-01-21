CREATE DATABASE transaction_app;
USE transaction_app;

CREATE TABLE USERS(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile CHAR(10) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);    

CREATE TABLE TRANSACTIONS(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    type ENUM('debit', 'credit') NOT NULL,
    currency SYMBOL NOT NULL
);

INSERT INTO USERS (name, email, mobile, password) VALUES ('John Doe','johndoe@gmail.com','1234567890','123456');

INSERT INTO TRANSACTIONS (name, image_url, amount, type, currency) VALUES ('Amazon','https://www.amazon.in',1000,'debit','₹');
INSERT INTO TRANSACTIONS (name, image_url, amount, type, currency) VALUES ('Flipkart','https://www.flipkart.com',2000,'debit','₹');
INSERT INTO TRANSACTIONS (name, image_url, amount, type, currency) VALUES ('Paytm','https://www.paytm.com',3000,'debit','₹');
INSERT INTO TRANSACTIONS (name, image_url, amount, type, currency) VALUES ('Google','https://www.google.com',4000,'debit','₹');
INSERT INTO TRANSACTIONS (name, image_url, amount, type, currency) VALUES ('Facebook','https://www.facebook.com',5000,'debit','₹');