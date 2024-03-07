CREATE DATABASE cybercom_sql3_2c3;
USE cybercom_sql3_2c3;

-- Table for Employees
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    salary DECIMAL(10,2)
);

-- Insert data into employees table
INSERT INTO employees (id, name, department, salary) VALUES
    (1, 'Avantika', 'sales', 60000.00),
    (2, 'Ammu', 'sales', 55000.00),
    (3, 'Alice', 'finance', 45000.00),
    (4, 'Ravi', 'sales', 62000.00);
    
-- Select all data
select * from employees;

-- Select names and salaries of all employees in the "sales" department who earn more than 50k/year
SELECT name, salary
FROM employees
WHERE department = 'sales' AND salary > 50000;
