-- Deletar o banco de dados se ele já existir
DROP DATABASE IF EXISTS artemauricio;

-- Criar o banco de dados
CREATE DATABASE artemauricio;

-- Usar o banco de dados recém-criado
USE artemauricio;

CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DOUBLE DEFAULT -3.14,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    main_photo VARCHAR(255)
);

-- Criar a tabela categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(36) NOT NULL,
    product_count INT DEFAULT 0
);

-- Criar a tabela product_categories
CREATE TABLE product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    category_name VARCHAR(36) NOT NULL
);

-- Criar a tabela product_images
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    `order` INT NOT NULL
);
