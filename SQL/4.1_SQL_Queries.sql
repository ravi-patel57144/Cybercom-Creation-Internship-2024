CREATE DATABASE cybercom_sql4_1;

USE cybercom_sql4_1;

-- Table for authors
CREATE TABLE authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Table for books
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author_id INT,
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Table for book_categories
CREATE TABLE book_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Table for book_category_mappings
CREATE TABLE book_category_mappings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    category_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);

-- Insert data into authors table
INSERT INTO authors (name) VALUES
('J.K. Rowling'),
('Stephen King'),
('Agatha Christie');

-- Insert data into book_categories table
INSERT INTO book_categories (name) VALUES
('Fiction'),
('Non-fiction'),
('Mystery');

-- Insert data into books table
INSERT INTO books (title, author_id, publication_date) VALUES
('Harry Potter and the Sorcerer''s Stone', 1, '1997-06-26'),
('The Shining', 2, '1977-01-28'),
('Murder on the Orient Express', 3, '1934-01-01'),
('Harry Potter and the Chamber of Secrets', 1, '1998-07-02'),
('It', 2, '1986-09-15'),
('The Lying Life of Adults', 3, '2020-09-01');

-- Insert data into book_category_mappings table
INSERT INTO book_category_mappings (book_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 3),
(4, 1),
(5, 1);

-- 1.	Write a query to find all books published in the year 2020.
SELECT * FROM books WHERE YEAR(publication_date) = 2020;

-- 2.	Write a query to find the name of the author who has written the most number of books.
SELECT a.name AS author_name
FROM authors a
JOIN books b ON a.id = b.author_id
GROUP BY a.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- 3.	Write a query to find the name of the category with the most number of books.
SELECT bc.name AS category_name
FROM book_categories bc
JOIN book_category_mappings bcm ON bc.id = bcm.category_id
GROUP BY bc.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- 4.	Write a query to find the name of the author who has written the most number of books in the category "fiction".
SELECT a.name AS author_name
FROM authors a
JOIN books b ON a.id = b.author_id
JOIN book_category_mappings bcm ON b.id = bcm.book_id
JOIN book_categories bc ON bcm.category_id = bc.id
WHERE bc.name = 'Fiction'
GROUP BY a.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- 5.	Write a query to find the titles of the top 5 most popular books. The popularity of a book is defined as the number of times it has been borrowed by customers. Assume that information about book borrowings is stored in a separate table called book_borrowings with the following columns:
-- id: unique identifier for each borrowing
-- book_id: foreign key pointing to the books table
-- customer_id: foreign key pointing to the customers table
-- borrow_date: date on which the book was borrowed

-- Table for Customers
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

-- Insert data into customers table
INSERT INTO customers (name, email, phone) VALUES
('John Doe', 'john@example.com', '123-456-7890'),
('Jane Smith', 'jane@example.com', '987-654-3210'),
('Alice Johnson', 'alice@example.com', '456-789-0123'),
('Bob Brown', 'bob@example.com', '789-012-3456'),
('Carol Williams', 'carol@example.com', '012-345-6789');

-- Table for book_borrowings
CREATE TABLE book_borrowings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    customer_id INT,
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Insert data into book_borrowings table
INSERT INTO book_borrowings (book_id, customer_id, borrow_date) VALUES
(1, 1, '2022-01-15'),
(2, 2, '2022-02-20'),
(3, 3, '2022-03-05'),
(1, 4, '2022-04-10'),
(5, 5, '2022-05-15'),
(1, 2, '2022-06-20'),
(3, 1, '2022-07-25'),
(2, 3, '2022-08-30'),
(5, 4, '2022-09-05'),
(4, 5, '2022-10-10');

SELECT b.title AS book_title
FROM books b
JOIN book_borrowings bb ON b.id = bb.book_id
GROUP BY b.id
ORDER BY COUNT(*) DESC
LIMIT 5;
