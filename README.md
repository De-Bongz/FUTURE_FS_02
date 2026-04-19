# 📊 CRM Leads Management System

## 📌 Overview

The **CRM Leads Management System** is a full-stack web application designed to help administrators efficiently manage customer leads. It provides a secure dashboard for tracking, updating, and organizing leads throughout the sales pipeline.

This project demonstrates real-world full-stack development skills including authentication, CRUD operations, database integration, and deployment.

---

## 🚀 Live Demo

👉 Frontend: [https://de-bongz.github.io/FUTURE_FS_02/](https://de-bongz.github.io/FUTURE_FS_02/)

👉 Backend: *()*

---

## 🧠 Key Features

### 🔐 Authentication & Security

* Secure admin login using JWT (JSON Web Tokens)
* Password hashing with bcrypt
* Protected API routes
* Environment variables for sensitive configuration

### 📊 Lead Management

* Create new leads
* View all leads in dashboard
* Update lead status (New, Contacted, Converted)
* Add notes to individual leads
* Delete leads

### 🔍 Bonus Features

* Search and filter leads
* Timestamp tracking (created/updated)
* Responsive UI design

### 🎨 User Interface

* Clean blue-themed dashboard
* Fully responsive (mobile + desktop)
* Real-time UI updates after actions

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Deployment

* GitHub Pages (Frontend)
* Render (Backend Hosting)

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

### 1. Clone Repository

```
git clone <your-repo-url>
```

### 2. Install Backend Dependencies

```
cd backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

⚠️ Never commit `.env` to GitHub.

---

### 4. Start Backend Server

```
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 5. Run Frontend

Open:

```
login.html
```

Using Live Server or directly in browser.

---

## 🔌 API Endpoints

### Authentication

* `POST /login`

### Leads (Protected Routes)

* `GET /leads`
* `POST /leads`
* `PUT /leads/:id`
* `PUT /leads/:id/note`
* `DELETE /leads/:id`

---

## 📸 Screenshots

### Login Page

*(images/login.png)*

### Dashboard

*(images/dashboard.png)*

---

## 🌐 Deployment

* Frontend deployed via GitHub Pages
* Backend hosted on Render
* Database hosted on MongoDB Atlas

---

## 🧠 Challenges Faced

* Managing JWT authentication across frontend and backend
* Connecting MongoDB Atlas securely
* Handling CORS between deployed frontend and backend
* Ensuring consistent API integration after deployment

---

## 🚀 Future Improvements

* Role-based access control (Admin/User)
* Advanced analytics dashboard (charts & insights)
* Email notifications for lead updates
* Pagination for large datasets

---

## 👨‍💻 Author

**Bongani Maluleke**
Computer Science Student – University of the Western Cape (UWC)

---

## 📌 License

This project is open-source and intended for educational purposes.
