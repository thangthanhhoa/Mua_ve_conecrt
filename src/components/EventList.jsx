import React from 'react';
import './EventList.css';

const mockEvents = [
  { event_id: 1, name: 'Bolero Night', time: '2024-07-15 20:00', description: 'Đêm nhạc Bolero với các ca sĩ nổi tiếng.' },
  { event_id: 2, name: 'Rock Show', time: '2024-08-10 19:30', description: 'Bùng nổ cùng đêm nhạc Rock.' },
  { event_id: 3, name: 'Acoustic Evening', time: '2024-09-05 18:00', description: 'Không gian acoustic nhẹ nhàng, lãng mạn.' },
];

const EventList = ({ onSelectEvent }) => {
  return (
    <div className="event-list-container">
      <h2>Danh Sách Sự Kiện</h2>
      <div className="event-list">
        {mockEvents.map(ev => (
          <div className="event-card" key={ev.event_id}>
            <h3>{ev.name}</h3>
            <p><b>Thời gian:</b> {ev.time}</p>
            <p>{ev.description}</p>
            {onSelectEvent && (
              <button className="detail-btn" onClick={() => onSelectEvent(ev)}>
                Xem chi tiết
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList; 