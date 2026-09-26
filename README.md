# MERN Notes App

A full-stack notes application with user authentication, built to practice the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User signup/login with JWT authentication
- Passwords hashed with bcrypt
- Create, read, update, and delete notes
- Notes are private to each logged-in user
- Styled with Tailwind CSS

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens), bcrypt for password hashing

## Running Locally

**Backend:**
\`\`\`bash
cd backend
npm install
# add a .env file with MONGODB_URI and JWT_SECRET
node server.js
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`