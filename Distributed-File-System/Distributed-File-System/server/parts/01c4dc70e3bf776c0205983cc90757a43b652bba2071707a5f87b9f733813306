create database university;
use university;

CREATE TABLE classroom (
  building VARCHAR(50),
  room_number INT,
  capacity INT
);

INSERT INTO classroom (building, room_number, capacity) VALUES ('Main', 101, 50);
INSERT INTO classroom (building, room_number, capacity) VALUES ('Science', 102, 30);

CREATE TABLE department (
  dept_name VARCHAR(50),
  building VARCHAR(50),
  budget DECIMAL(10, 2)
);

INSERT INTO department (dept_name, building, budget) VALUES ('CSE', 'Main', 500000);
INSERT INTO department (dept_name, building, budget) VALUES ('EE', 'Science', 300000);
INSERT INTO department (dept_name, building, budget) VALUES ('Philosophy', 'Arts', 150000);

CREATE TABLE instructor (
  ID INT PRIMARY KEY,
  name VARCHAR(50),
  dept_name VARCHAR(50),
  salary DECIMAL(10, 2)
);

INSERT INTO instructor (ID, name, dept_name, salary) VALUES (101, 'Alice', 'CSE', 75000);
INSERT INTO instructor (ID, name, dept_name, salary) VALUES (102, 'Bob', 'EE', 90000);
INSERT INTO instructor (ID, name, dept_name, salary) VALUES (103, 'Charlie', 'Philosophy', 68000);

CREATE TABLE course (
  course_id VARCHAR(10),
  title VARCHAR(100),
  dept_name VARCHAR(50),
  credit INT
);

INSERT INTO course (course_id, title, dept_name, credit) VALUES ('CSE101', 'Introduction to Computer Science', 'CSE', 4);
INSERT INTO course (course_id, title, dept_name, credit) VALUES ('EE101', 'Basic Electronics', 'EE', 3);
INSERT INTO course (course_id, title, dept_name, credit) VALUES ('PHI101', 'Introduction to Philosophy', 'Philosophy', 2);

CREATE TABLE section (
  course_id VARCHAR(10),
  sec_id INT,
  semester VARCHAR(6),
  year INT,
  building VARCHAR(50),
  room_number INT,
  time_slot_id VARCHAR(10)
);

INSERT INTO section (course_id, sec_id, semester, year, building, room_number, time_slot_id) VALUES ('CSE101', 1, 'Fall', 2022, 'Main', 101, 'TS1');
INSERT INTO section (course_id, sec_id, semester, year, building, room_number, time_slot_id) VALUES ('EE101', 1, 'Fall', 2022, 'Science', 102, 'TS2');

CREATE TABLE teaches (
  ID INT,
  course_id VARCHAR(10),
  sec_id INT,
  semester VARCHAR(6),
  year INT
);

INSERT INTO teaches (ID, course_id, sec_id, semester, year) VALUES (101, 'CSE101', 1, 'Fall', 2022);
INSERT INTO teaches (ID, course_id, sec_id, semester, year) VALUES (102, 'EE101', 1, 'Fall', 2022);

CREATE TABLE student (
  ID INT PRIMARY KEY,
  name VARCHAR(50),
  dept_name VARCHAR(50),
  total_credit INT
);

INSERT INTO student (ID, name, dept_name, total_credit) VALUES (2001, 'David', 'CSE', 100);
INSERT INTO student (ID, name, dept_name, total_credit) VALUES (2002, 'Eva', 'EE', 80);

CREATE TABLE takes (
  ID INT,
  course_id VARCHAR(10),
  sec_id INT,
  semester VARCHAR(6),
  year INT,
  grade VARCHAR(2)
);

INSERT INTO takes (ID, course_id, sec_id, semester, year, grade) VALUES (2001, 'CSE101', 1, 'Fall', 2022, 'A+');
INSERT INTO takes (ID, course_id, sec_id, semester, year, grade) VALUES (2002, 'EE101', 1, 'Fall', 2022, 'B+');

CREATE TABLE advisor (
  s_ID INT,
  i_ID INT
);

INSERT INTO advisor (s_ID, i_ID) VALUES (2001, 101);
INSERT INTO advisor (s_ID, i_ID) VALUES (2002, 102);

CREATE TABLE time_slot (
  time_slot_id VARCHAR(10),
  day VARCHAR(10),
  start_time TIME,
  end_time TIME
);

INSERT INTO time_slot (time_slot_id, day, start_time, end_time) VALUES ('TS1', 'Monday', '09:00', '10:00');
INSERT INTO time_slot (time_slot_id, day, start_time, end_time) VALUES ('TS2', 'Wednesday', '11:00', '12:00');

CREATE TABLE prereq (
  course_id VARCHAR(10),
  prereq_id VARCHAR(10)
);

INSERT INTO prereq (course_id, prereq_id) VALUES ('CSE101', 'MAT101');
INSERT INTO prereq (course_id, prereq_id) VALUES ('EE101', 'PHY101');

create database movie;
use movie;

CREATE TABLE movie (
  movie_id INT PRIMARY KEY,
  title VARCHAR(100),
  genre VARCHAR(50),
  release_year INT
);

INSERT INTO movie (movie_id, title, genre, release_year) VALUES (1, 'Inception', 'Sci-Fi', 2010);
INSERT INTO movie (movie_id, title, genre, release_year) VALUES (2, 'The Matrix', 'Sci-Fi', 1999);
INSERT INTO movie (movie_id, title, genre, release_year) VALUES (3, 'Titanic', 'Romance', 1997);

CREATE TABLE actor (
  actor_id INT PRIMARY KEY,
  name VARCHAR(100),
  birthdate DATE
);

INSERT INTO actor (actor_id, name, birthdate) VALUES (101, 'Leonardo DiCaprio', '1974-11-11');
INSERT INTO actor (actor_id, name, birthdate) VALUES (102, 'Keanu Reeves', '1964-09-02');

CREATE TABLE director (
  director_id INT PRIMARY KEY,
  name VARCHAR(100),
  birthdate DATE
);

INSERT INTO director (director_id, name, birthdate) VALUES (201, 'Christopher Nolan', '1970-07-30');
INSERT INTO director (director_id, name, birthdate) VALUES (202, 'James Cameron', '1954-08-16');

CREATE TABLE cast (
  movie_id INT,
  actor_id INT,
  role VARCHAR(50)
);

INSERT INTO cast (movie_id, actor_id, role) VALUES (1, 101, 'Lead');
INSERT INTO cast (movie_id, actor_id, role) VALUES (2, 102, 'Lead');

CREATE TABLE directs (
  director_id INT,
  movie_id INT
);

INSERT INTO directs (director_id, movie_id) VALUES (201, 1);
INSERT INTO directs (director_id, movie_id) VALUES (202, 3);

CREATE TABLE rating (
  movie_id INT,
  user_id INT,
  rating_score DECIMAL(2, 1)
);

INSERT INTO rating (movie_id, user_id, rating_score) VALUES (1, 1001, 9.0);
INSERT INTO rating (movie_id, user_id, rating_score) VALUES (2, 1002, 8.5);
INSERT INTO rating (movie_id, user_id, rating_score) VALUES (3, 1001, 9.5);

CREATE TABLE user (
  user_id INT PRIMARY KEY,
  name VARCHAR(100),
  join_date DATE
);

INSERT INTO user (user_id, name, join_date) VALUES (1001, 'Alice', '2020-01-15');
INSERT INTO user (user_id, name, join_date) VALUES (1002, 'Bob', '2021-03-22');

-- Find the total grade points earned by the student with ID '12345' across all courses taken by the student.