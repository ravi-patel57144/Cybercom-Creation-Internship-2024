CREATE DATABASE cybercom_sql3_3C1;

USE cybercom_sql3_3C1;

-- Table for books
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year INT
);

-- Insert data into books table
INSERT INTO books (title, author, publication_year) VALUES
('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 1997),
('The Hobbit', 'J.R.R. Tolkien', 1937),
('The Lord of the Rings', 'J.R.R. Tolkien', 1954),
('The Da Vinci Code', 'Dan Brown', 2003),
('A Song of Ice and Fire', 'George R.R. Martin', 1996),
('The Hunger Games', 'Suzanne Collins', 2008),
('The Chronicles of Narnia', 'C.S. Lewis', 1950),
('Frankenstein', 'Mary Shelley', 1818),
('Moby-Dick', 'Herman Melville', 1851),
('The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', 1892);

-- Select all data
SELECT * FROM books;
    
    
-- Select title and author of the oldest book
SELECT title, author, publication_year
FROM books
WHERE publication_year = (SELECT MIN(publication_year) FROM books);
