CREATE DATABASE cybercom_sql5_1;

USE cybercom_sql5_1;

-- Table for Customers
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Table for Departments
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100)
);

-- Table for Employees
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Table for Orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    employee_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    country VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Table for Products
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

-- Table for Order_Details
CREATE TABLE order_details (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert data into Customers table
INSERT INTO customers (name, email) 
VALUES 
('Mark Johnson', 'mark.johnson@example.com'),
('Sarah Brown', 'sarah.brown@example.com'),
('Chris Wilson', 'chris.wilson@example.com'),
('Emily White', 'emily.white@example.com'),
('Alex Rodriguez', 'alex.rodriguez@example.com'),
('Jessica Martinez', 'jessica.martinez@example.com'),
('Ryan Lee', 'ryan.lee@example.com'),
('Michelle Taylor', 'michelle.taylor@example.com'),
('Daniel Anderson', 'daniel.anderson@example.com'),
('Rachel Garcia', 'rachel.garcia@example.com');

-- Insert data into Departments table
INSERT INTO departments (department_name) 
VALUES 
('Sales'),
('Finance'),
('Marketing');

-- Insert data into Employees table
INSERT INTO employees (name, salary, department_id)
VALUES 
('Michael Johnson', 80000.00, 1),
('Emily Davis', 55000.00, 2),
('David Clark', 60000.00, 1);

-- Insert data into Products table
INSERT INTO products (name, price) 
VALUES 
('Product A', 50.00),
('Product B', 100.00),
('Product C', 150.00);

-- Insert data into Orders table
INSERT INTO orders (customer_id, order_date, total_amount, country) 
VALUES 
(1, '2023-01-04', 120.00, 'USA'),
(2, '2023-01-05', 180.00, 'Canada'),
(3, '2023-01-06', 210.00, 'India'),
(4, '2023-01-07', 90.00, 'USA'),
(5, '2023-01-08', 300.00, 'Canada'),
(6, '2023-01-09', 150.00, 'India'),
(7, '2023-01-10', 80.00, 'USA'),
(8, '2023-01-11', 250.00, 'Canada'),
(9, '2023-01-12', 350.00, 'India'),
(10, '2023-01-13', 110.00, 'USA'),
(2, '2023-01-14', 200.00, 'Canada'),
(3, '2023-01-15', 280.00, 'India'),
(2, '2023-01-16', 130.00, 'USA'),
(5, '2023-01-17', 220.00, 'Canada'),
(3, '2023-01-18', 320.00, 'India'),
(3, '2023-01-19', 140.00, 'USA'),
(3, '2023-01-20', 190.00, 'Canada'),
(1, '2024-02-17', 120.00, 'USA'),
(5, '2024-02-16', 180.00, 'Canada'),
(3, '2024-02-15', 210.00, 'India'),
(4, '2024-02-14', 90.00, 'USA'),
(5, '2024-02-13', 300.00, 'Canada'),
(6, '2024-02-12', 150.00, 'India'),
(7, '2024-02-11', 80.00, 'USA'),
(8, '2024-02-10', 250.00, 'Canada'),
(9, '2024-02-09', 350.00, 'India'),
(10, '2024-02-08', 110.00, 'USA'),
(3, '2024-02-06', 280.00, 'India'),
(5, '2024-02-04', 220.00, 'Canada'),
(3, '2024-02-03', 320.00, 'India'),
(3, '2024-02-02', 140.00, 'USA'),
(3, '2024-02-01', 190.00, 'Canada');

-- Insert data into Order_Details table
INSERT INTO order_details (order_id, product_id, quantity, amount) 
VALUES 
(1, 1, 2, 100.00),
(1, 2, 1, 50.00),
(2, 2, 2, 200.00),
(3, 3, 1, 150.00),
(4, 1, 5, 250.00),
(5, 2, 3, 300.00),
(6, 3, 2, 300.00),
(7, 1, 4, 200.00),
(8, 2, 1, 100.00),
(9, 3, 3, 450.00),
(10, 1, 3, 150.00),
(11, 2, 2, 200.00),
(12, 3, 1, 150.00),
(13, 1, 4, 200.00),
(14, 2, 2, 200.00),
(15, 3, 3, 450.00),
(16, 1, 2, 100.00),
(17, 2, 4, 400.00),
(18, 3, 1, 150.00),
(19, 1, 5, 250.00),
(20, 2, 3, 300.00),
(21, 3, 2, 300000.00),
(1, 1, 2, 100000.00),
(1, 2, 1, 50.00),
(2, 2, 2, 200000.00),
(3, 3, 1, 150.00),
(4, 1, 5, 25000.00),
(5, 2, 3, 300.00),
(6, 3, 2, 300.00),
(7, 1, 4, 20000.00),
(8, 2, 1, 100.00),
(9, 3, 3, 450.00),
(10, 1, 3, 150.00),
(11, 2, 2, 200.00),
(12, 3, 1, 150.00),
(13, 1, 4, 200.00),
(14, 2, 2, 20000.00),
(15, 3, 3, 45000.00),
(16, 1, 2, 100.00),
(17, 2, 4, 400.00),
(18, 3, 1, 150.00),
(19, 1, 5, 250.00),
(20, 2, 3, 300.00),
(21, 3, 2, 300.00);


-- 1.	Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, along with the total number of orders they have made.
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC
LIMIT 10;

-- 2.	Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products in the "order_details" table, sorted by the amount sold in descending order.
SELECT e.name
FROM employees e
JOIN order_details od ON e.employee_id = od.product_id
JOIN orders o ON od.order_id = o.order_id
GROUP BY e.employee_id
HAVING SUM(od.amount) > 100000;

-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days.
SELECT c.name,
       SUM(o.total_amount) AS total_amount_all_orders,
       SUM(CASE WHEN o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN o.total_amount ELSE 0 END) AS total_amount_last_30_days
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id;

-- 4.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary of all employees in the "employees" table, sorted by salary in descending order.
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, but have not made any orders in the last 90 days.
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
WHERE o.order_id IS NULL;

-- 6.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the minimum salary of their department in the "employees" table, sorted by department ID and then by salary in descending order.
SELECT e.name, e.salary
FROM employees e
JOIN (
    SELECT department_id, MIN(salary) AS min_salary
    FROM employees
    GROUP BY department_id
) d ON e.department_id = d.department_id
WHERE e.salary > d.min_salary
ORDER BY e.department_id, e.salary DESC;

-- 7.	Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table, sorted by department ID and then by salary in descending order.
SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE (
    SELECT COUNT(*)
    FROM employees e2
    WHERE e1.department_id = e2.department_id AND e1.salary <= e2.salary
) <= 5
ORDER BY e1.department_id, e1.salary DESC;

-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, but have not made any orders for products in the "products" table with a price greater than $100.
SELECT c.name
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_details od ON o.order_id = od.order_id
JOIN products p ON od.product_id = p.product_id
GROUP BY c.customer_id
HAVING MAX(p.price) <= 100;

-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, along with the total amount they have spent on all orders and the average amount they have spent per order.
SELECT c.name,
       SUM(o.total_amount) AS total_amount_all_orders,
       AVG(o.total_amount) AS average_amount_per_order
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id;

-- 10.	Write a SQL query to retrieve the names of all products in the "products" table that have been ordered by customers in more than one country, along with the names of the countries where the products have been ordered.
SELECT p.name, GROUP_CONCAT(DISTINCT o.country) AS countries_ordered_in
FROM products p
JOIN order_details od ON p.product_id = od.product_id
JOIN orders o ON od.order_id = o.order_id
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY p.product_id
HAVING COUNT(DISTINCT o.country) > 1;

