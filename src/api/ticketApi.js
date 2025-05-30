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

// API endpoints cho ứng dụng bán vé concert

// API cho người dùng
export const userApi = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Lấy thông tin người dùng
  getProfile: async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Cập nhật thông tin người dùng
  updateProfile: async (userId, userData) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Đổi mật khẩu
  changePassword: async (userId, passwordData) => {
    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
};

// API cho sự kiện
export const eventApi = {
  // Lấy danh sách sự kiện
  getEvents: async () => {
    try {
      const response = await fetch('/api/events');
      return await response.json();
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  // Lấy chi tiết sự kiện
  getEventById: async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting event details:', error);
      throw error;
    }
  },

  // Tạo sự kiện mới
  createEvent: async (eventData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Cập nhật sự kiện
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Xóa sự kiện
  deleteEvent: async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

// API cho vé
export const ticketApi = {
  // Lấy danh sách vé
  getTickets: async () => {
    try {
      const response = await fetch('/api/tickets');
      return await response.json();
    } catch (error) {
      console.error('Error getting tickets:', error);
      throw error;
    }
  },

  // Lấy chi tiết vé
  getTicketById: async (ticketId) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting ticket details:', error);
      throw error;
    }
  },

  // Tạo vé mới
  createTicket: async (ticketData) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái vé
  updateTicketStatus: async (ticketId, status) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating ticket status:', error);
      throw error;
    }
  },

  // Check-in vé
  checkInTicket: async (ticketId) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/check-in`, {
        method: 'PUT'
      });
      return await response.json();
    } catch (error) {
      console.error('Error checking in ticket:', error);
      throw error;
    }
  }
};

// API cho nhân viên
export const employeeApi = {
  // Đăng nhập nhân viên
  login: async (credentials) => {
    try {
      const response = await fetch('/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in employee:', error);
      throw error;
    }
  },

  // Lấy thông tin nhân viên
  getProfile: async (employeeId) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting employee profile:', error);
      throw error;
    }
  },

  // Cập nhật thông tin nhân viên
  updateProfile: async (employeeId, employeeData) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating employee profile:', error);
      throw error;
    }
  },

  // Lấy danh sách vé cần xử lý
  getPendingTickets: async () => {
    try {
      const response = await fetch('/api/employees/tickets/pending');
      return await response.json();
    } catch (error) {
      console.error('Error getting pending tickets:', error);
      throw error;
    }
  },

  // Xác nhận thanh toán vé
  confirmPayment: async (ticketId) => {
    try {
      const response = await fetch(`/api/employees/tickets/${ticketId}/confirm-payment`, {
        method: 'PUT'
      });
      return await response.json();
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  },

  // Xác nhận check-in vé
  confirmCheckIn: async (ticketId) => {
    try {
      const response = await fetch(`/api/employees/tickets/${ticketId}/confirm-check-in`, {
        method: 'PUT'
      });
      return await response.json();
    } catch (error) {
      console.error('Error confirming check-in:', error);
      throw error;
    }
  }
};

// API cho admin
export const adminApi = {
  // Quản lý người dùng
  getUsers: async () => {
    try {
      const response = await fetch('/api/admin/users');
      return await response.json();
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Quản lý nhân viên
  getEmployees: async () => {
    try {
      const response = await fetch('/api/admin/employees');
      return await response.json();
    } catch (error) {
      console.error('Error getting employees:', error);
      throw error;
    }
  },

  // Quản lý sự kiện
  getEvents: async () => {
    try {
      const response = await fetch('/api/admin/events');
      return await response.json();
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  // Quản lý vé
  getTickets: async () => {
    try {
      const response = await fetch('/api/admin/tickets');
      return await response.json();
    } catch (error) {
      console.error('Error getting tickets:', error);
      throw error;
    }
  },

  // Thống kê
  getStatistics: async () => {
    try {
      const response = await fetch('/api/admin/statistics');
      return await response.json();
    } catch (error) {
      console.error('Error getting statistics:', error);
      throw error;
    }
  }
};

// API chung
export const commonApi = {
  // Lấy danh sách sự kiện công khai
  getEvents: async () => {
    try {
      const response = await fetch('/api/events/public');
      return await response.json();
    } catch (error) {
      console.error('Error getting public events:', error);
      throw error;
    }
  },

  // Lấy danh sách địa điểm
  getVenues: async () => {
    try {
      const response = await fetch('/api/venues');
      return await response.json();
    } catch (error) {
      console.error('Error getting venues:', error);
      throw error;
    }
  },

  // Lấy danh sách loại vé
  getTicketTypes: async () => {
    try {
      const response = await fetch('/api/ticket-types');
      return await response.json();
    } catch (error) {
      console.error('Error getting ticket types:', error);
      throw error;
    }
  }
}; 