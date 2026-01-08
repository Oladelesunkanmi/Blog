Blog Website
A full-stack blog application built with React (frontend) and Go (backend), featuring a modern, responsive design and RESTful API architecture.
Features

📝 Create, read, update, and delete blog posts
🎨 Modern, responsive UI built with React
⚡ Fast and efficient Go backend
🔗 RESTful API architecture
📱 Mobile-friendly design
🚀 Easy deployment

Tech Stack
Frontend

React - UI library
React Router - Client-side routing
Axios - HTTP client
Vite - Build tool and dev server

Backend

Go - Backend language
Fiber
Database - MySQL

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
npm or yarn
Go (v1.19 or higher)
Database system (PostgreSQL, MySQL, or MongoDB)

Installation
Backend Setup

Clone the repository:

bashgit clone https://github.com/Oladelesunkanmi/blog
cd blog

Navigate to the backend directory:

bashcd server

Install Go dependencies:

bashgo mod download

Create a .env file in the backend directory:

envPORT=8000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key

Run database migrations (if applicable):

bashgo run migrate.go

Start the backend server:

bashgo run main.go
The backend API will be running at http://localhost:8000
Frontend Setup

Navigate to the frontend directory:

bashcd frontend

Install dependencies:

bashnpm install

Create a .env file in the frontend directory:

envVITE_API_ROOT=http://localhost:8080/api

Start the development server:

bashnpm run dev
The frontend will be running at http://localhost:5173
API Endpoints
Blog Posts
MethodEndpointDescriptionGET/api/postsGet all blog postsGET/api/posts/:idGet a single blog postPOST/api/postsCreate a new blog postPUT/api/posts/:idUpdate a blog postDELETE/api/posts/:idDelete a blog post