import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// API cho khách hàng
export const customerApi = {
  // Đặt vé
  bookTicket: async (ticketData) => {
    try {
      const response = await axios.post(`${API_URL}/tickets/book`, ticketData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Xem danh sách vé đã đặt
  getMyTickets: async (customerId) => {
    try {
      const response = await axios.get(`${API_URL}/tickets/customer/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Hủy vé
  cancelTicket: async (ticketId) => {
    try {
      const response = await axios.post(`${API_URL}/tickets/${ticketId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// API cho nhân viên
export const employeeApi = {
  // Xem danh sách vé
  getAllTickets: async () => {
    try {
      const response = await axios.get(`${API_URL}/tickets`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Xác nhận thanh toán
  confirmPayment: async (ticketId) => {
    try {
      const response = await axios.post(`${API_URL}/tickets/${ticketId}/payment`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Xác nhận check-in
  confirmCheckIn: async (ticketId) => {
    try {
      const response = await axios.post(`${API_URL}/tickets/${ticketId}/checkin`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Tìm kiếm vé
  searchTickets: async (searchParams) => {
    try {
      const response = await axios.get(`${API_URL}/tickets/search`, { params: searchParams });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Thêm sự kiện
  addEvent: async (eventData) => {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  },

  // Sửa sự kiện
  updateEvent: async (eventId, eventData) => {
    const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
    return response.data;
  },

  // Xóa sự kiện
  deleteEvent: async (eventId) => {
    const response = await axios.delete(`${API_URL}/events/${eventId}`);
    return response.data;
  }
};

// API chung
export const commonApi = {
  // Lấy thông tin sự kiện
  getEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy thông tin ghế
  getSeats: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}/seats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 