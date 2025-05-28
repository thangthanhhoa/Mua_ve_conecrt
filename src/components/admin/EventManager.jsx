import React, { useState, useEffect } from 'react';
import './EventManager.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', time: '', stage_id: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    // Lấy danh sách sự kiện từ localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.time || !newEvent.stage_id) {
      alert('Vui lòng điền đầy đủ thông tin sự kiện!');
      return;
    }
    const eventToAdd = {
      ...newEvent,
      event_id: Date.now(),
    };
    const updatedEvents = [...events, eventToAdd];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setNewEvent({ name: '', time: '', stage_id: '', description: '' });
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    const updatedEvents = events.map(e => e.event_id === editingEvent.event_id ? { ...newEvent, event_id: editingEvent.event_id } : e);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEditingEvent(null);
    setNewEvent({ name: '', time: '', stage_id: '', description: '' });
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(e => e.event_id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  return (
    <div className="event-manager">
      <h3>Quản lý sự kiện</h3>
      <div className="event-form">
        <input
          type="text"
          placeholder="Tên sự kiện"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="ID Sân khấu"
          value={newEvent.stage_id}
          onChange={(e) => setNewEvent({ ...newEvent, stage_id: e.target.value })}
        />
        <textarea
          placeholder="Mô tả"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        {editingEvent ? (
          <button onClick={handleUpdateEvent}>Cập nhật sự kiện</button>
        ) : (
          <button onClick={handleAddEvent}>Thêm sự kiện</button>
        )}
      </div>
      <div className="event-list">
        <h4>Danh sách sự kiện</h4>
        {events.map(event => (
          <div key={event.event_id} className="event-item">
            <h5>{event.name}</h5>
            <p>Thời gian: {new Date(event.time).toLocaleString()}</p>
            <p>Sân khấu: {event.stage_id}</p>
            <p>Mô tả: {event.description}</p>
            <div className="event-actions">
              <button onClick={() => handleEditEvent(event)}>Sửa</button>
              <button onClick={() => handleDeleteEvent(event.event_id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManager; 