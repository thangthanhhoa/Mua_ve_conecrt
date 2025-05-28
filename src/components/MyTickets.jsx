import React, { useEffect, useState } from 'react';
import './MyTickets.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Lấy vé từ localStorage (giả lập)
    const stored = JSON.parse(localStorage.getItem('myTickets') || '[]');
    setTickets(stored);
  }, []);

  const handleCancel = (ticketId) => {
    if (window.confirm('Bạn chắc chắn muốn hủy vé này?')) {
      const updated = tickets.filter(t => t.id !== ticketId);
      setTickets(updated);
      localStorage.setItem('myTickets', JSON.stringify(updated));
    }
  };

  // Sửa vé: chỉ mock, thực tế sẽ mở form sửa
  const handleEdit = (ticketId) => {
    alert('Chức năng sửa vé sẽ được phát triển!');
  };

  if (tickets.length === 0) {
    return <div className="my-tickets-empty">Bạn chưa có vé nào.</div>;
  }

  return (
    <div className="my-tickets-container">
      <h2>Vé Đã Mua</h2>
      <div className="ticket-list">
        {tickets.map(ticket => (
          <div className="ticket-card" key={ticket.id}>
            <p><b>Sự kiện:</b> {ticket.eventName}</p>
            <p><b>Ghế:</b> {ticket.seatLabel}</p>
            <p><b>Ngày:</b> {ticket.date}</p>
            <p><b>Trạng thái:</b> {ticket.status || 'Đã đặt'}</p>
            <div className="ticket-actions">
              <button className="edit-btn" onClick={() => handleEdit(ticket.id)}>Sửa</button>
              <button className="cancel-btn" onClick={() => handleCancel(ticket.id)}>Hủy vé</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets; 