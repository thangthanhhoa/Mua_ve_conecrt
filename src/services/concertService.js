import api from './api';

export const concertService = {
    // Lấy danh sách concert
    getAllConcerts: async () => {
        try {
            const response = await api.get('/concerts');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết concert
    getConcertById: async (id) => {
        try {
            const response = await api.get(`/concerts/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo concert mới
    createConcert: async (concertData) => {
        try {
            const response = await api.post('/concerts', concertData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật concert
    updateConcert: async (id, concertData) => {
        try {
            const response = await api.put(`/concerts/${id}`, concertData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Xóa concert
    deleteConcert: async (id) => {
        try {
            const response = await api.delete(`/concerts/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tìm kiếm concert
    searchConcerts: async (searchParams) => {
        try {
            const response = await api.get('/concerts/search', { params: searchParams });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 