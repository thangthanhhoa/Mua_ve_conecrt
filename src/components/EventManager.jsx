import React, { useEffect, useState } from 'react';
import { employeeApi } from '../api/ticketApi';
import './EventManager.css';

const emptyEvent = { 
  name: '', 
  time: '', 
  location: '', 
  description: '',
  price: '',
  total_seats: ''
};

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEvent);

  // Load danh sách sự kiện
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await employeeApi.getAllTickets();
      setEvents(res);
    } catch (error) {
      console.error('Error loading events:', error);
      alert('Không thể tải danh sách sự kiện');
    }
  };

  // Thêm hoặc cập nhật sự kiện
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await employeeApi.updateEvent(editing, form);
      } else {
        await employeeApi.addEvent(form);
      }
      setForm(emptyEvent);
      setEditing(null);
      loadEvents();
      alert(editing ? 'Cập nhật thành công!' : 'Thêm sự kiện thành công!');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Có lỗi xảy ra khi lưu sự kiện');
    }
  };

  // Xóa sự kiện
  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sự kiện này?')) {
      try {
        await employeeApi.deleteEvent(id);
        loadEvents();
        alert('Xóa sự kiện thành công!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Có lỗi xảy ra khi xóa sự kiện');
      }
    }
  };

  // Sửa sự kiện
  const handleEdit = (event) => {
    setForm(event);
    setEditing(event.event_id);
  };

  return (
    <div className="event-manager">
      <h2>Quản lý sự kiện</h2>
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Tên sự kiện"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="datetime-local"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            placeholder="Thời gian"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="Địa điểm"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            placeholder="Giá vé"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            value={form.total_seats}
            onChange={e => setForm({ ...form, total_seats: e.target.value })}
            placeholder="Tổng số ghế"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Mô tả sự kiện"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editing ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {editing && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => { setEditing(null); setForm(emptyEvent); }}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="events-list">
        <h3>Danh sách sự kiện</h3>
        <table>
          <thead>
            <tr>
              <th>Tên sự kiện</th>
              <th>Thời gian</th>
              <th>Địa điểm</th>
              <th>Giá vé</th>
              <th>Số ghế</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.event_id}>
                <td>{ev.name}</td>
                <td>{new Date(ev.time).toLocaleString()}</td>
                <td>{ev.location}</td>
                <td>{ev.price.toLocaleString('vi-VN')} VNĐ</td>
                <td>{ev.total_seats}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(ev)}
                    className="btn-edit"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(ev.event_id)}
                    className="btn-delete"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 