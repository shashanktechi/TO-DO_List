
use todo_app;

CREATE TABLE tasks1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status ENUM('Pending','Completed')
    DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tasks1(title,status)
VALUES
('Learn Node.js','Pending'),
('Learn Express','Completed'),
('Build Todo API','Pending');

SELECT VERSION();
USE todo_app;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from users;
ALTER TABLE tasks1
ADD due_date DATETIME;

ALTER TABLE tasks1
ADD description TEXT,
ADD priority ENUM('High','Medium','Low') DEFAULT 'Medium',
ADD reminder_hours INT DEFAULT 5;

DESC tasks1;
DESC users;
SELECT id,title,due_date
FROM tasks1;

ALTER TABLE tasks1
ADD COLUMN user_id INT;

ALTER TABLE tasks1
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id);

ALTER TABLE users
ADD COLUMN profile_image VARCHAR(255);

ALTER TABLE users
ADD COLUMN last_login TIMESTAMP NULL;

ALTER TABLE tasks1
ADD COLUMN category VARCHAR(100);

ALTER TABLE tasks1
ADD COLUMN completed_at DATETIME;

ALTER TABLE tasks1
ADD COLUMN reminder_sent BOOLEAN DEFAULT FALSE; 

DESC users;
DESC tasks1;
SELECT id,title,user_id FROM tasks1;
select * from users;
