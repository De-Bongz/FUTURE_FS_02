# CRM Leads Management System

## 📌 Project Overview
This is a full-stack CRM system that allows an admin to manage leads, update statuses, add notes, and delete records using a secure login system.
This is a full-stack CRM (Customer Relationship Management) web application built using:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- HTML, CSS, JavaScript (Frontend)

It allows an admin to:
- Login securely
- Add leads
- Update lead status
- Add notes to leads
- Delete leads
- View all leads in a dashboard

---

## 🚀 Features

### 🔐 Authentication
- Admin login system using JWT
- Protected routes (only logged-in users can access data)

### 📊 Lead Management
- Add new leads
- View all leads
- Update lead status (New, Contacted, Converted)
- Add notes to each lead
- Delete leads

### 🧠 Dashboard
- Clean UI dashboard
- Real-time updates after actions

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Mongoose)

**Authentication:**
- JSON Web Token (JWT)

---

## 📁 Project Structure

```
backend/
│── models/
│   ├── Admin.js
│   ├── Leads.js
│
│── server.js
│── .env
│── package.json
│
frontend/
│── login.html
│── index.html
│── style.css
│── script.js
```

---

## ⚙️ Setup Instructions

### 1. Clone Project
```
git clone <your-repo-url>
```

### 2. Install Backend Dependencies
```
cd backend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
```

---

### 4. Start Backend Server
```
node server.js
```

Server runs on:
```
http://localhost:5000
```

---

### 5. Run Frontend
Open:
```
login.html
```
Using Live Server or browser

---

## 🔑 Default Login (if seeded manually)
```
username: admin
password: 1234
```

---

## 🔥 API Endpoints

### Auth
- POST /login

### Leads
- GET /leads (auth required)
- POST /leads (auth required)
- PUT /leads/:id (auth required)
- PUT /leads/:id/note (auth required)
- DELETE /leads/:id (auth required)

---

## 🧪 Future Improvements
- Password hashing (bcrypt)
- Search & filter leads
- Dashboard analytics
- Role-based access (admin/user)
- Deployment to cloud

---

## 👨‍💻 Author
Author: Bongani Maluleke  
Student at University of the Western Cape (UWC)

Built as a learning full-stack CRM project for Future Interns.
