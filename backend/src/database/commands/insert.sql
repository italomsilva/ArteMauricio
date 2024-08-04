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
