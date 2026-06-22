CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status ENUM('Pending','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks(title,status)
VALUES
('Learn Node.js','Pending'),
('Learn Express','Pending'),
('Build Todo API','Completed');