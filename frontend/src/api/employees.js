import api from './axios';

export const fetchEmployees = async () => {
  const resp = await api.get('/employees');
  return resp.data;
};

export const fetchEmployee = async (id) => {
  const resp = await api.get(`/employees/${id}`);
  return resp.data;
};

export const createEmployee = async (formData) => {
  const resp = await api.post('/employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return resp.data;
};

export const updateEmployee = async (id, formData) => {
  const resp = await api.put(`/employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return resp.data;
};

export const deleteEmployee = async (id) => {
  const resp = await api.delete(`/employees/${id}`);
  return resp.data;
};

export const searchEmployees = async ({ department, position }) => {
  const params = {};
  if (department) params.department = department;
  if (position) params.position = position;
  const resp = await api.get('/employees/search', { params });
  return resp.data;
};
