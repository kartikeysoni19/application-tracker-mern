Job Dashboard – Full Stack MERN Application
A scalable full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, protected routes, and a job management dashboard.
This project was built as part of a frontend/backend engineering assignment to demonstrate modern web development practices, API integration, and secure authentication.
________________________________________
🚀 Features
🔐 Authentication
•	User Register & Login
•	JWT-based authentication
•	Protected routes (frontend & backend)
•	Secure password hashing
📊 Dashboard
•	View all jobs
•	Add new jobs
•	Edit existing jobs
•	Delete jobs
•	Job statistics cards
🧩 Frontend
•	React with Context API for auth state
•	Protected routes using PrivateRoute
•	Modular components
•	Clean UI with reusable components
🛠 Backend
•	RESTful API using Express
•	MongoDB with Mongoose
•	JWT authentication middleware
•	Centralized error handling
________________________________________
🧰 Tech Stack
Frontend
•	React
•	React Router
•	Context API
•	CSS
Backend
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
•	JSON Web Tokens (JWT)
•	bcrypt
________________________________________
📁 Project Structure
root
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── .env.example
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── App.js
│   ├── .env.example
│   └── package.json
│
└── README.md
________________________________________
⚙️ Environment Variables
Backend (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Frontend (frontend/.env)
REACT_APP_API_URL=http://localhost:5000/api
________________________________________
🛠 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/job-dashboard.git
cd job-dashboard
2️⃣ Backend Setup
cd backend
npm install
cp .env.example .env
npm start
Server will start on:
http://localhost:5000
________________________________________
3️⃣ Frontend Setup
cd frontend
npm install
cp .env.example .env
npm start
Frontend will run on:
http://localhost:3000
________________________________________
🔒 API Endpoints
Auth Routes
•	POST /api/auth/register – Register user
•	POST /api/auth/login – Login user
Job Routes (Protected)
•	GET /api/jobs – Get all jobs
•	POST /api/jobs – Create job
•	PUT /api/jobs/:id – Update job
•	DELETE /api/jobs/:id – Delete job
________________________________________
✅ Security Highlights
•	Password hashing using bcrypt
•	JWT authentication
•	Protected frontend routes
•	Secure API access via middleware
________________________________________
📌 Future Improvements
•	Pagination & search
•	Role-based access
•	Refresh tokens
•	UI enhancements
•	Deployment (Vercel + Render)
________________________________________
👤 Author
Kartikey Soni

