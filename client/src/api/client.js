import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${BASE}/api/produucts`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getProducts(params) {
  const res = await api.get('/', { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await api.get(`/${id}`);
  return res.data;
}

export async function searchProducts(query) {
  const res = await api.get('/search', { params: { q: query } });
  return res.data;
}

export async function createProduct(data) {
  const res = await api.post('/', data);
  return res.data;
}

export async function login(email, password) {
  const res = await axios.post(`${BASE}/api/auth/login`, { email, password });
  return res.data;
}

export async function register(email, password, name) {
  const res = await axios.post(`${BASE}/api/auth/register`, { email, password, name });
  return res.data;
}

export async function checkout(items, shippingAddress) {
  const res = await axios.post(`${BASE}/api/checkout`, { items, shippingAddress });
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(`${BASE}/api/admin/products/${id}`);
  return res.data;
}

export default api;
