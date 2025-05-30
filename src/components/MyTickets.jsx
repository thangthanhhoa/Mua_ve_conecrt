import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import './MyTickets.css';

const getEventStatus = (eventDate) => {
  const now = new Date();
  const eventTime = new Date(eventDate);
  return eventTime > now ? 'Sắp diễn ra' : 'Đã kết thúc';
};

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [reviewingId, setReviewingId] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

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

  const handleReview = (ticketId) => {
    // Gửi đánh giá (giả lập)
    alert(`Đã gửi đánh giá: ${rating} sao, nhận xét: ${review}`);
    setReviewingId(null);
    setReview('');
    setRating(5);
  };

  if (tickets.length === 0) {
    return <div className="my-tickets-empty">Bạn chưa có vé nào.</div>;
  }

  return (
    <div className="my-tickets-container">
      <h2>Vé Đã Mua</h2>
      <div className="ticket-list">
        {tickets.map(ticket => {
          const eventStatus = getEventStatus(ticket.date);
          return (
            <div className="ticket-card" key={ticket.id}>
              <p><b>Sự kiện:</b> {ticket.eventName}</p>
              <p><b>Ghế:</b> {ticket.seatLabel}</p>
              <p><b>Ngày:</b> {ticket.date}</p>
              <p><b>Trạng thái vé:</b> {ticket.status || 'Đã đặt'}</p>
              <p><b>Trạng thái sự kiện:</b> {eventStatus}</p>
              {ticket.time_checkin && (
                <p><b>Lịch sử check-in:</b> {ticket.time_checkin}</p>
              )}
              <div className="qr-section">
                <QRCode value={ticket.code || ticket.id.toString()} size={100} />
                <div style={{fontSize:12, color:'#888'}}>Mã QR vé</div>
              </div>
              <div className="ticket-actions">
                <button className="edit-btn" onClick={() => handleEdit(ticket.id)}>Sửa</button>
                <button className="cancel-btn" onClick={() => handleCancel(ticket.id)}>Hủy vé</button>
              </div>
              {/* Đánh giá sự kiện nếu đã kết thúc và chưa đánh giá */}
              {eventStatus === 'Đã kết thúc' && !ticket.reviewed && (
                <div className="review-section">
                  {reviewingId === ticket.id ? (
                    <div>
                      <div>
                        <span>Đánh giá: </span>
                        {[1,2,3,4,5].map(star => (
                          <span key={star} style={{color:star<=rating?'#ffd700':'#ccc',fontSize:20,cursor:'pointer'}} onClick={()=>setRating(star)}>★</span>
                        ))}
                      </div>
                      <textarea value={review} onChange={e=>setReview(e.target.value)} placeholder="Nhận xét..." rows={2} style={{width:'100%',margin:'8px 0'}} />
                      <button onClick={()=>handleReview(ticket.id)}>Gửi đánh giá</button>
                      <button onClick={()=>setReviewingId(null)} style={{marginLeft:8,background:'#bbb'}}>Hủy</button>
                    </div>
                  ) : (
                    <button className="review-btn" onClick={()=>setReviewingId(ticket.id)}>Đánh giá sự kiện</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTickets; 