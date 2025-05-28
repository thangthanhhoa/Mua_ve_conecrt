import { useState } from 'react';

const mockTickets = [
  { code: 'ABC123', name: 'Nguyễn Văn A', event: 'Đêm Nhạc Hòa Tấu', seat: 'A1', status: 'Chưa check-in' },
  { code: 'XYZ789', name: 'Trần Thị B', event: 'Đêm Nhạc Hòa Tấu', seat: 'B2', status: 'Đã check-in' },
];

const TicketCheckIn = () => {
  const [code, setCode] = useState('');
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const found = mockTickets.find(t => t.code === code.trim().toUpperCase());
    setTicket(found || null);
    setMessage('');
    if (!found) setMessage('Không tìm thấy vé!');
  };

  const handleCheckIn = () => {
    if (!ticket) return;
    if (ticket.status === 'Đã check-in') {
      setMessage('Vé này đã được check-in trước đó!');
      return;
    }
    ticket.status = 'Đã check-in';
    setMessage('Check-in thành công!');
    setTicket({ ...ticket });
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(30,60,114,0.10)' }}>
      <h2 style={{ textAlign: 'center', color: '#2a5298', marginBottom: 24 }}>Xác nhận vé (Check-in)</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nhập mã vé hoặc quét QR"
          value={code}
          onChange={e => setCode(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #bbb' }}
          required
        />
        <button type="submit" style={{ padding: '10px 18px', background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold' }}>Tìm</button>
      </form>
      {ticket && (
        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 18, marginBottom: 16 }}>
          <div><b>Khách:</b> {ticket.name}</div>
          <div><b>Sự kiện:</b> {ticket.event}</div>
          <div><b>Ghế:</b> {ticket.seat}</div>
          <div><b>Trạng thái:</b> <span style={{ color: ticket.status === 'Đã check-in' ? 'green' : '#2a5298' }}>{ticket.status}</span></div>
          {ticket.status === 'Chưa check-in' && (
            <button onClick={handleCheckIn} style={{ marginTop: 16, width: '100%', background: '#4caf50', color: 'white', padding: 10, border: 'none', borderRadius: 6, fontWeight: 'bold' }}>Xác nhận check-in</button>
          )}
        </div>
      )}
      {message && <div style={{ color: message.includes('thành công') ? 'green' : 'red', textAlign: 'center', marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default TicketCheckIn; 