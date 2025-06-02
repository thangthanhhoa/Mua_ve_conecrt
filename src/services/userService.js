import api from './api';

export const userService = {
    // Đăng ký
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Đăng nhập
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Đăng xuất
    logout: () => {
        localStorage.removeItem('token');
    },

    // Lấy thông tin user hiện tại
    getCurrentUser: async () => {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật thông tin user
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/users/profile', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Đổi mật khẩu
    changePassword: async (passwordData) => {
        try {
            const response = await api.put('/users/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 