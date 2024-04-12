CREATE DATABASE practice5_3;
USE practice5_3;

-- TABLES
CREATE TABLE employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    employee_salary DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    total_sales DECIMAL(10, 2),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO employees (employee_name, employee_salary) VALUES
('John Doe', 50000.00),
('Jane Smith', 60000.00),
('Alice Johnson', 55000.00),
('Bob Brown', 48000.00),
('Emma Davis', 52000.00),
('Michael Wilson', 58000.00),
('Emily Taylor', 53000.00),
('David Martinez', 57000.00),
('Olivia Garcia', 59000.00),
('James Rodriguez', 54000.00);

INSERT INTO orders_task1 (employee_id, total_sales) VALUES
(1, 60000.00),
(1, 55000.00),
(2, 48000.00),
(3, 62000.00),
(4, 52000.00),
(4, 58000.00),
(3, 53000.00),
(2, 57000.00),
(1, 59000.00);

-- TASK: 1
SELECT employee_name, employee_salary FROM employees
WHERE employee_salary > (SELECT AVG(employee_salary) FROM employees);


-- TASK: 2
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50)
);
ALTER TABLE customers ADD COLUMN customer_country VARCHAR(20);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    unit_price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers (customer_id, customer_name) VALUES
(1, 'John Smith'),
(2, 'Alice Johnson'),
(3, 'Michael Brown');

UPDATE customers SET customer_country='USA' WHERE customer_id=1;
UPDATE customers SET customer_country='USA' WHERE customer_id=2;
UPDATE customers SET customer_country='Canada' WHERE customer_id=3;

INSERT INTO products (product_id, product_name, unit_price) VALUES
(101, 'Product A', 10.50),
(102, 'Product B', 15.75),
(103, 'Product C', 20.00);
UPDATE products SET unit_price=6000 WHERE product_id=101;

INSERT INTO orders (order_id, customer_id, order_date) VALUES
(1001, 1, '2024-03-13'),
(1002, 2, '2024-03-14'),
(1003, 3, '2024-03-15');

INSERT INTO order_items (order_item_id, order_id, product_id, quantity) VALUES
(2001, 1001, 101, 2),
(2002, 1001, 102, 1),
(2003, 1002, 102, 3),
(2004, 1003, 103, 2),
(2005, 1003, 101, 1);

SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;

SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_revenue DESC;


-- TASK: 3
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
LEFT JOIN order_items oi ON oi.order_id = o.order_id
LEFT JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > 10000
ORDER BY total_revenue DESC;

-- TASK: 4
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
)
ORDER BY total_revenue DESC;


SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
    SELECT AVG(revenue)
    FROM (
        SELECT SUM(oi.quantity * pr.unit_price) AS revenue
        FROM customers cu
        JOIN orders ordr ON ordr.customer_id = cu.customer_id
        JOIN order_items oi ON oi.order_id = ordr.order_id
        JOIN products pr ON pr.product_id = oi.product_id
        GROUP BY cu.customer_id
    ) AS avg_revenue
)
ORDER BY total_revenue DESC;


-- TASK: 5
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA' OR c.customer_country='Canada'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
)
ORDER BY total_revenue DESC;


SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA' OR c.customer_country='Canada'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
    SELECT AVG(revenue)
    FROM (
        SELECT SUM(oi.quantity * pr.unit_price) AS revenue
        FROM customers cu
        JOIN orders ordr ON ordr.customer_id = cu.customer_id
        JOIN order_items oi ON oi.order_id = ordr.order_id
        JOIN products pr ON pr.product_id = oi.product_id
        GROUP BY cu.customer_id
    ) AS avg_revenue
)
ORDER BY total_revenue DESC;


-- TASK: 6
SELECT DISTINCT employee_name
FROM employees e
INNER JOIN orders_task1 o
ON o.employee_id = e.employee_id
WHERE o.total_sales>50000;

SELECT employee_name
FROM employees
WHERE employee_id IN (
    SELECT employee_id
    FROM orders_task1
    WHERE total_sales > 50000.00
);

-- TASK: 7
SELECT DISTINCT e.employee_name, o.total_sales
FROM employees e
INNER JOIN orders_task1 o ON o.employee_id = e.employee_id
WHERE o.total_sales > (SELECT AVG(total_sales) FROM orders_task1)
ORDER BY o.total_sales DESC;


-- TASK: 8
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > 5000
ORDER BY total_revenue DESC;


-- TASK: 9
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
    WHERE c.customer_country='USA'
)
ORDER BY total_revenue DESC;

-- TASK: 10
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
) AND COUNT(c.customer_id) >= 2
ORDER BY total_revenue DESC;

