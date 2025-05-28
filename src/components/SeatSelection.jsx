// Import file CSS cho component
import './SeatSelection.css'

// Component SeatSelection nhận vào các props: seats, selectedSeats, onSelect, stage
const SeatSelection = ({ seats, selectedSeats, onSelect, stage }) => {
  // stage: { row: số hàng, col: số cột }
  // seats: [{ stage_seat_id, row, col, price, status }]

  // Vẽ 1 hàng ghế cho hạng đã chọn
  const renderRow = () => {
    return (
      <div className="seat-row">
        {seats.sort((a, b) => a.col - b.col).map(seat => (
          <button
            key={seat.stage_seat_id}
            disabled={seat.status !== 'open'}
            className={`seat${selectedSeats.includes(seat.stage_seat_id) ? ' selected' : ''}${seat.status !== 'open' ? ' sold' : ''}`}
            onClick={() => onSelect(seat)}
          >
            {seat.row}{seat.col}
          </button>
        ))}
      </div>
    )
  }

  // Render component
  return (
    <div>
      <h2>Chọn Ghế</h2>
      <div className="seats">
        {renderRow()}
      </div>
    </div>
  )
}

// Export component
export default SeatSelection 