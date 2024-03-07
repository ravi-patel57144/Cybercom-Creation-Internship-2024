CREATE DATABASE Cybercom_sql2_2c2;

USE Cybercom_sql2_2c2;

-- Write an SQL query to report all the classes that have at least five students. Return the result table in any order.

-- Table for Courses
CREATE TABLE Courses (
    student VARCHAR(255),
    class VARCHAR(255),
    PRIMARY KEY (student, class)
);

-- Insert data into the Courses table
INSERT INTO Courses (student, class) 
VALUES 
	('A', 'Math'),
	('B', 'English'),
	('C', 'Math'),
	('D', 'Biology'),
	('E', 'Math'),
	('F', 'Computer'),
	('G', 'Math'),
	('H', 'Math'),
	('I', 'Math');

-- Select All data from Courses Table
SELECT * FROM Courses;

-- Select class having atleast 5 students;
SELECT class FROM Courses
GROUP BY class 
HAVING COUNT(student) >=5;