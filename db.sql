-- CREATE DATABASE klipboard
-- remove db.sql from git

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

DELETE FROM users
WHERE id = 3
RETURNING *;

INSERT INTO users (name, email, password)
VALUES('David', 'david@gmail.com', 'test123'),
      ('Stephen', 'stephen@gmail.com', 'test123');

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);

INSERT INTO categories (name)
VALUES('tutorial'),
      ('how to'),
      ('guide');

-- blog, ebook, video, webinar, social media content,

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL
);

ALTER TABLE resources
ALTER COLUMN created_at
SET DEFAULT CURRENT_TIMESTAMP;

INSERT INTO resources (title, description, image, category_id, user_id, created_at)
VALUES('connect database in django', ' This tutorial will explain how to connect MySQL Database with your Django Project', 'https://studygyaan.com/wp-content/uploads/2019/11/Django-MySQL-Connection.png', 1, 1, CURRENT_TIMESTAMP),
      ('protect sensitive data in django', 'Protect Sensitive Data in Django – Django database password security. django decouple. The Internet is full of data, which is used for legal and illegal purposes. As a developer, we need to keep our system protect and secure. Securing applications will help our system to be protected from misuse.', 'https://studygyaan.com/wp-content/uploads/2019/08/How-to-Protect-Sensitive-Data-in-Django12.jpg', 2, 1, CURRENT_TIMESTAMP);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);