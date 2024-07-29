DROP DATABASE IF EXISTS artemauricio;

CREATE DATABASE artemauricio;

USE artemauricio;


CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
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
    product_id VARCHAR(36) NOT NULL,
    category_name VARCHAR(36) NOT NULL
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    `order` INT NOT NULL
);


------------------insert

INSERT INTO products (id, title, price, description, created_at, updated_at)
VALUES
    ('1', 'Apoiador de Celular', 9.99, 'Um suporte conveniente para seu celular', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2', 'Mostruário', 19.99, 'Um mostruário para exibir itens', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('3', 'Incensário', 14.99, 'Um queimador decorativo para varetas de incenso', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
