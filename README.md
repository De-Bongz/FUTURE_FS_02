📊 CRM Leads Management System

   


---

📌 Overview

The CRM Leads Management System is a full-stack web application designed to help administrators efficiently manage customer leads. It provides a secure dashboard for tracking, updating, and organizing leads throughout the sales pipeline.

This project demonstrates real-world full-stack development skills including authentication, CRUD operations, database integration, and deployment.


---

🚀 Live Demo

👉 Frontend: https://de-bongz.github.io/FUTURE_FS_02/

👉 Backend: 


---

📸 Screenshots

🔐 Login Page

<p align="center">
  <img src="images/login.png" width="700" alt="Login Page" />
</p>📊 Dashboard

<p align="center">
  <img src="images/dashboard.png" width="700" alt="Dashboard" />
</p>
---

🧠 Key Features

🔐 Authentication & Security

Secure admin login using JWT (JSON Web Tokens)

Password hashing with bcrypt

Protected API routes

Environment variables for sensitive configuration


📊 Lead Management

Create new leads

View all leads in dashboard

Update lead status (New, Contacted, Converted)

Add notes to individual leads

Delete leads


🔍 Bonus Features

Search and filter leads

Timestamp tracking (created/updated)

Responsive UI design


🎨 User Interface

Clean blue-themed dashboard

Fully responsive (mobile + desktop)

Real-time UI updates after actions



---

🛠️ Tech Stack

Frontend

HTML5

CSS3

JavaScript (Vanilla)


Backend

Node.js

Express.js


Database

MongoDB (MongoDB Atlas)


Authentication

JWT (JSON Web Token)

bcrypt


Deployment

GitHub Pages (Frontend)

Render (Backend Hosting)



---

📁 Project Structure

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


---

⚙️ Setup Instructions

1. Clone Repository

git clone <your-repo-url>

2. Install Backend Dependencies

cd backend
npm install

3. Create Environment Variables

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


---

4. Start Backend Server

node server.js


---

5. Run Frontend

Open:

login.html

Using Live Server or browser.


---

🔌 API Endpoints

Authentication

POST /login


Leads (Protected Routes)

GET /leads

POST /leads

PUT /leads/:id

PUT /leads/:id/note

DELETE /leads/:id



---

🌐 Deployment

Frontend: GitHub Pages

Backend: Render

Database: MongoDB Atlas



---

🧠 Challenges Faced

JWT authentication integration across frontend & backend

MongoDB Atlas secure connection setup

CORS configuration between deployed services

Environment variable management in production



---

🚀 Future Improvements

Role-based access control (Admin/User)

Analytics dashboard with charts

Email notifications for lead updates

Pagination for large datasets



---

👨‍💻 Author

Bongani Maluleke
Computer Science Student – University of the Western Cape (UWC)


---

📌 License

This project is open-source and intended for educational purposes.