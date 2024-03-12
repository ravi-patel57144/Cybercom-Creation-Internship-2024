CREATE DATABASE cybercom_sql3_4C2;

USE cybercom_sql3_4C2;

-- Table for Employees
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    title VARCHAR(100),
    department VARCHAR(50),
    hire_date DATE,
    salary DECIMAL(10, 2)
);

-- Insert data into Employees table
INSERT INTO employees (emp_id, first_name, last_name, title, department, hire_date, salary)
VALUES
(1, 'John', 'Doe', 'Sales Manager', 'Sales', '1998-05-20', 70000.00),
(2, 'Jane', 'Smith', 'HR Manager', 'Human Resources', '2005-10-15', 65000.00),
(3, 'Michael', 'Johnson', 'Software Engineer', 'Engineering', '2002-08-10', 80000.00),
(4, 'Emily', 'Davis', 'Sales Representative', 'Sales', '2004-03-25', 55000.00),
(5, 'David', 'Clark', 'Accountant', 'Finance', '2007-12-01', 60000.00),
(6, 'Laura', 'Wilson', 'Marketing Manager', 'Marketing', '2008-06-18', 72000.00),
(7, 'Steven', 'Anderson', 'Software Engineer', 'Engineering', '2010-02-10', 85000.00),
(8, 'Jessica', 'Martinez', 'Sales Manager', 'Sales', '2000-04-05', 75000.00),
(9, 'Daniel', 'Taylor', 'HR Assistant', 'Human Resources', '2012-09-30', 50000.00),
(10, 'Amy', 'Brown', 'Marketing Coordinator', 'Marketing', '2015-11-20', 48000.00),
(16, 'Sarah', 'Doe', 'Sales Representative', 'Sales', '2003-02-15', 60000.00),
(12, 'Robert', 'Smith', 'Sales Manager', 'Sales', '2006-09-10', 72000.00),
(13, 'Jennifer', 'Wilson', 'Marketing Manager', 'Marketing', '2011-04-05', 78000.00),
(14, 'James', 'Martinez', 'Sales Manager', 'Sales', '2008-12-20', 70000.00),
(15, 'Lauren', 'Anderson', 'HR Manager', 'Human Resources', '2009-07-18', 68000.00);

-- 1.	Write a query that returns the first and last name of all employees who have a title that contains the word "Manager".
SELECT first_name, last_name
FROM employees
WHERE title LIKE '%Manager%';

-- 2.	Write a query that returns the department name and the average salary of all employees in each department.
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department;

-- 3.	Write a query that returns the number of employees who were hired in each year, sorted by year.
SELECT YEAR(hire_date) AS hire_year, COUNT(*) AS num_employees
FROM employees
GROUP BY YEAR(hire_date)
ORDER BY hire_year;

-- 4.	Write a query that returns the first name, last name, and salary of the top 10 highest-paid employees.
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;

-- 5.	Write a query that updates the salary of all employees in the "Sales" department to be 10% higher than their current salary.
UPDATE employees
SET salary = salary * 1.1
WHERE department = 'Sales';

-- 6.	Write a query that deletes all employees who were hired before the year 2000.
DELETE FROM employees
WHERE YEAR(hire_date) < 2000;

-- 7.	Write a query that creates a new table called "employee_stats" that contains the following columns: "department_name", "total_employees", and "average_salary". The table should include one row for each department.
CREATE TABLE employee_stats (
    department_name VARCHAR(50),
    total_employees INT,
    average_salary DECIMAL(10, 2)
);

INSERT INTO employee_stats (department_name, total_employees, average_salary)
SELECT department, COUNT(*) AS total_employees, AVG(salary) AS average_salary
FROM employees
GROUP BY department;

-- 8.	Write a query that returns the first and last name of all employees who have the same last name as their manager.
SELECT e.first_name, e.last_name
FROM employees e
JOIN employees m ON e.last_name = m.last_name
AND e.emp_id != m.emp_id
AND e.title NOT LIKE '%Manager%'
AND m.title LIKE '%Manager%';

-- 9.	Write a query that returns the top 5 departments with the highest average salary.
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC
LIMIT 5;

-- 10.	Write a query that returns the first and last name of all employees who have at least one dependent. Sort the results by last name.

-- Table for Dependents
CREATE TABLE dependents (
    dependent_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    relationship VARCHAR(50),
    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(emp_id)
);

-- Insert data into Dependents table
INSERT INTO dependents (employee_id, first_name, last_name, relationship)
VALUES
(1, 'Emma', 'Doe', 'Spouse'),
(1, 'Ethan', 'Doe', 'Child'),
(3, 'Olivia', 'Johnson', 'Child'),
(3, 'Sophia', 'Johnson', 'Child'),
(6, 'Ava', 'Wilson', 'Spouse'),
(8, 'Mia', 'Martinez', 'Child'),
(8, 'Liam', 'Martinez', 'Child');


SELECT DISTINCT e.first_name, e.last_name
FROM employees e
JOIN dependents d ON e.emp_id = d.employee_id
ORDER BY e.last_name;
