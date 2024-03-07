CREATE DATABASE Cybercom_sql2_2_C1;

USE Cybercom_sql2_2_C1;

-- Table for Activity
CREATE TABLE Activity (
    player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, event_date)
);

-- Insert data into Activity
INSERT INTO Activity (player_id, device_id, event_date, games_played) 
VALUES 
    (1, 2, '2016-03-01', 5),
    (1, 2, '2016-05-02', 6),
    (2, 3, '2017-06-25', 1),
    (3, 1, '2016-03-02', 0),
    (3, 4, '2018-07-03', 5);

-- Question 1 Write an SQL query to report the first login date for each player. Return the result table in any order.
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;

-- Question 2 Write an SQL query to report the device that is first logged in for each player. Return the result table in any order.
SELECT player_id, MIN(device_id) AS device_id
FROM Activity
GROUP BY player_id;


-- Question 3 Write an SQL query to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date. Check the example for clarity. Return the result table in any order.
SELECT 
    a1.player_id,
    a1.event_date,
    (SELECT SUM(a2.games_played) 
     FROM Activity AS a2 
     WHERE a1.player_id = a2.player_id AND a1.event_date >= a2.event_date) AS games_played_so_far
FROM Activity AS a1;

