CREATE DATABASE cybercom_sql3_2c2;
USE cybercom_sql3_2c2;

-- Table for Users
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);

-- Table for Posts
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);

-- Table for likes
CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

-- Insert data into users table
INSERT INTO users (id, name, created_at) VALUES
    (1, 'User 1', '2022-01-01'),
    (2, 'User 2', '2022-01-02');

-- Insert data into posts table
INSERT INTO posts (id, user_id, body, created_at) VALUES
    (1, 1, 'Post 1 by User 1', '2022-01-01'),
    (2, 2, 'Post 2 by User 2', '2022-01-02');

-- Insert data into likes table
INSERT INTO likes (id, user_id, post_id, created_at) VALUES
    (1, 2, 1, '2022-01-03'),
    (2, 1, 2, '2022-01-04');

-- Select name and number of posts for each user who joined the platform in the year 2022, along with the total number of likes received for each user's posts
SELECT u.name, COUNT(p.id) AS num_posts, COALESCE(SUM(CASE WHEN l.post_id IS NOT NULL THEN 1 ELSE 0 END), 0) AS total_likes
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN likes l ON p.id = l.post_id
WHERE EXTRACT(YEAR FROM u.created_at) = 2022
GROUP BY u.id, u.name;
