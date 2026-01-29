# 📝 Full Stack To-Do Application

A full-stack **To-Do application** built with **React**, **Node.js**, **Express**, **Sequelize**, and **MySQL**, featuring **JWT-based authentication** and complete task management (CRUD).

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login with JWT
- Protected routes using middleware
- Password hashing with bcrypt

### ✅ Task Management
- Create new tasks
- Edit task and date
- Mark tasks as completed
- View completed task history
- Delete individual tasks
- Clear all completed tasks
- Tasks are **user-specific**

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Fetch API
- Day.js

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- bcrypt

---

## 📁 Project Structure

to-do-react/
│
├── backend/
│ ├── models/
│ │ ├── Users.js
│ │ ├── Task.js
│ │ └── index.js
│ ├── middleware/
│ │ └── auth.js
│ ├── db.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── Input.jsx
│ │ ├── History.jsx
│ │ ├── Completed.jsx
│ │ ├── MainPage.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ └── main.jsx
│
└── README.md


2️⃣ Backend Setup<br>
cd backend<br>
npm install<br>
npm install mysql2<br>
<br>
3️⃣ Run Backend<br>
nodemon server.js<br>
<br>
4️⃣ Frontend Setup<br>
cd frontend<br>
npm install<br>
npm run dev<br>


Frontend runs on http://localhost:5173

🔑 API Routes
Auth

POST /register

POST /login

Tasks (Protected)

GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

PATCH /tasks/:id/completed

DELETE /tasks/completed
