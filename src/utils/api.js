import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage (implement this when connecting to backend)
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================
export const authAPI = {
  login: (email, password) => api.post('/auth/login/', { email, password }),
  register: (data) => api.post('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
  changePassword: (data) => api.post('/auth/change-password/', data),
};

// ==================== APPOINTMENTS API ====================
export const appointmentsAPI = {
  getAll: () => api.get('/appointments/'),
  getById: (id) => api.get(`/appointments/${id}/`),
  create: (data) => api.post('/appointments/', data),
  update: (id, data) => api.put(`/appointments/${id}/`, data),
  cancel: (id) => api.patch(`/appointments/${id}/cancel/`),
  confirm: (id) => api.patch(`/appointments/${id}/confirm/`),
  complete: (id) => api.patch(`/appointments/${id}/complete/`),
  getMyAppointments: () => api.get('/appointments/my/'),
  getDoctorAppointments: () => api.get('/appointments/doctor/'),
};

// ==================== MEDICAL RECORDS API ====================
export const recordsAPI = {
  getAll: () => api.get('/medical-records/'),
  getById: (id) => api.get(`/medical-records/${id}/`),
  getByPatient: (patientId) => api.get(`/medical-records/?patient=${patientId}`),
  create: (data) => api.post('/medical-records/', data),
  update: (id, data) => api.put(`/medical-records/${id}/`, data),
  getMyRecords: () => api.get('/medical-records/my/'),
};

// ==================== PRESCRIPTIONS API ====================
export const prescriptionsAPI = {
  getByRecord: (recordId) => api.get(`/prescriptions/?medical_record=${recordId}`),
  create: (data) => api.post('/prescriptions/', data),
  update: (id, data) => api.put(`/prescriptions/${id}/`, data),
  delete: (id) => api.delete(`/prescriptions/${id}/`),
};

// ==================== DOCTORS API ====================
export const doctorsAPI = {
  getAll: () => api.get('/doctors/'),
  getById: (id) => api.get(`/doctors/${id}/`),
  getAvailable: () => api.get('/doctors/?is_available=true'),
};

// ==================== HEALTH INFO API ====================
export const healthInfoAPI = {
  getAll: () => api.get('/health-info/'),
  getById: (id) => api.get(`/health-info/${id}/`),
  getByCategory: (category) => api.get(`/health-info/?category=${category}`),
  create: (data) => api.post('/health-info/', data),
  update: (id, data) => api.put(`/health-info/${id}/`, data),
  delete: (id) => api.delete(`/health-info/${id}/`),
};

// ==================== NOTIFICATIONS API ====================
export const notificationsAPI = {
  getAll: () => api.get('/notifications/'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read/`),
  markAllAsRead: () => api.post('/notifications/read-all/'),
  getUnreadCount: () => api.get('/notifications/unread-count/'),
};

// ==================== ADMIN API ====================
export const adminAPI = {
  getStats: () => api.get('/admin/stats/'),
  getUsers: () => api.get('/admin/users/'),
  getUserById: (id) => api.get(`/admin/users/${id}/`),
  createUser: (data) => api.post('/admin/users/', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}/`, data),
  deactivateUser: (id) => api.patch(`/admin/users/${id}/deactivate/`),
  getAllAppointments: () => api.get('/admin/appointments/'),
  getSystemLogs: () => api.get('/admin/logs/'),
};

export default api;
