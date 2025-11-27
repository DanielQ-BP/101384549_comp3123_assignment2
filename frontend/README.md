# COMP3123 Assignment 2 - Frontend ReactJS Application

React-based frontend for employee management system with user authentication and responsive UI.

## Features

- **Authentication**: Signup/Login pages with JWT token management
- **Employee Management**: View, create, edit, delete employees
- **File Uploads**: Upload employee photos
- **Search**: Filter employees by department and position
- **Responsive Design**: Material-UI components for mobile-friendly interface
- **Private Routes**: Protected pages requiring authentication
- **Data Fetching**: TanStack Query for efficient data management

## Tech Stack

- **React**: 18.2
- **React Router**: v6 (client-side routing)
- **Axios**: HTTP client with auth interceptor
- **TanStack Query**: v4 (React Query)
- **Material-UI**: v5 (UI components)
- **Nginx**: Production server with API proxy

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Runs on http://localhost:3000

### Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder

## Project Structure

```
src/
├── index.js               # React entry point with QueryClientProvider
├── App.js                 # Main app with routing and PrivateRoute
├── index.css              # Global styles
├── api/
│   ├── axios.js           # Axios instance with Bearer token interceptor
│   └── employees.js       # Employee CRUD API functions
├── pages/
│   ├── Login.js           # Login form
│   ├── Signup.js          # Signup form
│   ├── EmployeeList.js    # Employee list with search and delete
│   ├── EmployeeForm.js    # Add/Edit employee form with photo upload
│   └── EmployeeDetails.js # Single employee detail view
├── components/
│   └── NavBar.js          # Navigation bar with logout
└── public/
    ├── index.html         # HTML template
    └── manifest.json      # PWA manifest
```

## Page Descriptions

### Login Page (`/login`)
- Email and password fields
- Submit button for authentication
- Link to signup page
- Stores JWT token in localStorage
- Redirects to `/employees` on success

### Signup Page (`/signup`)
- Email and password fields
- Password validation (min 6 characters, valid email format)
- Submit button for registration
- Link to login page
- Stores JWT token and redirects on success

### Employee List Page (`/employees`)
- Display all employees in list/table format
- Search by department
- Search by position
- Delete button for each employee
- Add employee button
- Edit button for each employee

### Employee Form Page (`/employees/add` or `/employees/:id/edit`)
- Text fields: firstName, lastName, email, position, department
- Number field: salary
- Date field: dateOfJoining
- Phone field
- File upload: employee photo (image/* only)
- Submit and cancel buttons
- Form validation with error messages

### Employee Details Page (`/employees/:id`)
- Display all employee information
- Show employee photo
- Back button to employee list
- Edit and delete buttons

### Navigation Bar
- Logo/title
- Current user display (if authenticated)
- Logout button (clears token, redirects to login)
- Active route highlighting

## API Integration

### Axios Configuration
- Base URL: `http://localhost:3000/api` (proxied through nginx to backend)
- Authorization header: `Bearer <token>` automatically injected from localStorage
- Content-Type: application/json

### API Functions (employees.js)

```javascript
// Get all employees
fetchEmployees()

// Get single employee
fetchEmployee(id)

// Create employee
createEmployee(formData)  // multipart/form-data for photo

// Update employee
updateEmployee(id, formData)

// Delete employee
deleteEmployee(id)

// Search employees
searchEmployees(department, position)
```

## Authentication Flow

1. User signs up/logs in
2. Backend returns JWT token
3. Token stored in `localStorage.token`
4. Axios interceptor automatically adds token to all requests
5. Protected routes check for token, redirect to login if missing
6. Logout clears token from localStorage

## Environment Variables

Create `.env` file:

```
REACT_APP_API_URL=http://localhost:3000/api
```

For Docker, this is automatically set in the Dockerfile build process.

## Docker Build

The frontend is built using a multi-stage Dockerfile:

1. **Build Stage**: Node.js Alpine compiles React app
2. **Runtime Stage**: Nginx Alpine serves static files
   - Nginx proxies `/api` requests to backend
   - React Router handled with `try_files` directive

### Build Locally
```bash
docker build -t frontend:latest -f frontend/Dockerfile .
```

### Run Container
```bash
docker run -p 3000:80 frontend:latest
```

## Nginx Configuration

The `nginx.conf` file:
- Proxies `/api/*` requests to backend (http://backend:4000/api/)
- Serves React static files for root `/`
- Handles React Router by redirecting unknown routes to `/index.html`

## Error Handling

- Form validation errors displayed inline
- API errors caught and displayed in UI
- Network errors show user-friendly messages
- Unauthorized (401) errors redirect to login

## Dependencies

Key packages (see package.json):
- `react`: UI library
- `react-router-dom`: Client-side routing
- `axios`: HTTP client
- `@tanstack/react-query`: Data fetching
- `@mui/material`: UI components
- `@mui/icons-material`: Icons

## Common Issues

### API Requests Failing
- Verify backend is running and accessible
- Check that token is saved in localStorage
- Inspect browser console for error details

### Routes Not Working
- Ensure React Router is properly configured
- Check PrivateRoute implementation
- Clear localStorage and try again

### Photo Upload Not Working
- Verify file is image/* MIME type
- Check backend uploads directory permissions
- Ensure form is sent as multipart/form-data

## Testing Checklist

- [ ] Signup with new email
- [ ] Login with credentials
- [ ] View employee list
- [ ] Add new employee
- [ ] Upload employee photo
- [ ] Edit employee details
- [ ] Search by department
- [ ] Search by position
- [ ] Delete employee
- [ ] Logout

## Author
Daniel - COMP3123 Assignment 2

## License
MIT
