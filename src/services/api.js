import axios from 'axios';

// Tạo instance axios với cấu hình cơ bản
const api = axios.create({
    // Kết nối với .NET backend ở D:\StageShowAPI
    baseURL: 'http://localhost:5264/api', // đường link của ba
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Thêm interceptor để xử lý token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // .NET thường sử dụng Bearer tokenimage.pngimage
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor để xử lý response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Xử lý khi token hết hạn
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const concertAPI = {
    getAll: () => api.get('/Concert'),
    getById: (id) => api.get(`/Concert/${id}`),
    create: (data) => api.post('/Concert', data),
    update: (id, data) => api.put(`/Concert/${id}`, data),
    delete: (id) => api.delete(`/Concert/${id}`)
};

export const userAPI = {
    login: (credentials) => api.post('/Users/login', credentials),
    register: (userData) => api.post('/Users/register', userData),
    getProfile: () => api.get('/Users/profile'),
    updateProfile: (data) => api.put('/Users/profile', data)
};

export const employeeAPI = {
    getAll: () => api.get('/Employee'),
    getById: (id) => api.get(`/Employee/${id}`),
    create: (data) => api.post('/Employee', data),
    update: (id, data) => api.put(`/Employee/${id}`, data),
    delete: (id) => api.delete(`/Employee/${id}`)
};

export default api; 


