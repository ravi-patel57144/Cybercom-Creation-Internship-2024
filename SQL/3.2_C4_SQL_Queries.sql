CREATE DATABASE cybercom_sql3_2c4;
USE cybercom_sql3_2c4;

-- Table for orders
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2)
);

-- Insert data into orders table
INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES
    (1, 1, '2023-01-01', 100.00),
    (2, 2, '2023-01-02', 150.00),
    (3, 1, '2023-01-03', 200.00),
    (4, 3, '2023-01-04', 300.00),
    (5, 2, '2023-01-05', 250.00);

-- Calculate the total amount of orders for each customer in descending order_by total_amount
SELECT customer_id, SUM(total_amount) AS total_order_amount
FROM orders
GROUP BY customer_id
ORDER BY total_order_amount DESC;
