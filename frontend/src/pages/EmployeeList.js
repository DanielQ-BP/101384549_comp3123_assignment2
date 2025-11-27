import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchEmployees, deleteEmployee, searchEmployees } from '../api/employees';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Stack } from '@mui/material';

export default function EmployeeList() {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: employees = [], isLoading } = useQuery(['employees'], fetchEmployees);

  const deleteMut = useMutation(id => deleteEmployee(id), {
    onSuccess: () => qc.invalidateQueries(['employees'])
  });

  const onSearch = async (e) => {
    e?.preventDefault();
    if (!department && !position) {
      qc.invalidateQueries(['employees']);
      return;
    }
    const data = await searchEmployees({ department, position });
    qc.setQueryData(['employees'], data);
  };

  return (
    <div>
      <Stack direction="row" spacing={2} mb={2} alignItems="center">
        <Button variant="contained" onClick={() => navigate('/employees/add')}>Add Employee</Button>
        <TextField label="Department" size="small" value={department} onChange={e => setDepartment(e.target.value)} />
        <TextField label="Position" size="small" value={position} onChange={e => setPosition(e.target.value)} />
        <Button variant="outlined" onClick={onSearch}>Search</Button>
        <Button onClick={() => { setDepartment(''); setPosition(''); qc.invalidateQueries(['employees']); }}>Reset</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp._id}>
                <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => navigate(`/employees/${emp._id}`)}>View</Button>
                  <Button size="small" onClick={() => navigate(`/employees/${emp._id}/edit`)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => deleteMut.mutate(emp._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
