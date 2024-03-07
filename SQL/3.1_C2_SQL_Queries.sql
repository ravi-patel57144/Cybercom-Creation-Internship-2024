CREATE DATABASE cybercom_sql3_1c2;

USE cybercom_sql3_1c2;

-- Table for inventory
CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

-- Insert data into the inventory table
INSERT INTO inventory (id, name, quantity, price, category) VALUES
    (1, 'Laptop', 5, 999.99, 'electronics'),
    (2, 'Smartphone', 10, 499.99, 'electronics'),
    (3, 'Tablet', 3, 299.99, 'electronics'),
    (4, 'TV', 2, 799.99, 'electronics'),
    (5, 'Earphones', 0, 99.99, 'electronics'),
    (6, 'Casual Shirt', 15, 349, 'clothes'),
    (7, 'Headphones', 8, 99.99, 'electronics'),
    (8, 'Keyboard', 15, 49.99, 'accessories'),
    (9, 'Mouse', 20, 29.99, 'accessories');

-- Select the name and price of items where quantity > 0 and category is 'electronics', sorted by price in descending order
SELECT name, price 
FROM inventory 
WHERE quantity > 0 AND category = 'electronics' 
ORDER BY price DESC;
