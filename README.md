# 🗂️ Full-Stack Task Manager App

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to:

- ✅ Register & log in securely
- ✍️ Create, update, delete tasks
- 🔍 Search, filter, and sort tasks
- 🔒 Protected routes using JWT
- 🎨 Clean, responsive UI with light/dark mode
- 📅 Task priority & due dates with animation (Framer Motion)

## 📁 Project Structure
```
fullstack-task-manager/
├── task-manager-client/ # Frontend (React + Vite)
├── task-manager-server/ # Backend (Express + MongoDB)
```

### 🛠️ Setup Instructions


## 🚀 Getting Started  
Follow these instructions to set up the project locally on your machine.


## ✨ Features

- 📝 Create, update, and delete tasks
- 🔐 User authentication with JWT (login/register)
- 🌙 Light/Dark theme toggle
- 🎯 Task filtering and sorting (e.g., by priority, due date)
- 🔍 Search tasks by keyword
- 🗓️ Add due dates and priorities with visual indicators
- ⚡ Smooth UI transitions with Framer Motion


## 🗂️ Folder Structure

fullstack-task-manager/
├── task-manager-client/ # Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── vite.config.js
├── task-manager-server/ # Backend (Express + MongoDB)
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
└── README.md

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login existing user     |

### Task Routes

| Method | Endpoint        | Description                |
|--------|------------------|----------------------------|
| GET    | `/api/tasks`     | Get all tasks for user     |
| POST   | `/api/tasks`     | Create a new task          |
| PUT    | `/api/tasks/:id` | Update an existing task    |
| DELETE | `/api/tasks/:id` | Delete a task              |

### ✅ Prerequisites  
- Node.js (v18 or later)  
- MongoDB  
- Git


### 1. Clone the repository
```bash
git clone https://github.com/mvwebb88/fullstack-task-manager.git
cd fullstack-task-manager

### 2. Set up the client
```bash
cd task-manager-client
npm install
npm run dev

### 3. Set up the server (in a separate terminal)
```bash
cd ../task-manager-server
npm install
npm run dev

### 4. Create a `.env` file in the server folder
Add your MongoDB URI and JWT secret like this:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

## 🧰 Tech Stack

**Client:** React, Vite, Tailwind CSS (or CSS Modules if used), Framer Motion  
**Server:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JSON Web Tokens (JWT)  
**Deployment:** _Local development only (not yet deployed)_
