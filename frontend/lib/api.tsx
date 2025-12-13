import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface Vacancy {
  id: number;
  title: string;
  position: string;
  employment_type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Intern';
  location?: string;
  is_remote?: boolean;
  description: string;
  salary_min?: number;
  salary_max?: number;
}

export const fetchVacancies = async (q?: string) => {
  const { data } = await api.get('/vacancies', { params: { q } });
  return data;
};

export const fetchVacancy = async (id: string) => {
  const { data } = await api.get(`/vacancies/${id}`);
  return data;
};

export const createVacancy = async (payload: Partial<Vacancy>) => {
  const { data } = await api.post('/vacancies', payload);
  return data;
};