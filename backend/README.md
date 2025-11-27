# COMP3123 Assignment 2 - Full-Stack MERN Application

A complete full-stack MERN (MongoDB, Express, React, Node.js) application with Docker support for managing employees and user authentication.

## Features

- **User Authentication**: Signup/Login with JWT tokens
- **Employee Management**: CRUD operations (Create, Read, Update, Delete)
- **Search Functionality**: Filter employees by department and position
- **File Uploads**: Employee photo management
- **Responsive UI**: Material-UI components
- **Docker Support**: Multi-container orchestration with MongoDB, Backend API, and Frontend

## Tech Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js 5.1
- **Database**: MongoDB 6.0
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **File Upload**: multer 1.4.5-lts.1
- **Security**: helmet, CORS

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: TanStack Query v4
- **UI Library**: Material-UI v5
- **Build Tool**: Create React App

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (frontend)

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server entry point
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT authentication middleware
│   │   │   └── upload.js          # File upload middleware (multer)
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Employee.js        # Employee schema
│   │   ├── routes/
│   │   │   ├── userRoutes.js      # Auth endpoints (signup, login)
│   │   │   └── employeeRoutes.js  # Employee CRUD endpoints
│   │   └── uploads/               # Employee photo storage
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── index.js               # React entry point
│   │   ├── App.js                 # Main app with routing
│   │   ├── api/
│   │   │   ├── axios.js           # Axios instance with auth interceptor
│   │   │   └── employees.js       # Employee API calls
│   │   ├── pages/
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Signup.js          # Signup page
│   │   │   ├── EmployeeList.js    # Employee list and search
│   │   │   ├── EmployeeForm.js    # Add/Edit employee form
│   │   │   └── EmployeeDetails.js # Employee detail view
│   │   ├── components/
│   │   │   └── NavBar.js          # Navigation bar
│   │   └── index.css
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── Dockerfile
│   ├── nginx.conf                 # Nginx configuration for React routing + API proxy
│   ├── package.json
│   └── .env
├── docker-compose.yml             # Docker Compose configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (email, password)
- `POST /api/auth/login` - Login user (email, password) → returns JWT token

### Employee Management
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee (with optional photo upload)
- `GET /api/employees/:id` - Get employee details
- `PUT /api/employees/:id` - Update employee (with optional photo)
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?department=X&position=Y` - Search employees

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development without Docker)
- Git

### Installation & Running with Docker

1. **Clone the repository**
   ```bash
   git clone <backend-repo-url> backend
   git clone <frontend-repo-url> frontend
   ```

2. **Build and start services**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api
   - MongoDB: localhost:27017

### Running Locally (Without Docker)

#### Backend
```bash
cd backend
npm install
npm start
```
Backend runs on http://localhost:4000

#### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

## Environment Variables

### Backend (.env)
```
PORT=4000
MONGO_URI=mongodb://mongo:27017/comp3123
JWT_SECRET=supersecret_change_me_in_production
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/api
```

## User Flow

1. **Sign Up**
   - Navigate to /signup
   - Enter email and password (min 6 characters)
   - Receive JWT token and auto-redirect to /employees

2. **Login**
   - Navigate to /login
   - Enter credentials
   - Receive JWT token and access employee management

3. **Manage Employees**
   - View all employees in list
   - Add new employee (with optional photo upload)
   - Edit employee details
   - Delete employees
   - Search by department/position

## Testing with Postman

1. **Import the Postman collection** (if provided)
2. **Signup Request**
   - Method: POST
   - URL: http://localhost:4000/api/auth/signup
   - Body: `{"email": "test@example.com", "password": "password123"}`
   - Save the returned token

3. **For Protected Endpoints**
   - Add header: `Authorization: Bearer <token>`
   - All employee endpoints require this header

## Docker Commands

```bash
# Start services
docker-compose up -d

# Rebuild and start
docker-compose up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo

# Stop services
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
```

## Database Schema

### User Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "passwordHash": "hashed_password",
  "createdAt": ISODate
}
```

### Employee Collection
```json
{
  "_id": ObjectId,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "position": "Software Engineer",
  "department": "Engineering",
  "salary": 85000,
  "dateOfJoining": ISODate,
  "phone": "416-555-1234",
  "photoUrl": "photo_filename.jpg"
}
```

## Security Notes

- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Implement rate limiting for API endpoints in production
- Use HTTPS in production
- Validate all inputs (already implemented with express-validator)

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000 or 4000
lsof -ti :3000 | xargs kill -9
lsof -ti :4000 | xargs kill -9
```

### Docker Image Build Failures
```bash
# Clean build (remove old images)
docker-compose down --rmi all
docker-compose up -d --build
```

### MongoDB Connection Issues
Ensure MongoDB container is running:
```bash
docker ps | grep mongo
```

## Author
Daniel - COMP3123 Assignment 2

## License
MIT
