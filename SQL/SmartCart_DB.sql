CREATE DATABASE IF NOT EXISTS smartcart_db;
USE smartcart_db;

CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(50) NOT NULL,
    admin_email VARCHAR(50) UNIQUE NOT NULL,
    admin_password VARCHAR(50) NOT NULL,
    role_type ENUM('superadmin', 'manager', 'staff') NOT NULL DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50) NOT NULL,
    customer_email VARCHAR(50) UNIQUE NOT NULL,
    customer_password VARCHAR(50) NOT NULL,
    customer_address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role_type ENUM('regular', 'premium') NOT NULL DEFAULT 'regular',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE customers DROP COLUMN customer_address;
-- who has updated add the field everywhere (where required)
-- in wishlist replace sku with product also add for no of wishlist corresponsing to user
-- minor modification with cart (need to restructure it)

CREATE TABLE IF NOT EXISTS category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    nutritional_info TEXT,
    expiration_date DATE,
    manufacturer VARCHAR(100),
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    discount INT DEFAULT 0,
    tax FLOAT DEFAULT 0,
    is_saved BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS address (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    address_name VARCHAR(50) NOT NULL,
    locality VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(50) NOT NULL,
    pincode INT NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    customer_id INT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status BOOLEAN DEFAULT false,
    payment_method ENUM("COD", "Razorpay") NOT NULL,
    razorpay_payment_id VARCHAR(255) NULL,
    shipped_date DATE NULL,
    delivered_date DATE NULL,
    order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered') DEFAULT 'Pending',
    address_id INT NOT NULL,
    customer_id INT NOT NULL,
    payment_date TIMESTAMP NULL,
    payment_amount DECIMAL(10, 2) NULL,
    payment_currency VARCHAR(10) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE IF NOT EXISTS orderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    packaging_size VARCHAR(50) NOT NULL,
    packaging_price DECIMAL(10, 2) NOT NULL,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Inserting admins with specified role_type
INSERT INTO admin (admin_name, admin_email, admin_password, role_type)
VALUES 
	('John Doe', 'john.doe@example.com', 'password123', 'staff'),
	('Jane Smith', 'jane.smith@example.com', 'password456', 'superadmin');

-- Inserting data into 'customers' table
INSERT INTO customers (customer_name, customer_email, customer_password, customer_address, phone_number, role_type)
VALUES
    ('John Doe', 'john.doe@example.com', 'password123', '123 Main St', '123-456-7890', 'regular'),
    ('Jane Smith', 'jane.smith@example.com', 'password456', '456 Elm St', '456-789-0123', 'premium'),
    ('Alice Johnson', 'alice.johnson@example.com', 'password789', '789 Oak St', '789-012-3456', 'regular'),
    ('Bob White', 'bob.white@example.com', 'passwordabc', '987 Pine St', '987-654-3210', 'regular'),
    ('Emma Brown', 'emma.brown@example.com', 'passworddef', '654 Maple St', '654-321-0987', 'regular'),
    ('Michael Davis', 'michael.davis@example.com', 'passwordghi', '321 Cedar St', '321-098-7654', 'regular'),
    ('Sarah Lee', 'sarah.lee@example.com', 'passwordjkl', '135 Walnut St', '135-791-3579', 'regular'),
    ('David Wilson', 'david.wilson@example.com', 'passwordmno', '246 Birch St', '246-802-4680', 'regular'),
    ('Olivia Taylor', 'olivia.taylor@example.com', 'passwordpqr', '357 Cherry St', '357-913-5791', 'regular'),
    ('James Martinez', 'james.martinez@example.com', 'passwordstu', '468 Pineapple St', '468-024-6802', 'regular');


SELECT customer_name, role_type FROM customers GROUP BY customer_name, role_type;

student -> mlt teacher

teacher -> mlt student

Error Code: 1055. Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'smartcart_db.customers.customer_name' 
which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

-- Inserting data into 'category' table
INSERT INTO category (category_name)
VALUES
    ('Fruits'),
    ('Vegetables'),
    ('Dairy'),
    ('Beverages'),
    ('Meat'),
    ('Bakery'),
    ('Canned Goods'),
    ('Snacks'),
    ('Frozen Foods'),
    ('Condiments');

-- Inserting data into 'product' table
INSERT INTO product (product_name, product_description, product_image, category_id)
VALUES
    ('Apple', 'Fresh and juicy apples', 'apple.jpg', 1),
    ('Carrot', 'Organic carrots', 'carrot.jpg', 2),
    ('Milk', 'Fresh milk', 'milk.jpg', 3),
    ('Water', 'Bottled water', 'water.jpg', 4),
    ('Chicken Breast', 'Skinless chicken breast', 'chicken.jpg', 5),
    ('Bread', 'Whole grain bread', 'bread.jpg', 6),
    ('Tomato Sauce', 'Italian tomato sauce', 'sauce.jpg', 7),
    ('Potato Chips', 'Crunchy potato chips', 'chips.jpg', 8),
    ('Frozen Pizza', 'Frozen pizza', 'pizza.jpg', 9),
    ('Ketchup', 'Tomato ketchup', 'ketchup.jpg', 10);
    
    

-- Inserting data into 'address' table
INSERT INTO address (address_name, locality, phonenumber, pincode, state, city, customer_id, is_default)
VALUES
    ('Home', 'ABC Colony', '123-456-7890', 12345, 'State1', 'City1', 1, true),
    ('Work', 'XYZ Street', '456-789-0123', 67890, 'State2', 'City2', 2, true),
    ('Home', 'PQR Road', '789-012-3456', 23456, 'State3', 'City3', 3, true),
    ('Home', 'LMN Avenue', '987-654-3210', 78901, 'State4', 'City4', 4, true),
    ('Work', 'GHI Lane', '654-321-0987', 56789, 'State5', 'City5', 5, true),
    ('Home', 'DEF Boulevard', '321-098-7654', 34567, 'State6', 'City6', 6, true),
    ('Work', 'JKL Street', '135-791-3579', 89012, 'State7', 'City7', 7, true),
    ('Home', 'NOP Street', '246-802-4680', 90123, 'State8', 'City8', 8, true),
    ('Work', 'QRS Road', '357-913-5791', 45678, 'State9', 'City9', 9, true),
    ('Home', 'TUV Lane', '468-024-6802', 56789, 'State10', 'City10', 10, true);

-- Inserting data into 'orders' table
INSERT INTO orders (total_amount, payment_status, payment_method, address_id, customer_id)
VALUES
    (10.99, true, 'COD', 1, 1),
    (5.49, false, 'Razorpay', 2, 2),
    (15.99, true, 'COD', 3, 3),
    (8.49, false, 'Razorpay', 4, 4),
    (20.99, true, 'COD', 5, 5),
    (12.49, false, 'Razorpay', 6, 6),
    (25.99, true, 'COD', 7, 7),
    (16.49, false, 'Razorpay', 8, 8),
    (30.99, true, 'COD', 9, 9),
    (18.49, false, 'Razorpay', 10, 10);

-- Inserting data into 'orderItems' table
INSERT INTO orderItems (quantity, packaging_size, packaging_price, product_id, order_id)
VALUES
    (2, '1 kg', 2.99, 1, 1),
    (1, '500 g', 1.49, 2, 1),
    (3, '1 L', 3.49, 3, 2),
    (2, '500 mL', 0.99, 4, 2),
    (1, '250 g', 5.99, 5, 3),
    (2, '500 g', 2.49, 6, 3),
    (4, '500 g', 1.99, 7, 4),
    (3, '200 g', 3.99, 8, 4),
    (2, '300 g', 4.99, 9, 5),
    (3, '500 mL', 2.49, 10, 5);



-- Select all admins
SELECT * FROM admin;

-- Select all customers
SELECT * FROM customers;

-- Select customers by ID
SELECT * FROM customers WHERE customer_id = 1;

-- Select all categories
SELECT * FROM category;

-- Select category by ID
SELECT * FROM category WHERE category_id = 1;

-- Select all products
SELECT * FROM product;

-- Select product by ID
SELECT * FROM product WHERE product_id = 1;

-- Select products with category name
SELECT p.*, c.category_name 
FROM product p
INNER JOIN category c ON p.category_id = c.category_id;


-- Select all wishlist items
SELECT * FROM wishlist;

-- Select wishlist items for a specific customer
SELECT * FROM wishlist WHERE customer_id = 1;


-- Select all cart items
SELECT * FROM cart;

-- Select cart items for a specific customer
SELECT * FROM cart WHERE customer_id = 1;


-- Select all addresses
SELECT * FROM address;

-- Select addresses for a specific customer
SELECT * FROM address WHERE customer_id = 1;


-- Select all orders
SELECT * FROM orders;

-- Select orders for a specific customer
SELECT * FROM orders WHERE customer_id = 1;

-- Select orders with customer and address details
SELECT o.*, c.customer_name, a.locality 
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN address a ON o.address_id = a.address_id;


-- Select all order items
SELECT * FROM orderItems;

-- Select order items for a specific order
SELECT * FROM orderItems WHERE order_id = 1;

-- Select order items with product details
SELECT oi.*, p.product_name 
FROM orderItems oi
INNER JOIN product p ON oi.product_id = p.product_id;

--  stored procedure while adding product create skus for that
DELIMITER //
CREATE PROCEDURE AddNewProduct(
    IN p_product_name VARCHAR(255),
    IN p_product_description TEXT,
    IN p_product_image VARCHAR(255),
    IN p_category_id INT,
    IN p_packaging_size VARCHAR(50),
    IN p_packaging_price DECIMAL(10, 2),
    IN p_stock INT,
    IN p_discount INT,
    IN p_color VARCHAR(50),
    IN p_weight DECIMAL(10, 2),
    IN p_size VARCHAR(50)
)
BEGIN
    DECLARE new_product_id INT;
    INSERT INTO product (product_name, product_description, product_image, category_id)
    VALUES (p_product_name, p_product_description, p_product_image, p_category_id);
    
    SET new_product_id = LAST_INSERT_ID();

    INSERT INTO skus (packaging_size, packaging_price, stock, discount, color, weight, size, product_id)
    VALUES (p_packaging_size, p_packaging_price, p_stock, p_discount, p_color, p_weight, p_size, new_product_id);
END //
DELIMITER ;

-- delete a product and its associated SKUs 
DELIMITER //
CREATE PROCEDURE DeleteProductAndSKUs(
    IN p_product_id INT
)
BEGIN
    DELETE FROM skus WHERE product_id = p_product_id;
    DELETE FROM product WHERE product_id = p_product_id;
END;
//
DELIMITER;

-- Triggers

DELIMITER //
CREATE TRIGGER update_product_updated_at
BEFORE UPDATE ON product
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER update_sku_updated_at
BEFORE UPDATE ON skus
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER update_order_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_address_updated_at
BEFORE UPDATE ON address
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;