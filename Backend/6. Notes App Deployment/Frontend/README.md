# 📝 Notes Management REST API

A full-stack Notes Management application built using **React.js**, **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

This project demonstrates the implementation of a complete CRUD (Create, Read, Update, Delete) system using RESTful APIs while integrating a React frontend with an Express backend.

The frontend is built using React and Vite, while the backend handles API requests and database operations. For production deployment, the React build is served directly through the Express server, allowing both frontend and backend to be hosted using a single Render service.

---

# 🚀 Live Demo

**Application URL**

https://job-ready-ai-cohort-daily-progress-1.onrender.com/

---

# 📖 Project Overview

This project was created to understand and implement:

* RESTful API Architecture
* CRUD Operations
* Frontend and Backend Integration
* MongoDB Database Operations
* Mongoose Models & Schemas
* Express Routing
* Axios API Communication
* Production Deployment using Render
* Serving React Build through Express

The application allows users to:

* Create Notes
* View Notes
* Update Notes
* Delete Notes

All notes are stored in MongoDB Atlas and fetched dynamically using API requests.

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Axios
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Deployment

* Render
* GitHub

---

# 📂 Project Structure

```bash
Notes-App/
│
├── Backend/
│   │
│   ├── public/
│   │   ├── assets/
│   │   ├── index.html
│   │   └── ...
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── models/
│   │   │   └── note.model.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── Frontend/
    │
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    ├── vite.config.js
    └── README.md
```

---

# ✨ Features

## Create Notes

Users can create notes by providing:

* Title
* Description

The data is sent to the backend using a POST request and stored in MongoDB Atlas.

---

## Read Notes

All notes are fetched from the database and displayed dynamically on the frontend.

---

## Update Notes

Users can edit existing notes.

When the Edit button is clicked:

* Note details are populated into the form
* User updates the information
* Data is updated through a PATCH request

---

## Delete Notes

Users can permanently remove notes from the database using a DELETE request.

---

# 🌐 REST API Endpoints

## Create Note

```http
POST /api/notes
```

Request Body:

```json
{
  "title": "Learning REST API",
  "description": "Building CRUD operations using Express"
}
```

---

## Get All Notes

```http
GET /api/notes
```

---

## Update Note

```http
PATCH /api/notes/:id
```

Request Body:

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

---

## Delete Note

```http
DELETE /api/notes/:id
```

---

# 🗄️ Database Schema

```javascript
const noteSchema = new mongoose.Schema({
  title: String,
  description: String
});
```

---

# 🔄 Application Workflow

```text
User Action
     ↓
React Frontend
     ↓
Axios Request
     ↓
Express API
     ↓
Mongoose
     ↓
MongoDB Atlas
     ↓
Response Returned
     ↓
Frontend Updated
```

---

# ⚙️ Running The Project Locally

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas Account
* Git

---

# 1️⃣ Clone The Repository

```bash
git clone <repository-url>
```

```bash
cd Notes-App
```

---

# 2️⃣ Setup Backend

Move into Backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm start
```

or

```bash
npm run dev
```

Backend should run on:

```text
http://localhost:3000
```

---

# 3️⃣ Setup Frontend

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend should run on:

```text
http://localhost:5173
```

---

# 4️⃣ Configure API URL

Inside the React application, replace production URLs with local backend URLs.

Example:

```javascript
axios.get("http://localhost:3000/api/notes");
```

instead of:

```javascript
axios.get("https://your-production-url.onrender.com/api/notes");
```

---

# 🏗️ Production Deployment

This project follows a single-service deployment architecture.

Instead of deploying frontend and backend separately:

1. React application is built using:

```bash
npm run build
```

2. Generated build files are copied into:

```text
Backend/public
```

3. Express serves both:

* React Frontend
* REST API Endpoints

through a single Render deployment.

Benefits:

* Single deployment URL
* Easier maintenance
* Simplified hosting
* No frontend hosting required

---

# 🚀 Deploying To Render

## Step 1

Push project to GitHub.

---

## Step 2

Create a new Web Service in Render.

---

## Step 3

Connect GitHub repository.

---

## Step 4

Configure:

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

---

## Step 5

Add Environment Variables:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

## Step 6

Deploy Service.

Render automatically builds and deploys the application.

---

# 📚 What I Learned

Through this project, I learned:

* REST API Design
* CRUD Operations
* MongoDB Atlas Integration
* Mongoose Models
* Express Routing
* API Testing
* React State Management
* Axios Requests
* Frontend-Backend Communication
* Render Deployment
* Production Build Process
* Serving React Applications through Express

---

# 🔮 Future Improvements

* User Authentication
* JWT Authorization
* Search Functionality
* Categories & Tags
* Rich Text Notes
* Dark Mode
* Pagination
* User-specific Notes
* Docker Support
* CI/CD Pipeline

---

# 👨‍💻 Author

## Divyanshu Chauhan

MCA Student | React Developer | Full Stack Developer in Progress

### Connect With Me

GitHub:
https://github.com/DivyanshuChauhan

LinkedIn:
https://www.linkedin.com/in/divyanshu-chauhan/

---

⭐ If you found this project useful, consider giving it a star on GitHub.
