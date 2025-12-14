-- Drop tables if they exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Courses table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  professor VARCHAR(255),
  day_of_week TINYINT,
  start_time TIME,
  end_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  priority TINYINT DEFAULT 2,
  status ENUM('pending', 'done') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE SET NULL
);
