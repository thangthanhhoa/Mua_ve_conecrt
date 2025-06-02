import api from './api';

export const employeeService = {
    // Lấy danh sách nhân viên
    getAllEmployees: async () => {
        try {
            const response = await api.get('/employees');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy thông tin chi tiết nhân viên
    getEmployeeById: async (id) => {
        try {
            const response = await api.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo nhân viên mới
    createEmployee: async (employeeData) => {
        try {
            const response = await api.post('/employees', employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật thông tin nhân viên
    updateEmployee: async (id, employeeData) => {
        try {
            const response = await api.put(`/employees/${id}`, employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Xóa nhân viên
    deleteEmployee: async (id) => {
        try {
            const response = await api.delete(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy thông tin profile của nhân viên hiện tại
    getCurrentEmployeeProfile: async () => {
        try {
            const response = await api.get('/employees/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 