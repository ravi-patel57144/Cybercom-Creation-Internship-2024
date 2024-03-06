-- SQL QUERIES 1
CREATE DATABASE Cybercom_sql1;

USE Cybercom_sql1;

/* 1.	Create a database structure for product and categories. One product can be in more than one category and one category can have multiple products. */

-- Table for products
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL
);

-- Table for categories
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

-- Table for mapping products to categories (many-to-many relationship)
CREATE TABLE product_category (
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    PRIMARY KEY (product_id, category_id)
);


/* 2.	Create a database structure for students and its college. One student can be on one college only. */

-- Table for colleges
CREATE TABLE colleges (
    college_id INT PRIMARY KEY AUTO_INCREMENT,
    college_name VARCHAR(100) NOT NULL UNIQUE,
    college_location VARCHAR(100)
);

-- Table for students
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    student_age INT,
    college_id INT,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id)
);


/* 3.	Create a database structure for worldwide cricket team. Database will contain, each player’s name, its country, it’s expertise and so on. */

-- Table for countries
CREATE TABLE countries (
    country_id INT PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(100) NOT NULL UNIQUE
);

-- Table for players
CREATE TABLE players (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(100) NOT NULL,
    expertise VARCHAR(100),
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

