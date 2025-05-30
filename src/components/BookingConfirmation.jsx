import React from 'react';
import QRCode from 'qrcode.react';

const BookingConfirmation = ({ customer, event, selectedSeats, onConfirm, ticketCode, showInvoice, onDownloadInvoice }) => {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
    return (
      <div>
        <h2>Xác Nhận Đặt Vé</h2>
        <p>Email: {customer.email}</p>
        <p>Điện thoại: {customer.phone}</p>
        <p>Sự kiện: {event.name} - {event.time}</p>
        <ul>
          {selectedSeats.map(seat => (
            <li key={seat.stage_seat_id}>{seat.row}{seat.col} - {seat.price}đ</li>
          ))}
        </ul>
        <p><b>Tổng tiền: {total}đ</b></p>
        <button onClick={onConfirm}>Xác nhận đặt vé</button>
        {ticketCode && (
          <div style={{marginTop:24, textAlign:'center'}}>
            <h3>Vé điện tử (e-ticket)</h3>
            <QRCode value={ticketCode} size={160} />
            <div style={{fontSize:12, color:'#888', marginTop:8}}>Mã QR vé - trình tại cổng check-in</div>
          </div>
        )}
        {showInvoice && (
          <div style={{marginTop:16, textAlign:'center'}}>
            <button onClick={onDownloadInvoice} style={{background:'#1976d2'}}>Tải hóa đơn</button>
          </div>
        )}
      </div>
    );
  };
  
  export default BookingConfirmation;