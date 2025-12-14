📦 Backend – Sweet Shop Management System
📖 Project Overview

This is the backend service for the Sweet Shop Management System, built as part of a Software Developer Internship Assessment.
The backend is responsible for handling authentication, product management, inventory operations, and secure API communication with the frontend.

The system is designed following real-world backend practices, with clear separation of concerns, scalable folder structure, and secure handling of user data and media uploads.

🚀 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (for image uploads)

bcrypt (password hashing)

CORS

dotenv

📂 Folder Structure
backend/
│
├── config/              # DB connection, multer config
├── controllers/         # Request & response handling logic
├── middlewares/         # JWT auth, role checks
├── models/              # Mongoose schemas
├── routes/              # API routes
├── services/            # Business logic (stock, inventory)
├── uploads/             # Uploaded images
├── .env
├── index.js
└── README.md


This structure keeps the codebase clean, readable, and scalable, similar to how production backends are organized.

🔐 Key Features

User signup & login with JWT authentication

Role-based access (Admin / User)

Product CRUD operations (Admin)

Stock increase / decrease

Product purchase flow

Image upload & static serving

Proper error handling and validation

🔄 API Highlights

POST /user/signup – User registration (with image)

POST /user/login – User login

POST /product/add – Add new product (Admin)

PATCH /product/stock/increase/:productId

PATCH /product/stock/decrease/:productId

DELETE /product/delete/:productId

GET /product – Fetch products

🤖 AI Assistance Used (Transparent Disclosure)

AI tools (ChatGPT) were used as a learning and debugging assistant, not for blind copy-pasting.

Backend AI Help Included:

✅ Proper folder structuring

Helped in deciding where to place controllers, routes, services, and middleware

Improved overall maintainability

✅ Bug fixing & debugging

Helped identify and fix:

Route parameter mismatches

JWT payload issues

Multer file path problems

MongoDB CastErrors

Static image serving issues

✅ Best practices guidance

JWT usage (what should & should not go in token payload)

Middleware vs controller responsibilities

Cleaner error handling patterns

All business logic and final implementation decisions were understood and written manually.

🧪 How to Run Backend
npm install
npm start


Make sure to add a .env file with:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET_KEY=your_secret

✅ Assessment Notes

This backend was built with clarity, correctness, and real-world patterns in mind, focusing on:

Clean APIs

Secure authentication

Maintainable architecture