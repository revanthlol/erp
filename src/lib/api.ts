import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject Token if present
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Session Timeouts (401)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If backend returns 401 Unauthorized (Session dead, invalid token, or Server Restarted)
    if (error.response?.status === 401) {
      // Avoid redirect loop if we are already on login
      if (!window.location.pathname.includes('/login')) {
        authApi.logout();
      }
    }
    return Promise.reject(error);
  }
);

// Central Data Access Object
export const authApi = {
  // Login
  login: async (credentials: { rollNo: string; password: string }) => {
    const { data } = await api.post('/login', credentials);
    return data;
  },
  
  // Dashboard / Profile
  getProfile: async () => {
    const { data } = await api.get('/student/profile');
    return data;
  },

  // Subjects Page
  getSubjects: async () => {
    const { data } = await api.get('/student/subjects');
    return data;
  },

  // Attendance Page
  getAttendance: async () => {
    const { data } = await api.get('/student/attendance');
    return data;
  },

  // Hour-Wise Page
  getHourWiseAttendance: async () => {
    const { data } = await api.get('/student/attendance/hourly');
    return data;
  },

  // Internal Marks
  getInternals: async () => {
    const { data } = await api.get('/student/internals');
    return data;
  },

  // Exam Marks
  getExams: async () => {
    const { data } = await api.get('/student/exams');
    return data;
  },

  // Generic pass-through
  get: async (url: string) => {
      const { data } = await api.get(url);
      return data;
  },

  // Logout - Explicitly cleans everything
  logout: () => {
    console.warn("Logging out due to session termination...");
    localStorage.removeItem('auth_token'); // Backend Token
    localStorage.removeItem('erp-auth');   // Legacy Guard
    
    // Redirect logic: window.location is safer for clearing global app state than react-router here
    window.location.href = '/login';
  }
};

export default api;