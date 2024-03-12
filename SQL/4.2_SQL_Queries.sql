CREATE DATABASE cybercom_sql4_2;

USE cybercom_sql4_2;

-- Table for Departments
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

-- Table for Employees
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    DepartmentID INT,
    Salary DECIMAL(10, 2),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- Table for Salaries
CREATE TABLE Salaries (
    SalaryID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT,
    Salary DECIMAL(10, 2),
    Date DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Insert data into Departments table
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Engineering');

-- Insert data into Employees table
INSERT INTO Employees (EmployeeID, Name, DepartmentID, Salary) VALUES
(1, 'John Doe', 1, 60000.00),
(2, 'Jane Smith', 1, 55000.00),
(3, 'Michael Johnson', 2, 65000.00),
(4, 'Emily Davis', 2, 60000.00),
(5, 'David Clark', 3, 70000.00),
(6, 'Laura Wilson', 3, 75000.00);

-- Insert data into Salaries table
INSERT INTO Salaries (EmployeeID, Salary, Date) VALUES
(1, 60000.00, '2022-01-01'),
(2, 55000.00, '2022-01-01'),
(3, 65000.00, '2022-01-01'),
(4, 60000.00, '2022-01-01'),
(5, 70000.00, '2022-01-01'),
(6, 75000.00, '2022-01-01');

-- 1.	Write a query to return the names of all employees who work in the 'Sales' department.
SELECT Name
FROM Employees
WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE DepartmentName = 'Sales');

-- 2.	Write a query to return the total number of employees in each department, ordered by department name.
SELECT d.DepartmentName, COUNT(e.EmployeeID) AS TotalEmployees
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentName
ORDER BY d.DepartmentName;

-- 3.	Write a query to return the average salary for each department, ordered by department name.
SELECT d.DepartmentName, AVG(e.Salary) AS AverageSalary
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentName
ORDER BY d.DepartmentName;

-- 4.	Write a query to return the top 10% of highest paid employees, ordered by salary.
SELECT NAME, SALARY FROM (
    SELECT NAME, SALARY, NTILE(10) OVER (ORDER BY SALARY DESC) AS SALARY_PERCENTILE FROM EMPLOYEES) AS PERCENTILE_QUERY
WHERE 
    SALARY_PERCENTILE = 1
ORDER BY 
    SALARY DESC;

-- 5.	Write a query to return the salary of each employee for their latest salary entry.
SELECT e.Name, s.Salary
FROM Employees e
JOIN (
    SELECT EmployeeID, Salary
    FROM Salaries
    WHERE (EmployeeID, Date) IN (
        SELECT EmployeeID, MAX(Date)
        FROM Salaries
        GROUP BY EmployeeID
    )
) s ON e.EmployeeID = s.EmployeeID;
