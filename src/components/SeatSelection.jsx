// Import file CSS cho component
import './SeatSelection.css'

// Component SeatSelection nhận vào các props: seats, selectedSeats, onSelect, stage
const SeatSelection = ({ seats, selectedSeats, onSelect, stage }) => {
  // stage: { row: số hàng, col: số cột }
  // seats: [{ stage_seat_id, row, col, price, status }]

  // Tạo map theo hàng
  const rows = {};
  seats.forEach(seat => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  return (
    <div className="seat-map-container">
      <div className="stage">SÂN KHẤU</div>
      <div className="seat-map">
        {Object.keys(rows).map(row => (
          <div className="seat-row" key={row}>
            <span className="row-label">{row}</span>
            {rows[row].map(seat => {
              const isSelected = selectedSeats.some(s => s.stage_seat_id === seat.stage_seat_id);
              return (
                <button
                  key={seat.stage_seat_id}
                  className={`seat-btn ${seat.status} ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelect(seat)}
                  disabled={seat.status === 'sold'}
                >
                  {seat.col}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="seat-btn open"></span> Trống
        <span className="seat-btn selected"></span> Đang chọn
        <span className="seat-btn sold"></span> Đã bán
      </div>
    </div>
  )
}

// Export component
export default SeatSelection 