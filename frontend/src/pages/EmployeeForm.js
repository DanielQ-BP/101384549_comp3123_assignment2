import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';
import { createEmployee, fetchEmployee, updateEmployee } from '../api/employees';

export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', position: '', department: '', salary: '', dateOfJoining: '', phone: '' });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchEmployee(id).then(data => setForm({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        position: data.position || '',
        department: data.department || '',
        salary: data.salary || '',
        dateOfJoining: data.dateOfJoining ? data.dateOfJoining.split('T')[0] : '',
        phone: data.phone || ''
      })).catch(e => setError(e.message));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k => fd.append(k, form[k]));
      if (photo) fd.append('photo', photo);

      if (isEdit) {
        await updateEmployee(id, fd);
      } else {
        await createEmployee(fd);
      }
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 800, margin: '20px auto' }}>
      <Typography variant="h6" mb={2}>{isEdit ? 'Edit Employee' : 'Add Employee'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth />
            <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth />
          </Stack>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
          <Stack direction="row" spacing={2}>
            <TextField label="Position" name="position" value={form.position} onChange={handleChange} fullWidth />
            <TextField label="Department" name="department" value={form.department} onChange={handleChange} fullWidth />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Salary" name="salary" value={form.salary} onChange={handleChange} fullWidth />
            <TextField label="Date Of Joining" name="dateOfJoining" type="date" value={form.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          </Stack>
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">Save</Button>
            <Button variant="outlined" onClick={() => navigate('/employees')}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
