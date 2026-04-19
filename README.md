
---

# 📊 CRM Leads Management System

## 📌 Project Overview
This is a full-stack Customer Relationship Management (CRM) system that enables users to efficiently manage leads through a secure and interactive dashboard.

The application supports authentication, lead tracking, status updates, note management, and lead deletion, providing a practical solution for handling customer data.

---

## 🚀 Features

### 🔐 Authentication
- Secure login using JSON Web Tokens (JWT)
- Protected routes to restrict unauthorized access

### 📊 Lead Management
- Add new leads
- View all leads in a dashboard
- Search and filter leads by name or status
- Update lead status (New, Contacted, Converted)
- Add notes to leads
- Delete leads (available to all authenticated users)

### 🧠 Dashboard
- Clean and responsive UI
- Real-time updates after actions
- Spinner and feedback messages during login

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JSON Web Token (JWT)

---

## 📸 Screenshots
![Login Page](images/login.png)
![Dashboard](images/dashboard.png)

---

## 📁 Project Structure
```
backend/
│── models/
│   ├── User.js
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
```bash
git clone 
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start Backend Server
```bash
node server.js
```
Server runs on:
```
http://localhost:5000
```

### 5. Run Frontend
Open:
```
login.html
```
Using Live Server or browser

---

## 🔌 API Endpoints

### Auth
- `POST /login`
- `POST /signup`

### Leads (Protected Routes)
- `GET /leads`
- `POST /leads`
- `PUT /leads/:id`
- `PUT /leads/:id/note`
- `DELETE /leads/:id`

---

## 🧪 Future Improvements
- Implement password hashing (bcrypt)
- Dashboard analytics (charts & insights)
- Role-based access control (Admin/User)
- Deploy to cloud (Render / Railway)

---

## 👨‍💻 Author
**Bongani Maluleke**  
Computer Science Student – University of the Western Cape (UWC)

---

## 💡 Project Purpose
This project was developed as part of a full-stack learning journey to build real-world applications using modern web technologies.

---

## 📄 License
This project is open-source and available for educational purposes.
---