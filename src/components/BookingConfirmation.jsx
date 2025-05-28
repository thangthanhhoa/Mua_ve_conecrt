const BookingConfirmation = ({ customer, event, selectedSeats, onConfirm }) => {
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
      </div>
    );
  };
  
  export default BookingConfirmation;