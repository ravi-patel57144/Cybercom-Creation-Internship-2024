CREATE DATABASE cybercom_sql3_1c3;

USE cybercom_sql3_1c3;

-- Table for sales
CREATE TABLE sales (
    id INT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

-- Insert data into the sales table
INSERT INTO sales (id, date, customer_id, product_id, quantity, total_price) VALUES
    (1, '2021-01-05', 101, 1, 2, 99.98),
    (2, '2021-02-12', 102, 3, 1, 49.99),
    (3, '2021-03-20', 103, 2, 3, 149.97),
    (4, '2021-04-15', 104, 1, 1, 49.99),
    (5, '2021-05-10', 105, 2, 2, 99.98),
    (6, '2021-06-25', 106, 3, 1, 49.99),
    (7, '2022-01-15', 107, 1, 2, 99.98),
    (8, '2022-02-20', 108, 2, 1, 49.99);

-- Select the total sales for each month in the year 2021, sorted by month in ascending order
SELECT 
    EXTRACT(MONTH FROM date) AS month,
    SUM(total_price) AS total_sales
FROM sales
WHERE EXTRACT(YEAR FROM date) = 2021
GROUP BY EXTRACT(MONTH FROM date)
ORDER BY month;
