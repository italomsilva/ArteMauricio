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

------------------insert

-- Inserir dados na tabela products
INSERT INTO products (id, title, price, description, created_at, updated_at, main_photo)
VALUES
    ('1', 'Apoiador de Celular', 9.99, 'Um suporte conveniente para seu celular', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://apoiador'),
    ('2', 'Mostruário', 19.99, 'Um mostruário para exibir itens', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://mostruario'),
    ('3', 'Incensário', 14.99, 'Um queimador decorativo para varetas de incenso', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://insensario');

-- Inserir dados na tabela categories
INSERT INTO categories ( name, product_count)
VALUES
    ('Acessórios', 0),
    ('Exibição', 0),
    ('Decoração', 0);

-- Inserir dados na tabela product_categories
INSERT INTO product_categories (product_id, category_name)
VALUES
    ('1', 'Acessórios'),
    ('2', 'Exibição'),
    ('3', 'Decoração');

-- Inserir dados na tabela product_images
INSERT INTO product_images (product_id, url, `order`)
VALUES
    ('1', 'https://example.com/cell_phone_holder.jpg', 1),
    ('2', 'https://example.com/display_stand.jpg', 1),
    ('3', 'https://example.com/incense_burner.jpg', 1);
