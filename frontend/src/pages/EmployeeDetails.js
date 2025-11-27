import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Stack } from '@mui/material';
import { fetchEmployee } from '../api/employees';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee(id).then(setEmployee).catch(e => setError(e.message));
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ padding: 3, maxWidth: 800, margin: '20px auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">{employee.firstName} {employee.lastName}</Typography>
        {employee.photoUrl && <img src={employee.photoUrl.startsWith('http') ? employee.photoUrl : `http://localhost:4000${employee.photoUrl}`} alt="photo" style={{ maxWidth: 200 }} />}
        <Typography><strong>Email:</strong> {employee.email}</Typography>
        <Typography><strong>Position:</strong> {employee.position}</Typography>
        <Typography><strong>Department:</strong> {employee.department}</Typography>
        <Typography><strong>Salary:</strong> {employee.salary}</Typography>
        <Typography><strong>Date of joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</Typography>
        <Typography><strong>Phone:</strong> {employee.phone}</Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(`/employees/${id}/edit`)}>Edit</Button>
          <Button onClick={() => navigate('/employees')}>Back</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
