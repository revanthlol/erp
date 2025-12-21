import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
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
    // If session is dead (401)
    if (error.response?.status === 401) {
      const isLogin = window.location.pathname.includes('/login');
      
      // ONLY dispatch event if we aren't already at login
      if (!isLogin) {
          // Fire the event for the UI to pick up
          window.dispatchEvent(new Event("auth:session-expired"));
          
          // DO NOT call authApi.logout() here. 
          // DO NOT clear localStorage here. 
          // This keeps the user on the current page so they see the Dialog.
      }
    }
    // Propagate error so component stops loading spinners
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
    window.location.href = '/login';
  },
  getProxyImageUrl: (originalUrl?: string) => {
      if (!originalUrl) return undefined;
      const token = localStorage.getItem('auth_token');
      if (!token) return originalUrl;
      
      // Clean duplicate /api if present (just in case) or simple concat
      const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      
      return `${baseUrl}/proxy/image?token=${token}&url=${encodeURIComponent(originalUrl)}`;
  }
};
export default api;