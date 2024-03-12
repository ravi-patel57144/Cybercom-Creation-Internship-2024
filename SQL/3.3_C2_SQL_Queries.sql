CREATE DATABASE cybercom_sql3_3C2;

USE cybercom_sql3_3C2;

-- Table for Employees
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    age INT,
    salary INT
);

INSERT INTO employees (name, age, salary) VALUES
('John', 35, 60000),
('Mary', 27, 50000),
('Peter', 42, 75000),
('Olivia', 29, 55000),
('Michael', 38, 80000);

-- 1.	Write a SQL query to select all employees from the "employees" table.
SELECT * FROM employees;

-- 2.	Write a SQL query to select the name and salary of all employees with a salary greater than 60000.
SELECT name, salary FROM employees WHERE salary > 60000;

-- 3.	Write a SQL query to update Peter's age to 43.
UPDATE employees SET age = 43 WHERE name = 'Peter';

-- 4.	Write a SQL query to delete the employee with the id of 4.
DELETE FROM employees WHERE id = 4;

-- 5.	Write a SQL query to calculate the average salary of all employees.
SELECT AVG(salary) AS average_salary FROM employees;

-- 6.	Write a SQL query to select the name and age of the oldest employee.
SELECT name, age FROM employees ORDER BY age DESC LIMIT 1;

-- 7.	Write a SQL query to select the name and age of the youngest employee.
SELECT name, age FROM employees ORDER BY age LIMIT 1;

-- 8.	Write a SQL query to select the name of the employee with the highest salary.
SELECT name FROM employees ORDER BY salary DESC LIMIT 1;


