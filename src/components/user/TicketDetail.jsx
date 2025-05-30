import React from 'react';
import QRCode from 'qrcode.react';
import './TicketDetail.css';

const TicketDetail = ({ ticket }) => {
  if (!ticket) return <div className="ticket-detail-error">Không tìm thấy vé.</div>;
  return (
    <div className="ticket-detail">
      <h2>Chi Tiết Vé</h2>
      <div><b>Sự kiện:</b> {ticket.eventName}</div>
      <div><b>Ghế:</b> {ticket.seatLabel}</div>
      <div><b>Ngày:</b> {ticket.date}</div>
      <div><b>Trạng thái vé:</b> {ticket.status}</div>
      <div><b>Lịch sử check-in:</b> {ticket.time_checkin || 'Chưa check-in'}</div>
      <div className="qr-section">
        <QRCode value={ticket.code || ticket.id.toString()} size={120} />
        <div style={{fontSize:12, color:'#888'}}>Mã QR vé</div>
      </div>
    </div>
  );
};

export default TicketDetail; 