import { useState } from 'react'
import './CustomerForm.css'

const CustomerForm = ({ onNext, events, seatRows }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: events[0]?.event_id || '',
    row: seatRows[0] || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <div className="customer-form">
      <h2>Thông Tin Đặt Vé</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ tên:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Họ tên"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Số Điện Thoại:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            placeholder="Số điện thoại"
          />
        </div>
        <div className="form-group">
          <label>Sự kiện:</label>
          <select value={formData.event} onChange={e => setFormData({ ...formData, event: e.target.value })} required>
            {events.map(ev => (
              <option key={ev.event_id} value={ev.event_id}>{ev.name} - {ev.time}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Hạng ghế:</label>
          <select value={formData.row} onChange={e => setFormData({ ...formData, row: e.target.value })} required>
            {seatRows.map(row => (
              <option key={row} value={row}>Hạng {row}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Tiếp Tục</button>
      </form>
    </div>
  )
}

export default CustomerForm 
