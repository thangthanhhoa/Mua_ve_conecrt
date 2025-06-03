import { useState } from 'react'
import './CustomerForm.css'

const CustomerForm = ({ onNext, events }) => {
  const [formData, setFormData] = useState({
    event: events[0]?.event_id || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(formData.event)
  }

  return (
    <div className="customer-form">
      <h2>Thông Tin Đặt Vé</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sự kiện:</label>
          <select value={formData.event} onChange={e => setFormData({ ...formData, event: e.target.value })} required>
            {events.map(ev => (
              <option key={ev.event_id} value={ev.event_id}>{ev.name} - {ev.time}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Tiếp Tục</button>
      </form>
    </div>
  )
}

export default CustomerForm 
