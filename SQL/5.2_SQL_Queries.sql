CREATE DATABASE practice5_2;
USE practice5_2;


CREATE TABLE customers_task1 (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE categories_task1 (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100)
);

CREATE TABLE products_task1 (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    category_id INT,
    product_price DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES categories_task1(category_id)
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task1(customer_id)
);

CREATE TABLE orders_details_task1 (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    Quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders_task1(order_id),
    FOREIGN KEY (product_id) REFERENCES products_task1(product_id)
);


SELECT * FROM customers_task1;
INSERT INTO customers_task1 (customer_name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Abcd Def', 'abcd@gmail.com');

SELECT * FROM categories_task1;
INSERT INTO categories_task1 (category_name) VALUES
('Electronics'),
('Clothing'),
('Home Appliances');

INSERT INTO products_task1 (product_name, category_id, product_price) VALUES
('Laptop', 1, 1200.00),
('Smartphone', 1, 800.00),
('T-shirt', 2, 20.00),
('Jeans', 2, 50.00),
('Microwave', 3, 150.00),
('Blender', 3, 80.00);

SELECT * FROM orders_task1;
INSERT INTO orders_task1 (customer_id, order_date) VALUES
(1, '2024-03-12'),
(1, '2024-03-11'),
(2, '2024-03-10'),
(3, '2024-02-10');

INSERT INTO orders_details_task1 (order_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 3),
(3, 5, 1),
(3, 6, 1),
(4, 1, 4);


-- TASK: 1
SELECT 
	c.customer_id,
    c.customer_name,
    ca.category_name,
    SUM(od.Quantity * p.product_price) AS total_amount
FROM customers_task1 c
JOIN orders_task1 o ON o.customer_id = c.customer_id
JOIN orders_details_task1 od ON od.order_id = o.order_id
JOIN products_task1 p ON p.product_id = od.product_id
JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name = "Electronics"
GROUP BY c.customer_id
ORDER BY total_amount DESC;


-- TAKS: 2
SELECT 
	c.customer_id,
    c.customer_name,
    ca.category_name,
    SUM(od.Quantity * p.product_price) AS total_revenue
FROM customers_task1 c
JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
INNER JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name = "Clothing"
GROUP BY c.customer_id
ORDER BY total_revenue DESC;

-- TASK: 3
SELECT 
    c.customer_id,
    c.customer_name
FROM customers_task1 c
JOIN orders_task1 o ON o.customer_id = c.customer_id
JOIN orders_details_task1 od ON od.order_id = o.order_id
JOIN products_task1 p ON p.product_id = od.product_id
JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name IN ('Electronics', 'Clothing')
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(DISTINCT ca.category_name) = 2;


-- TASK: 4

CREATE TABLE employees_table4 (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    employee_city VARCHAR(100)
);

CREATE TABLE customers_table4 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    shipping_address_city VARCHAR(100)
);

CREATE TABLE categories_table4 (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100)
);

CREATE TABLE products_table4 (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories_table4(category_id)
);

CREATE TABLE sales_table4 (
    sale_id INT PRIMARY KEY,
    employee_id INT,
    customer_id INT,
    product_id INT,
    sale_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees_table4(employee_id),
    FOREIGN KEY (customer_id) REFERENCES customers_table4(customer_id),
    FOREIGN KEY (product_id) REFERENCES products_table4(product_id)
);

INSERT INTO employees_table4 (employee_id, employee_name, employee_city) VALUES
(1, 'John Smith', 'New York'),
(2, 'Emily Johnson', 'Los Angeles'),
(3, 'Michael Williams', 'Chicago');

INSERT INTO customers_table4 (customer_id, customer_name, shipping_address_city) VALUES
(1, 'Alice Brown', 'San Francisco'),
(2, 'Bob Davis', 'Seattle'),
(3, 'Carol Wilson', 'Boston');

INSERT INTO categories_table4 (category_name) VALUES
('Electronics'),
('Clothing');

INSERT INTO products_table4 (product_id, product_name, product_price, category_id) VALUES
(1, 'MacBook Pro', 1500.00, 1),
(2, 'iPhone 12', 1000.00, 1),
(3, 'Samsung Galaxy Watch', 300.00, 1),
(4, 'Adidas T-Shirt', 25.00, 2),
(5, 'Levis Jeans', 60.00, 2);

INSERT INTO products_table4 (product_id, product_name, product_price, category_id) VALUES
(6, 'Sony TV', 120.00, 1),
(7, 'Sony Camera', 200.00, 1),
(8, 'Iphone 15', 250000, 1),
(9, 'Macbook Air M2 Chip', 50000, 1);

TRUNCATE sales_table4;
INSERT INTO sales_table4 (sale_id, employee_id, customer_id, product_id, sale_date) VALUES
(1, 1, 1, 1, '2024-03-13'),
(2, 2, 2, 2, '2024-03-12'),
(3, 3, 3, 3, '2024-03-11'),
(4, 1, 2, 4, '2024-03-10'),
(5, 1, 1, 1, '2024-03-20'),
(6, 1, 1, 6, '2023-03-20'),
(7, 1, 1, 7, '2023-03-20'),
(8, 1, 1, 8, '2023-03-20'),
(9, 1, 1, 9, '2023-03-20');

SELECT e.employee_id, e.employee_name
FROM employees_table4 e
INNER JOIN sales_table4 s ON s.employee_id = e.employee_id
INNER JOIN customers_table4 c ON c.customer_id = s.customer_id
WHERE e.employee_city = c.shipping_address_city
GROUP BY e.employee_id;

-- TASK: 5
SELECT c.customer_id, c.customer_name
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
INNER JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name = "Electronics" AND c.customer_id 
NOT IN (
	SELECT DISTINCT c1.customer_id
	FROM customers_task1 c1
	INNER JOIN orders_task1 o1 ON o1.customer_id = c1.customer_id
	INNER JOIN orders_details_task1 od1 ON od1.order_id = o1.order_id
	INNER JOIN products_task1 p1 ON p1.product_id = od1.product_id
	INNER JOIN categories_task1 ca1 ON ca1.category_id = p1.category_id
	WHERE ca1.category_name = "Clothing"
)
GROUP BY c.customer_id;

-- TASK: 6
SELECT * FROM employees_table4;
SELECT * FROM customers_table4;
SELECT * FROM products_table4;
SELECT * FROM categories_table4;
SELECT * FROM sales_table4;

SELECT DISTINCT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = "Electronics" 
AND s.customer_id NOT IN (
	SELECT DISTINCT c1.customer_id
	FROM customers_task1 c1
	INNER JOIN orders_task1 o1 ON o1.customer_id = c1.customer_id
	INNER JOIN orders_details_task1 od1 ON od1.order_id = o1.order_id
	INNER JOIN products_task1 p1 ON p1.product_id = od1.product_id
	INNER JOIN categories_task1 ca1 ON ca1.category_id = p1.category_id
	WHERE ca1.category_name = "Clothing"
);

SELECT DISTINCT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = 'Electronics'
AND NOT EXISTS (
    SELECT 1
    FROM sales_table4 s2
    JOIN products_table4 p2 ON p2.product_id = s2.product_id
    JOIN categories_table4 ct2 ON ct2.category_id = p2.category_id
    WHERE s2.employee_id = e.employee_id
    AND ct2.category_name = 'Clothing'
);


-- TASK: 7
SELECT c.customer_name
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(p.product_id) > 1;

-- TASK: 8
SELECT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = "Electronics"
GROUP BY e.employee_id
HAVING COUNT(DISTINCT p.product_id) > 1;

