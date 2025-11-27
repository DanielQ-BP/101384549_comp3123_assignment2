import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <div>
      <NavBar />
      <Container className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
          <Route path="/employees/add" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
          <Route path="/employees/:id/edit" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
          <Route path="/employees/:id" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} />

          <Route path="/" element={<Navigate to="/employees" replace />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
