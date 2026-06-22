# 🚀 TaskFlow - Smart Task Management System

## 📌 Project Overview

TaskFlow is a full-stack web-based task management application designed to help users organize, track, and manage their daily tasks efficiently.

The system allows users to:

* Register and create personal accounts
* Login securely using username or email
* Create tasks with descriptions and priorities
* Set task deadlines and reminders
* Track pending and completed tasks
* View task statistics through a dashboard
* Manage personal profile information
* Change account passwords
* Monitor overdue tasks and countdown timers

Each user can only view and manage their own tasks, ensuring data privacy and proper task ownership.

---

# 🎯 Problem Statement

Managing daily tasks manually often leads to:

* Missed deadlines
* Poor productivity
* Lack of task prioritization
* Difficulty tracking completed work

TaskFlow solves these problems by providing a centralized task management platform with authentication, reminders, dashboard analytics, and user-specific task tracking.

---

# 🏗️ System Architecture

Frontend (HTML, CSS, JavaScript)

↓

Backend API (Node.js + Express.js)

↓

MySQL Database

↓

Task & User Data Storage

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js

## Database

* MySQL

## Tools

* VS Code
* Git
* GitHub
* MySQL Workbench
* Postman

---

# ✨ Features

## User Authentication

### Registration

Users can create accounts using:

* Name
* Date of Birth
* Gender
* Email
* Mobile Number
* Username
* Password

### Login

Users can login using:

* Username + Password
* Email + Password

---

## Task Management

Users can:

### Create Tasks

* Task Title
* Description
* Priority

  * High
  * Medium
  * Low
* Due Date

### Update Tasks

* Mark task as completed

### Delete Tasks

* Remove unwanted tasks

---

## Dashboard

The dashboard displays:

### Total Tasks

Total number of tasks created by the user.

### Completed Tasks

Tasks successfully completed.

### Pending Tasks

Tasks yet to be completed.

### Overdue Tasks

Tasks whose deadlines have passed.

### Recent Tasks

Latest tasks created by the user.

---

## Countdown Timer

Every task displays:

* Days Remaining
* Hours Remaining

If the deadline passes:

⚠️ Overdue

is displayed automatically.

---

## User Profile

Users can:

* View Profile
* Edit Name
* Edit Email
* Edit Mobile Number
* Edit Date of Birth
* Edit Gender

---

## Change Password

Users can securely update passwords after verifying the current password.

---

# 🗄️ Database Design

## Users Table

| Column        | Type         |
| ------------- | ------------ |
| id            | INT          |
| name          | VARCHAR(100) |
| dob           | DATE         |
| gender        | ENUM         |
| email         | VARCHAR(100) |
| mobile        | VARCHAR(15)  |
| username      | VARCHAR(50)  |
| password      | VARCHAR(255) |
| profile_image | VARCHAR(255) |
| last_login    | TIMESTAMP    |

---

## Tasks Table

| Column         | Type         |
| -------------- | ------------ |
| id             | INT          |
| title          | VARCHAR(255) |
| description    | TEXT         |
| priority       | ENUM         |
| status         | ENUM         |
| due_date       | DATETIME     |
| reminder_hours | INT          |
| user_id        | INT          |
| category       | VARCHAR(100) |
| completed_at   | DATETIME     |
| reminder_sent  | BOOLEAN      |

---

# 🔗 API Endpoints

## Authentication

POST /register

POST /login

---

## Task APIs

GET /tasks/:userId

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

---

## User APIs

PUT /users/:id

PUT /change-password/:id

---

# 📂 Project Structure

TO-DO_List/

├── backend/

│ ├── app.js

│ ├── db.js

│ ├── package.json

│

├── frontend/

│ ├── login.html

│ ├── register.html

│ ├── dashboard.html

│ ├── profile.html

│ ├── index.html

│ ├── css/

│ └── js/

│

├── database/

│ └── schema.sql

│

└── README.md

---

# 🚀 Installation Steps

## Clone Repository

git clone <repository-url>

## Open Backend

cd backend

## Install Packages

npm install

## Start Server

node app.js

Server runs on:

http://localhost:3000

---

## Run Frontend

Open:

login.html

using Live Server.

Frontend URL:

http://127.0.0.1:5500

---

# 🔒 Security Notes

Current version uses:

* Session-based local storage
* User-specific task filtering

Future Improvements:

* JWT Authentication
* Password Hashing (bcrypt)
* Email Verification
* Forgot Password
* Role-Based Access Control

---

# 📈 Future Enhancements

* Task Categories
* File Attachments
* Email Notifications
* Dark Mode
* Team Collaboration
* Calendar Integration
* AWS Cloud Deployment
* Docker Containerization
* Mobile Application

---

# 👨‍💻 Team Contribution

Frontend Development

* User Interface
* Dashboard
* Profile Management
* Task Management Pages

Backend Development

* REST APIs
* Authentication
* Business Logic
* Database Connectivity

Database Design

* Schema Creation
* Table Relationships
* Data Management

---

# 📜 Conclusion

TaskFlow is a complete task management solution developed using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL. The application provides authentication, task tracking, profile management, dashboard analytics, and deadline monitoring to improve productivity and task organization.

This project demonstrates full-stack web development concepts, REST API integration, database management, authentication workflows, and user-centric design.
