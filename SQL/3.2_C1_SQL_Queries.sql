CREATE DATABASE cybercom_sql3_2c1;

USE cybercom_sql3_2c1;

-- Table for blog posts
CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table for blog_comments
CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP
);

-- Insert data into blog_posts table
INSERT INTO blog_posts (id, title, body, author_id, created_at, updated_at) VALUES
    (1, 'Post 1', 'Body of Post 1', 1, '2023-01-06', '2023-01-06'),
    (2, 'Post 2', 'Body of Post 2', 3, '2023-01-05', '2023-01-05'),
    (3, 'Post 3', 'Body of Post 3', 1, '2023-01-01', '2023-01-01'),
    (4, 'Post 4', 'Body of Post 4', 3, '2023-01-08', '2023-01-08'),
    (5, 'Post 5', 'Body of Post 5', 2, '2023-01-04', '2023-01-04'),
    (6, 'Post 6', 'Body of Post 6', 1, '2023-01-10', '2023-01-10'),
    (7, 'Post 7', 'Body of Post 7', 2, '2023-01-02', '2023-01-02');

-- Insert data into blog_comments table
INSERT INTO blog_comments (id, post_id, body, author_id, created_at) VALUES
    (1, 1, 'Comment on Post 1', 3, '2023-01-03'),
    (2, 1, 'Another comment on Post 1', 4, '2023-01-04'),
    (2, 1, 'One more comment on Post 1', 4),
    (3, 2, 'Comment on Post 2', 5, '2023-01-05');

-- Select title and body of the five most recent blog posts, along with the number of comments each post has
SELECT bp.title, bp.body, COUNT(bc.id) AS num_comments
FROM blog_posts bp
LEFT JOIN blog_comments bc ON bp.id = bc.post_id
GROUP BY bp.id, bp.title, bp.body
ORDER BY bp.created_at DESC
LIMIT 5;