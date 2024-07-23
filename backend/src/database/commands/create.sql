DROP DATABASE IF EXISTS artemauricio;

CREATE DATABASE artemauricio;

USE artemauricio;


CREATE TABLE products (
    id CHAR(36) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DOUBLE DEFAULT -3.14,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    product_count INT DEFAULT 0
);

CREATE TABLE product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id CHAR(36) NOT NULL,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id CHAR(36) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    `order` INT NOT NULL
);


