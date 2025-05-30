import React, { useState } from 'react';

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

// Thông tin nhân viên mẫu theo CSDL
const defaultProfile = {
  employee_id: 'EMP001',
  name: 'Nhân viên A',
  identification_number: '123456789',
  phone: '0900000000',
  dob: '1995-01-01',
  address: 'Hà Nội',
  email: 'employee@gmail.com',
  position: 'staff',
  password: 'Emp123!@#'
};
const TICKET_PRICE = 500000;

const EmployeeDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('payment');
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [profileMsg, setProfileMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eventSearch, setEventSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paymentMsg, setPaymentMsg] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [changePwd, setChangePwd] = useState({ old: '', new1: '', new2: '' });
  const [pwdMsg, setPwdMsg] = useState('');
  const [notification, setNotification] = useState({ email: true, sms: false, system: true });
  const [notificationMsg, setNotificationMsg] = useState('');
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState('all');
  const [showInvoice, setShowInvoice] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const [eventStatusFilter, setEventStatusFilter] = useState('all');
  const [showEventTickets, setShowEventTickets] = useState(null);

  // Khi xác nhận check-in thật sự
  const handleCheckIn = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleConfirmCheckIn = () => {
    if (!selectedTicket) return;
    setTickets(tickets.map(t =>
      t.code === selectedTicket.code ? { ...t, status: 'Đã check-in' } : t
    ));
    setSelectedTicket({ ...selectedTicket, status: 'Đã check-in' });
  };

  // Thanh toán: mở popup
  const handleOpenPaymentPopup = (ticket) => {
    setSelectedTicket(ticket);
    setShowPaymentPopup(true);
    setPaymentError('');
  };

  // Xác nhận thanh toán thực sự
  const handleConfirmPayment = () => {
    if (!selectedTicket) return;
    if (selectedTicket.balance < TICKET_PRICE) {
      setPaymentError('Số dư không đủ để thanh toán!');
      return;
    }
    setTickets(tickets.map(t =>
      t.code === selectedTicket.code
        ? { ...t, payment: 'Đã thanh toán', balance: t.balance - TICKET_PRICE }
        : t
    ));
    setPaymentMsg('Thanh toán thành công cho vé ' + selectedTicket.code);
    setShowPaymentPopup(false);
    setTimeout(() => setPaymentMsg(''), 2000);
  };

  // Cập nhật thông tin cá nhân
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileMsg('');
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileMsg('Cập nhật thành công!');
  };

  // Đổi mật khẩu
  const handlePwdChange = (e) => {
    setChangePwd({ ...changePwd, [e.target.name]: e.target.value });
    setPwdMsg('');
  };
  const handlePwdSave = (e) => {
    e.preventDefault();
    if (changePwd.old !== profile.password) {
      setPwdMsg('Mật khẩu cũ không đúng!');
      return;
    }
    if (changePwd.new1.length < 6) {
      setPwdMsg('Mật khẩu mới phải từ 6 ký tự!');
      return;
    }
    if (changePwd.new1 !== changePwd.new2) {
      setPwdMsg('Nhập lại mật khẩu mới không khớp!');
      return;
    }
    setProfile({ ...profile, password: changePwd.new1 });
    setPwdMsg('Đổi mật khẩu thành công!');
    setChangePwd({ old: '', new1: '', new2: '' });
  };

  // Cài đặt thông báo
  const handleNotificationChange = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.checked });
    setNotificationMsg('');
  };
  const handleNotificationSave = (e) => {
    e.preventDefault();
    setNotificationMsg('Lưu cài đặt thông báo thành công!');
  };

  // Lọc sự kiện theo trạng thái
  const filteredEvents = mockEvents.filter(ev => {
    const search = eventSearch.toLowerCase();
    const matchSearch = ev.name.toLowerCase().includes(search) || ev.location.toLowerCase().includes(search);
    const now = new Date();
    const eventTime = new Date(ev.time);
    const matchStatus =
      eventStatusFilter === 'all' ||
      (eventStatusFilter === 'upcoming' && eventTime > now) ||
      (eventStatusFilter === 'ended' && eventTime <= now);
    return matchSearch && matchStatus;
  });

  // Lọc vé theo sự kiện
  const getEventTickets = (eventName) => {
    return tickets.filter(t => t.event === eventName);
  };

  // Lọc vé chưa thanh toán
  const unpaidTickets = tickets.filter(t => t.payment === 'Chưa thanh toán');

  // Lọc vé theo tìm kiếm và trạng thái
  const filteredTickets = tickets.filter(t => {
    const search = ticketSearch.toLowerCase();
    const matchSearch =
      t.code.toLowerCase().includes(search) ||
      t.name.toLowerCase().includes(search) ||
      t.event.toLowerCase().includes(search);
    const matchStatus =
      ticketStatusFilter === 'all' ||
      (ticketStatusFilter === 'unpaid' && t.payment === 'Chưa thanh toán') ||
      (ticketStatusFilter === 'paid' && t.payment === 'Đã thanh toán') ||
      (ticketStatusFilter === 'checked' && t.status === 'Đã check-in') ||
      (ticketStatusFilter === 'error' && t.status === 'Lỗi');
    return matchSearch && matchStatus;
  });

  // Giả lập lịch sử check-in
  const mockCheckinHistory = ticket => [
    { time: '2024-07-10 19:00', status: 'Chưa check-in' },
    ticket.status === 'Đã check-in' ? { time: '2024-07-15 19:55', status: 'Đã check-in' } : null
  ].filter(Boolean);

  // Xuất hóa đơn (giả lập: tải file txt)
  const handleExportInvoice = (ticket) => {
    const content = `HÓA ĐƠN BÁN VÉ\n---------------------\nKhách hàng: ${ticket.name}\nEmail: ${ticket.email}\nSĐT: ${ticket.phone}\nSự kiện: ${ticket.event}\nGhế: ${ticket.seat}\nMã vé: ${ticket.code}\nTrạng thái: ${ticket.status}\nThanh toán: ${ticket.payment}\nSố tiền: ${TICKET_PRICE.toLocaleString('vi-VN')}đ`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HoaDon_${ticket.code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
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
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: activeTab === 'notification' ? '#1e3c72' : 'none', borderRadius: 8, marginBottom: 8, textAlign: 'center' }} onClick={() => setActiveTab('notification')}>
            <span style={{ marginRight: 10 }}>🔔</span>Cài đặt thông báo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: '#f44336', color: 'white', borderRadius: 8, marginTop: 40, textAlign: 'center' }} onClick={onLogout}>
            <span style={{ marginRight: 10 }}>🚪</span>Đăng xuất
          </div>
        </div>
      </div>
      {/* Main content */}
      <div style={{ flex: 1, padding: 40 }}>
        <h2 style={{ color: '#2a5298', marginBottom: 24 }}>Quản lý vé</h2>
        {/* Thanh toán & Quản lý vé */}
        {activeTab === 'payment' && (
          <div style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 900 }}>
            <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Danh sách vé</h3>
            {/* Bộ lọc và tìm kiếm */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
              <input
                type="text"
                placeholder="Tìm kiếm theo mã vé, tên khách, sự kiện..."
                value={ticketSearch}
                onChange={e => setTicketSearch(e.target.value)}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', width: 260 }}
              />
              <select
                value={ticketStatusFilter}
                onChange={e => setTicketStatusFilter(e.target.value)}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb' }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="checked">Đã check-in</option>
                <option value="error">Lỗi</option>
              </select>
            </div>
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
                  <th>Lịch sử check-in</th>
                  <th>Hóa đơn</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr><td colSpan={9} style={{ textAlign: 'center', padding: 18 }}>Không có vé nào phù hợp.</td></tr>
                ) : filteredTickets.map(ticket => (
                  <tr key={ticket.code} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{ticket.code}</td>
                    <td>{ticket.name}</td>
                    <td>{ticket.event}</td>
                    <td>{ticket.seat}</td>
                    <td style={{ color: ticket.status === 'Đã check-in' ? 'green' : '#2a5298', fontWeight: 500 }}>{ticket.status}</td>
                    <td style={{ color: ticket.payment === 'Đã thanh toán' ? 'green' : '#f44336', fontWeight: 500 }}>{ticket.payment}</td>
                    <td>
                      <button onClick={() => setShowHistory(ticket)} style={{ background: '#2196F3', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Xem</button>
                    </td>
                    <td>
                      <button onClick={() => handleExportInvoice(ticket)} style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>Xuất</button>
                    </td>
                    <td>
                      {ticket.payment === 'Chưa thanh toán' && (
                        <button onClick={() => handleOpenPaymentPopup(ticket)} style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Xác nhận thanh toán</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Popup lịch sử check-in */}
            {showHistory && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,60,114,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: 'white', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 24px rgba(30,60,114,0.15)' }}>
                  <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Lịch sử check-in</h3>
                  <div><b>Mã vé:</b> {showHistory.code}</div>
                  <div><b>Khách:</b> {showHistory.name}</div>
                  <div><b>Sự kiện:</b> {showHistory.event}</div>
                  <div style={{ margin: '16px 0' }}>
                    <b>Lịch sử:</b>
                    <ul>
                      {mockCheckinHistory(showHistory).map((h, idx) => (
                        <li key={idx}>{h.time} - {h.status}</li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setShowHistory(null)} style={{ marginTop: 14, width: '100%', background: '#bbb', color: 'white', padding: 10, border: 'none', borderRadius: 8 }}>Đóng</button>
                </div>
              </div>
            )}
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
            <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc địa điểm..."
                value={eventSearch}
                onChange={e => setEventSearch(e.target.value)}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', width: 300 }}
              />
              <select
                value={eventStatusFilter}
                onChange={e => setEventStatusFilter(e.target.value)}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb' }}
              >
                <option value="all">Tất cả sự kiện</option>
                <option value="upcoming">Sắp diễn ra</option>
                <option value="ended">Đã kết thúc</option>
              </select>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#e3eafc' }}>
                  <th style={{ padding: 10 }}>Tên sự kiện</th>
                  <th>Thời gian</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(ev => {
                  const now = new Date();
                  const eventTime = new Date(ev.time);
                  const status = eventTime > now ? 'Sắp diễn ra' : 'Đã kết thúc';
                  return (
                    <tr key={ev.event_id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{ev.name}</td>
                      <td>{ev.time}</td>
                      <td>{ev.location}</td>
                      <td style={{ color: status === 'Sắp diễn ra' ? '#2a5298' : '#666', fontWeight: 500 }}>{status}</td>
                      <td>
                        <button onClick={() => setShowEventTickets(ev)} style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Xem vé</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Popup danh sách vé của sự kiện */}
            {showEventTickets && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,60,114,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: 'white', borderRadius: 12, padding: 32, minWidth: 600, maxWidth: 800, maxHeight: '80vh', overflow: 'auto', boxShadow: '0 4px 24px rgba(30,60,114,0.15)' }}>
                  <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Danh sách vé - {showEventTickets.name}</h3>
                  <div style={{ marginBottom: 18 }}>
                    <b>Thời gian:</b> {showEventTickets.time}<br />
                    <b>Địa điểm:</b> {showEventTickets.location}
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#e3eafc' }}>
                        <th style={{ padding: 10 }}>Mã vé</th>
                        <th>Khách</th>
                        <th>Ghế</th>
                        <th>Trạng thái</th>
                        <th>Thanh toán</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getEventTickets(showEventTickets.name).map(ticket => (
                        <tr key={ticket.code} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: 8 }}>{ticket.code}</td>
                          <td>{ticket.name}</td>
                          <td>{ticket.seat}</td>
                          <td style={{ color: ticket.status === 'Đã check-in' ? 'green' : '#2a5298', fontWeight: 500 }}>{ticket.status}</td>
                          <td style={{ color: ticket.payment === 'Đã thanh toán' ? 'green' : '#f44336', fontWeight: 500 }}>{ticket.payment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => setShowEventTickets(null)} style={{ marginTop: 18, width: '100%', background: '#bbb', color: 'white', padding: 10, border: 'none', borderRadius: 8 }}>Đóng</button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Cài đặt tài khoản */}
        {activeTab === 'profile' && (
          <div style={{ background: 'white', borderRadius: 10, padding: 32, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 500 }}>
            <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Thông tin cá nhân</h3>
            <form onSubmit={handleProfileSave}>
              <div style={{ marginBottom: 14 }}>
                <label>Mã nhân viên:</label>
                <input type="text" name="employee_id" value={profile.employee_id} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', background: '#eee' }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Họ tên:</label>
                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>CMND/CCCD:</label>
                <input type="text" name="identification_number" value={profile.identification_number} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Số điện thoại:</label>
                <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Ngày sinh:</label>
                <input type="date" name="dob" value={profile.dob} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Địa chỉ:</label>
                <input type="text" name="address" value={profile.address} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Email:</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Chức vụ:</label>
                <select name="position" value={profile.position} onChange={handleProfileChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }}>
                  <option value="staff">Nhân viên</option>
                  <option value="manager">Quản lý</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
              <button type="submit" style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, width: '100%', marginTop: 10 }}>Lưu thay đổi</button>
            </form>
            {profileMsg && <div style={{ color: 'green', marginTop: 14, textAlign: 'center' }}>{profileMsg}</div>}
            <hr style={{ margin: '32px 0' }} />
            <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Đổi mật khẩu</h3>
            <form onSubmit={handlePwdSave}>
              <div style={{ marginBottom: 14 }}>
                <label>Mật khẩu cũ:</label>
                <input type="password" name="old" value={changePwd.old} onChange={handlePwdChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Mật khẩu mới:</label>
                <input type="password" name="new1" value={changePwd.new1} onChange={handlePwdChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Nhập lại mật khẩu mới:</label>
                <input type="password" name="new2" value={changePwd.new2} onChange={handlePwdChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb' }} required />
              </div>
              <button type="submit" style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, width: '100%', marginTop: 10 }}>Đổi mật khẩu</button>
            </form>
            {pwdMsg && <div style={{ color: pwdMsg.includes('thành công') ? 'green' : 'red', marginTop: 14, textAlign: 'center' }}>{pwdMsg}</div>}
          </div>
        )}
        {/* Cài đặt thông báo */}
        {activeTab === 'notification' && (
          <div style={{ background: 'white', borderRadius: 10, padding: 32, boxShadow: '0 2px 12px rgba(30,60,114,0.08)', maxWidth: 400 }}>
            <h3 style={{ color: '#2a5298', marginBottom: 18 }}>Cài đặt thông báo</h3>
            <form onSubmit={handleNotificationSave}>
              <div style={{ marginBottom: 18 }}>
                <label><input type="checkbox" name="email" checked={notification.email} onChange={handleNotificationChange} /> Nhận thông báo qua Email</label>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label><input type="checkbox" name="sms" checked={notification.sms} onChange={handleNotificationChange} /> Nhận thông báo qua SMS</label>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label><input type="checkbox" name="system" checked={notification.system} onChange={handleNotificationChange} /> Nhận thông báo trên hệ thống</label>
              </div>
              <button type="submit" style={{ background: '#2a5298', color: 'white', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 600, width: '100%', marginTop: 10 }}>Lưu cài đặt</button>
            </form>
            {notificationMsg && <div style={{ color: 'green', marginTop: 14, textAlign: 'center' }}>{notificationMsg}</div>}
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
  );
};

export default EmployeeDashboard; 