# Feedback App – Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Feedback App — a full-stack project that allows users to submit responses and receive AI-generated feedback. This server handles user authentication, feedback storage, and history retrieval.

---

## Live API URL

> [https://feedback-app-backend-rn4k.onrender.com](https://feedback-app-backend-rn4k.onrender.com)

## 🧰 Tech Stack

- Node.js + Express
- bcryptjs (password hashing)
- MongoDB + Mongoose
- JWT (user authentication)
- CORS
- dotenv for environment configs

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/feedback-app-backend.git
cd feedback-app-backend
npm install
node server.js
```

## ENV Setup
```bash
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/feedback-db
  JWT_SECRET=your_super_secret_key
  PORT=5000
  FRONTEND_URL=frontend_url
```

