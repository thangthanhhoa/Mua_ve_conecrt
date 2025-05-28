import { useState, useEffect } from 'react';
import { employeeApi, commonApi } from '../api/ticketApi';

// Mock vé và khách hàng
const mockTickets = [
  { code: 'ABC123', name: 'Nguyễn Văn A', event: 'Đêm Nhạc Hòa Tấu', seat: 'A1', status: 'Chưa check-in', payment: 'Chưa thanh toán', email: 'a@gmail.com', phone: '0901234567', balance: 1000000 },
  { code: 'XYZ789', name: 'Trần Thị B', event: 'Đêm Nhạc Hòa Tấu', seat: 'B2', status: 'Chưa check-in', payment: 'Chưa thanh toán', email: 'b@gmail.com', phone: '0902345678', balance: 200000 },
  { code: 'DEF456', name: 'Lê Văn C', event: 'Bolero Night', seat: 'C3', status: 'Đã check-in', payment: 'Đã thanh toán', email: 'c@gmail.com', phone: '0903456789', balance: 5000000 },
];

const mockEvents = [
  { event_id: 1, name: 'Bolero Night', time: '2024-07-15 20:00', location: 'Nhà Hát Lớn', description: 'Đêm nhạc Bolero với các ca sĩ nổi tiếng.' },
  { event_id: 2, name: 'Đêm Nhạc Hòa Tấu', time: '2024-08-01 19:30', location: 'Nhà Hát Lớn', description: 'Hòa tấu giao hưởng mùa hè.' },
];

const defaultProfile = { name: 'Nhân viên', email: 'employee@gmail.com', phone: '0900000000', password: 'Emp123!@#' };
const TICKET_PRICE = 500000;

const EmployeeDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('payment');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [profileMsg, setProfileMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eventSearch, setEventSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paymentMsg, setPaymentMsg] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [ticketsData, eventsData] = await Promise.all([
        employeeApi.getAllTickets(),
        commonApi.getEvents()
      ]);
      setTickets(ticketsData);
      setEvents(eventsData);
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Khi xác nhận check-in thật sự
  const handleCheckIn = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleConfirmCheckIn = async () => {
    if (!selectedTicket) return;
    try {
      setLoading(true);
      await employeeApi.confirmCheckIn(selectedTicket.code);
      setTickets(tickets.map(t =>
        t.code === selectedTicket.code ? { ...t, status: 'Đã check-in' } : t
      ));
      setSelectedTicket({ ...selectedTicket, status: 'Đã check-in' });
    } catch (err) {
      setError('Không thể xác nhận check-in. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Thanh toán: mở popup
  const handleOpenPaymentPopup = (ticket) => {
    setSelectedTicket(ticket);
    setShowPaymentPopup(true);
    setPaymentError('');
  };

  // Xác nhận thanh toán thực sự
  const handleConfirmPayment = async () => {
    if (!selectedTicket) return;
    try {
      setLoading(true);
      await employeeApi.confirmPayment(selectedTicket.code);
      setTickets(tickets.map(t =>
        t.code === selectedTicket.code
          ? { ...t, payment: 'Đã thanh toán', balance: t.balance - TICKET_PRICE }
          : t
      ));
      setPaymentMsg('Thanh toán thành công cho vé ' + selectedTicket.code);
      setShowPaymentPopup(false);
      setTimeout(() => setPaymentMsg(''), 2000);
    } catch (err) {
      setPaymentError('Không thể xác nhận thanh toán. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thông tin cá nhân
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileMsg('');
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Implement profile update API
      setProfileMsg('Cập nhật thành công!');
    } catch (err) {
      setProfileMsg('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setProfile({ ...profile, password: e.target.value });
    setProfileMsg('');
  };

  // Lọc sự kiện
  const filteredEvents = events.filter(ev =>
    ev.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
    ev.location.toLowerCase().includes(eventSearch.toLowerCase())
  );

  // Lọc vé chưa thanh toán
  const unpaidTickets = tickets.filter(t => t.payment === 'Chưa thanh toán');

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#2a5298', color: 'white', padding: '32px 0', minHeight: '100vh' }}>
          <div style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 40 }}>Nhân viên</div>
          <div style={{ padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: activeTab === 'payment' ? '#1e3c72' : 'none', borderRadius: 8, marginBottom: 8, textAlign: 'center' }} onClick={() => setActiveTab('payment')}>
              <span style={{ marginRight: 10 }}>💳</span>Thanh toán
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: activeTab === 'checkin' ? '#1e3c72' : 'none', borderRadius: 8, marginBottom: 8, textAlign: 'center' }} onClick={() => { setActiveTab('checkin'); setSelectedTicket(null); }}>
              <span style={{ marginRight: 10 }}>✅</span>Check-in vé
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: activeTab === 'events' ? '#1e3c72' : 'none', borderRadius: 8, marginBottom: 8, textAlign: 'center' }} onClick={() => { setActiveTab('events'); setSelectedEvent(null); }}>
              <span style={{ marginRight: 10 }}>🎫</span>Sự kiện
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: activeTab === 'profile' ? '#1e3c72' : 'none', borderRadius: 8, marginBottom: 8, textAlign: 'center' }} onClick={() => setActiveTab('profile')}>
              <span style={{ marginRight: 10 }}>⚙️</span>Cài đặt tài khoản
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: '#f44336', color: 'white', borderRadius: 8, marginTop: 40, textAlign: 'center' }} onClick={onLogout}>
              <span style={{ marginRight: 10 }}>🚪</span>Đăng xuất
            </div>
          </div>
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: 40 }}>
          <h2 style={{ color: '#2a5298', marginBottom: 24 }}>Quản lý vé</h2>
          {/* Thanh toán */}
          {activeTab === 'payment' && (
            <div style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 800 }}>
              <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Danh sách vé chưa thanh toán</h3>
              {paymentMsg && <div style={{ color: 'green', marginBottom: 14 }}>{paymentMsg}</div>}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#e3eafc' }}>
                    <th style={{ padding: 10 }}>Mã vé</th>
                    <th>Khách</th>
                    <th>Sự kiện</th>
                    <th>Ghế</th>
                    <th>Trạng thái</th>
                    <th>Thanh toán</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidTickets.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 18 }}>Không có vé nào cần thanh toán.</td></tr>
                  ) : unpaidTickets.map(ticket => (
                    <tr key={ticket.code} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{ticket.code}</td>
                      <td>{ticket.name}</td>
                      <td>{ticket.event}</td>
                      <td>{ticket.seat}</td>
                      <td style={{ color: ticket.status === 'Đã check-in' ? 'green' : '#2a5298', fontWeight: 500 }}>{ticket.status}</td>
                      <td style={{ color: ticket.payment === 'Đã thanh toán' ? 'green' : '#f44336', fontWeight: 500 }}>{ticket.payment}</td>
                      <td>
                        {ticket.payment === 'Chưa thanh toán' && (
                          <button onClick={() => handleOpenPaymentPopup(ticket)} style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Xác nhận thanh toán</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Popup xác nhận thanh toán */}
              {showPaymentPopup && selectedTicket && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,60,114,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                  <div style={{ background: 'white', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 24px rgba(30,60,114,0.15)' }}>
                    <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Xác nhận thanh toán</h3>
                    <div><b>Họ tên:</b> {selectedTicket.name}</div>
                    <div><b>Email:</b> {selectedTicket.email}</div>
                    <div><b>Số điện thoại:</b> {selectedTicket.phone}</div>
                    <div><b>Số dư tài khoản:</b> {selectedTicket.balance.toLocaleString('vi-VN')}đ</div>
                    <div><b>Số tiền cần thanh toán:</b> {TICKET_PRICE.toLocaleString('vi-VN')}đ</div>
                    {paymentError && <div style={{ color: 'red', marginTop: 10 }}>{paymentError}</div>}
                    <button onClick={handleConfirmPayment} style={{ marginTop: 18, width: '100%', background: '#4caf50', color: 'white', padding: 12, border: 'none', borderRadius: 8, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ marginRight: 8 }}>✔️</span>Xác nhận</button>
                    <button onClick={() => setShowPaymentPopup(false)} style={{ marginTop: 14, width: '100%', background: '#bbb', color: 'white', padding: 10, border: 'none', borderRadius: 8 }}>Đóng</button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Check-in vé */}
          {activeTab === 'checkin' && (
            <div style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 800 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#e3eafc' }}>
                    <th style={{ padding: 10 }}>Mã vé</th>
                    <th>Khách</th>
                    <th>Sự kiện</th>
                    <th>Ghế</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket.code} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{ticket.code}</td>
                      <td>{ticket.name}</td>
                      <td>{ticket.event}</td>
                      <td>{ticket.seat}</td>
                      <td style={{ color: ticket.status === 'Đã check-in' ? 'green' : '#2a5298', fontWeight: 500 }}>{ticket.status}</td>
                      <td>
                        {ticket.status === 'Chưa check-in' && (
                          <button onClick={() => handleCheckIn(ticket)} style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Check-in</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Sự kiện */}
          {activeTab === 'events' && (
            <div style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 800 }}>
              <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Danh sách sự kiện</h3>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc địa điểm..."
                value={eventSearch}
                onChange={e => setEventSearch(e.target.value)}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', marginBottom: 18, width: 300 }}
              />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#e3eafc' }}>
                    <th style={{ padding: 10 }}>Tên sự kiện</th>
                    <th>Thời gian</th>
                    <th>Địa điểm</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(ev => (
                    <tr key={ev.event_id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{ev.name}</td>
                      <td>{ev.time}</td>
                      <td>{ev.location}</td>
                      <td>
                        <button onClick={() => setSelectedEvent(ev)} style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Xem chi tiết</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Chi tiết sự kiện */}
              {selectedEvent && (
                <div style={{ marginTop: 24, background: '#f5f5f5', borderRadius: 8, padding: 18 }}>
                  <h4 style={{ color: '#2a5298' }}>{selectedEvent.name}</h4>
                  <div><b>Thời gian:</b> {selectedEvent.time}</div>
                  <div><b>Địa điểm:</b> {selectedEvent.location}</div>
                  <div><b>Mô tả:</b> {selectedEvent.description}</div>
                  <button onClick={() => setSelectedEvent(null)} style={{ marginTop: 14, background: '#bbb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px' }}>Đóng</button>
                </div>
              )}
            </div>
          )}
          {/* Cài đặt tài khoản */}
          {activeTab === 'profile' && (
            <div style={{ background: 'white', borderRadius: 10, padding: 32, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 400 }}>
              <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Cài đặt tài khoản</h3>
              <form onSubmit={handleProfileSave}>
                <div style={{ marginBottom: 14 }}>
                  <label>Họ tên:</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label>Email:</label>
                  <input type="email" name="email" value={profile.email} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label>Số điện thoại:</label>
                  <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label>Mật khẩu mới:</label>
                  <input type={showPassword ? 'text' : 'password'} name="password" value={profile.password} onChange={handlePasswordChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} />
                  <label style={{ fontSize: 13, marginLeft: 8 }}><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /> Hiện mật khẩu</label>
                </div>
                <button type="submit" style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, width: '100%', marginTop: 10 }}>Lưu thay đổi</button>
              </form>
              {profileMsg && <div style={{ color: 'green', marginTop: 14, textAlign: 'center' }}>{profileMsg}</div>}
            </div>
          )}
          {/* Hiện thông tin khách hàng khi xác nhận */}
          {selectedTicket && activeTab === 'checkin' && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,60,114,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ background: 'white', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 24px rgba(30,60,114,0.15)' }}>
                <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Thông tin khách hàng</h3>
                <div><b>Họ tên:</b> {selectedTicket.name}</div>
                <div><b>Email:</b> {selectedTicket.email}</div>
                <div><b>Số điện thoại:</b> {selectedTicket.phone}</div>
                <div><b>Sự kiện:</b> {selectedTicket.event}</div>
                <div><b>Ghế:</b> {selectedTicket.seat}</div>
                <div><b>Mã vé:</b> {selectedTicket.code}</div>
                <div><b>Trạng thái:</b> <span style={{ color: selectedTicket.status === 'Đã check-in' ? 'green' : '#2a5298' }}>{selectedTicket.status}</span></div>
                {selectedTicket.status === 'Chưa check-in' && (
                  <button onClick={handleConfirmCheckIn} style={{ marginTop: 18, width: '100%', background: '#4caf50', color: 'white', padding: 12, border: 'none', borderRadius: 8, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ marginRight: 8 }}>🟢</span>Xác nhận check-in</button>
                )}
                <button onClick={() => setSelectedTicket(null)} style={{ marginTop: 14, width: '100%', background: '#bbb', color: 'white', padding: 10, border: 'none', borderRadius: 8 }}>Đóng</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard; 