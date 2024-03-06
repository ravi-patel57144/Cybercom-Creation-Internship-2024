-- SQL QUERIES 2.1

CREATE DATABASE Cybercom_sql2;

USE Cybercom_sql2;


/* 1.	Create a database structure for employee leave application. It should include all the employee's information as well as their leave information. */

-- Table for Employees
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(100) NOT NULL,
    employee_email VARCHAR(100) NOT NULL,
    employee_department VARCHAR(100),
    employee_position VARCHAR(100)
);

-- Table for Leave Applications
CREATE TABLE leave_applications (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    leave_start_date DATE NOT NULL,
    leave_end_date DATE NOT NULL,
    leave_reason VARCHAR(255),
    leave_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


/* 2.	Write an SQL query to report the movies with an odd-numbered ID and a description that is not "boring". Return the result table ordered by rating in descending order. */

-- Table for Cinema
CREATE TABLE Cinema (
    movie_id INT PRIMARY KEY,
    movie VARCHAR(255),
    description VARCHAR(255),
    rating FLOAT
);

-- Insert data into Cinema table
INSERT INTO Cinema (movie_id, movie, description, rating)
VALUES 
    (1, 'War', 'great 3D', 8.9),
    (2, 'Science', 'fiction', 8.5),
    (3, 'irish', 'boring', 6.2),
    (4, 'Ice song', 'Fantasy', 8.6),
    (5, 'House card', 'Interesting', 9.1);
    
-- Select movies with all data
SELECT * FROM Cinema;

-- Select movies with odd-numbered ID and description not 'boring', ordered by rating in descending order
SELECT *
FROM Cinema
WHERE movie_id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;


/* 3.	Write an SQL query to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.Note that you must write a single update statement, do not write any select statement for this problem. */

-- Table for Salary
CREATE TABLE Salary (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    sex ENUM('m', 'f'),
    salary INT
);

-- Insert data into Salary table
INSERT INTO Salary (id, name, sex, salary)
VALUES 
    (1, 'A', 'm', 2500),
    (2, 'B', 'f', 1500),
    (3, 'C', 'm', 5500),
    (4, 'D', 'f', 500);

-- Select data before swapping
SELECT * FROM Salary;

-- Update statement to swap 'f' and 'm'
UPDATE Salary
SET sex = CASE sex
            WHEN 'f' THEN 'm'
            WHEN 'm' THEN 'f'
          END;

-- Select data after swapping
SELECT * FROM Salary;


/* 4.	Write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id. Return the result table in any order. */

-- Table for Person
CREATE TABLE Person (
    id INT PRIMARY KEY,
    email VARCHAR(255)
);

-- Insert data into Person table
INSERT INTO Person (id, email)
VALUES 
    (1, 'john@example.com'),
    (2, 'bob@example.com'),
    (3, 'john@example.com');

-- Select data before deletion
SELECT * FROM Person;

-- Delete duplicate emails
DELETE p1
FROM Person p1, Person p2
WHERE p1.email = p2.email AND p1.id > p2.id;

-- Select data after deletion
SELECT * FROM Person;


/* 5.	Write an SQL query to report all customers who never order anything. Return the result table in any order. */ 

-- Table for Customers
CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert data into Customers table
INSERT INTO Customers (id, name)
VALUES 
    (1, 'Joe'),
    (2, 'Henry'),
    (3, 'Sam'),
    (4, 'Max');

-- Table for Orders
CREATE TABLE Orders (
    id INT PRIMARY KEY,
    customerId INT,
    FOREIGN KEY (customerId) REFERENCES Customers(id)
);

-- Insert data into Orders table
INSERT INTO Orders (id, customerId)
VALUES 
    (1, 3),
    (2, 1);
    
-- Select all data from Customers table with order
SELECT c.id AS CustomerID, c.name AS CustomerName, o.id AS OrderID
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId;

-- Select customers who never ordered anything
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.customerId IS NULL;


/* 6.	Write an SQL query to create index on the email column. */

-- Table for Emails
CREATE TABLE Emails (
    id INT PRIMARY KEY,
    email VARCHAR(255)
);

-- Create index on the email column
CREATE INDEX idx_email ON Emails (email);

-- Insert data
INSERT INTO Emails (id, email) VALUES 
    (1, 'ravi@email.com'),
    (2, 'chica@email.com'),
    (3, 'ammu@email.com'),
    (4, 'avani@email.com');

-- Select all data
SELECT * FROM Emails;


/* 7.	Create a database schema for student grade system. It contains student data and their grade of each subject based on the different semester. */

-- Table for Students
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE
);

-- Table for Subjects
CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY,
    subject_name VARCHAR(255)
);

-- Table for Grades
CREATE TABLE Grades (
    grade_id INT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    semester VARCHAR(50),
    grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

-- Insert data into Students
INSERT INTO Students (student_id, first_name, last_name, date_of_birth)
VALUES 
    (1, 'John', 'Nav', '1999-02-15'),
    (2, 'Alice', 'Smith', '2001-02-15'),
    (3, 'Bob', 'Johnson', '2000-09-20'),
    (4, 'Emily', 'Brown', '2001-05-10');

-- Insert data into Subjects
INSERT INTO Subjects (subject_id, subject_name)
VALUES 
    (1, 'Maths'),
    (2, 'Physics'),
    (3, 'History'),
    (4, 'English');

-- Insert data into Grades
INSERT INTO Grades (grade_id, student_id, subject_id, semester, grade)
VALUES 
    (2, 1, 2, '2nd', 'B'),
    (3, 1, 3, '3rd', 'A'),
    (4, 1, 4, '4th', 'A'),
    (5, 2, 1, '2nd', 'A'),
    (6, 2, 2, '2nd', 'B'),
    (7, 2, 3, '3rd', 'B'),
    (8, 2, 4, '4th', 'A'),
    (9, 3, 1, '2nd', 'C'),
    (10, 3, 2, '2nd', 'C'),
    (11, 3, 3, '3rd', 'B'),
    (12, 3, 4, '4th', 'B'),
    (13, 4, 1, '2nd', 'B'),
    (14, 4, 2, '2nd', 'A'),
    (15, 4, 3, '3rd', 'A'),
    (16, 4, 4, '4th', 'A');

-- Selecting student names along with their grades
SELECT s.first_name, s.last_name, g.semester, sub.subject_name, g.grade
FROM Students s
JOIN Grades g ON s.student_id = g.student_id
JOIN Subjects sub ON g.subject_id = sub.subject_id;

/* 8.	Write an SQL query to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead. Return the result table in any order. */


DROP table Person_1, Address_1;
-- Create Person table
CREATE TABLE Person_1 (
	personId INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL
);

-- Create Address table
CREATE TABLE Address_1 (
	addressId INT AUTO_INCREMENT PRIMARY KEY,
    personId INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    FOREIGN KEY (personId) REFERENCES Person_1(personId)
);

-- Insert data into Person_1
INSERT INTO Person_1 (lastName, firstName) 
VALUES 
('Wang', 'Allen'), 
('Alice', 'Bob'); 
    
-- Insert data into Address_1
INSERT INTO Address_1  (personId, city, state) 
VALUES 
(2, 'New York City', 'New York'), 
(3, 'Leetcode', 'California');

-- Select data from Person_1
SELECT * FROM Person_1;

-- Select data from Address_1
SELECT * FROM Address_1;

-- Selecting Person along with address
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person_1 p
LEFT JOIN Address_1 a ON p.personId = a.personId;
