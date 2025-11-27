import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', resp.data.token);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 480, margin: '40px auto' }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={submit}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Paper>
  );
}
