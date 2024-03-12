CREATE DATABASE cybercom_sql4_3;

USE cybercom_sql4_3;

-- Table for Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for orders
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    amount FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert data into users table
INSERT INTO users (name, email, password) 
VALUES
('Jane Smith', 'jane.smith@example.com', 'password123'),
('Alice Johnson', 'alice.johnson@example.com', 'securepassword'),
('Bob Williams', 'bob.williams@example.com', 'pass123'),
('Phineas Yadav', 'phineas.yadav@example.com', 'fever'),
('John Nathan', 'bob.test@example.com', 'pass456');

-- Insert data into orders table
INSERT INTO orders (user_id, amount) 
VALUES 
	(1, 50.0), 
	(1, 75.0), 
	(1, 100.0), 
	(2, 60.0), 
	(3, 80.0),
	(2, 45.0),
	(3, 70.0),
	(4, 85.0),
	(5, 95.0),
	(2, 60.0),
	(3, 75.0),
	(4, 80.0),
	(5, 100.0);

-- 1.	Create a new user with the following information:
-- name: John Doe
-- email: john.doe@example.com
-- password: 123456
-- created_at: current timestamp
-- updated_at: current timestamp

INSERT INTO users (name, email, password) 
VALUES 
	('John Doe', 'john.doe@example.com', '123456');

-- 2.	Retrieve the names and email addresses of all users who have placed at least one order.
SELECT name, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- 3.	Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
SELECT u.name, u.email, SUM(o.amount) AS total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_amount DESC;

-- 4.	Retrieve the email address of the user who has placed the most orders.
SELECT u.email
FROM users u
JOIN (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
    ORDER BY order_count DESC
    LIMIT 1
) t ON u.id = t.user_id;

-- 5.	Retrieve the user IDs and the total amount of orders placed by users who have placed at least one order and whose total amount of orders exceeds $100.
SELECT user_id, SUM(amount) AS total_amount
FROM orders
GROUP BY user_id
HAVING total_amount > 100;

-- 6.	Retrieve the number of users who have not placed any orders.
SELECT COUNT(*) AS num_users_without_orders
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);

-- 7.	Update the user with ID 1 to change their email address to "jane.doe@example.com".
UPDATE users
SET email = 'jane.doe@example.com'
WHERE id = 1;

-- 8.	Delete all orders placed by users whose email address contains the string "test".
DELETE FROM orders
WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%test%');

-- 9.	Retrieve the total amount of orders placed on each day of the current week, grouped by day.
SELECT DATE(created_at) AS order_date, SUM(amount) AS total_amount
FROM orders
WHERE WEEK(created_at) = WEEK(CURDATE())
GROUP BY order_date;

-- 10.	Retrieve the IDs and email addresses of users who have placed an order in the current year and whose email address is in the format "example.com".
SELECT id, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders WHERE YEAR(created_at) = YEAR(CURDATE()))
AND email LIKE '%example.com%';
