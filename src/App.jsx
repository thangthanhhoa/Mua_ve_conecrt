import { useState, useEffect } from 'react'
import './App.css'
import SeatSelection from './components/SeatSelection'
import CustomerForm from './components/CustomerForm'
import RegisterForm from './components/RegisterForm'
import LoginPage from './components/LoginPage'
import TicketCheckIn from './components/TicketCheckIn'
import EmployeeDashboard from './components/EmployeeDashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EventList from './components/EventList'
import MyTickets from './components/MyTickets'
import AdminDashboard from './components/admin/AdminDashboard'
import OrderHistory from './components/user/OrderHistory'
import ChangePassword from './components/user/ChangePassword'
// import ProfileSettings nếu có
// import ProfileSettings from './components/user/ProfileSettings'

// Giả lập dữ liệu
const mockEvents = [
  { event_id: 1, name: 'Bolero Night', time: '2024-07-15 20:00', stage_id: 1, description: '...' }
]
const seatRows = 'ABCDEFGHIJ'.split('');
const seatPrices = [3000000, 2700000, 2400000, 2100000, 1800000, 1500000, 1200000, 900000, 700000, 500000];
let mockSeats = seatRows.flatMap((row, i) =>
  Array.from({ length: 20 }, (_, colIdx) => ({
    stage_seat_id: i * 20 + colIdx + 1,
    row: row,
    col: colIdx + 1,
    price: seatPrices[i],
    status: 'open',
  }))
);

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLogin, setShowLogin] = useState(true);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', event: '', row: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [billStatus, setBillStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [customerTab, setCustomerTab] = useState('booking');

  useEffect(() => {
    // Thêm tài khoản nhân viên mẫu nếu chưa có
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find(u => u.username === 'employee1')) {
      users.push({
        username: 'employee1',
        password: '123456',
        role: 'employee',
        name: 'Nhân viên A',
        createdAt: new Date().toISOString()
      });
    }
    // Thêm tài khoản admin mẫu nếu chưa có
    if (!users.find(u => u.username === 'admin')) {
      users.push({
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Quản trị viên',
        createdAt: new Date().toISOString()
      });
    }
    localStorage.setItem('users', JSON.stringify(users));
    if (!user) {
      setCustomer({ name: '', email: '', phone: '', event: '', row: '' });
      setSelectedSeats([]);
      setShowBill(false);
      setShowPayment(false);
      setPaymentType('');
      setBillStatus('');
      setTab('dashboard');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  const handleRegister = async (form) => {
    try {
      setLoading(true);
      setError('');
      
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find(u => u.username === form.username)) {
        setError('Tên tài khoản đã tồn tại!');
        return;
      }

      const newUser = { 
        ...form, 
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      alert('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
      setShowLogin(true);
    } catch (err) {
      setError('Không thể đăng ký. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (form, setError) => {
    try {
      setLoading(true);
      setError('');

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      const found = existingUsers.find(u => 
        u.username === form.username && 
        u.password === form.password
      );

      if (found) {
        setUser(found);
        setShowLogin(true);
      } else {
        setError('Tài khoản hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      setError('Không thể đăng nhập. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerChange = (data) => {
    setCustomer(data);
    setSelectedSeats([]);
    setShowBill(false);
    setShowPayment(false);
    setBillStatus('');
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev =>
      prev.find(s => s.stage_seat_id === seat.stage_seat_id)
        ? prev.filter(s => s.stage_seat_id !== seat.stage_seat_id)
        : [...prev, seat]
    )
  }

  const handleShowBill = () => {
    setShowBill(true)
  }

  const handlePayment = () => {
    setShowPayment(true)
  }
  const handleSelectPayment = (type) => {
    setPaymentType(type)
    setShowPayment(false)
    if (type === 'counter') {
      setBillStatus('Hóa đơn chờ thanh toán (tại quầy). Mua vé thành công!')
    } else if (type === 'online') {
      setBillStatus('Vui lòng quét mã QR để thanh toán.')
    }
  }
  const handleBackToBill = () => {
    setShowPayment(false)
    setBillStatus('')
  }

  const soldSeatIds = selectedSeats.map(s => s.stage_seat_id)
  const seatsWithStatus = mockSeats.map(s =>
    soldSeatIds.includes(s.stage_seat_id) ? { ...s, status: 'sold' } : s
  )

  const totalPrice = selectedSeats.length > 0 && customer.row
    ? selectedSeats.length * seatPrices[seatRows.indexOf(customer.row)]
    : 0

  if (!user) {
    return (
      <div className="login-bg">
        {showLogin ? (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setShowLogin(false)}
            loading={loading}
            error={error}
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setShowLogin(true)}
            loading={loading}
            error={error}
          />
        )}
      </div>
    );
  }

  if (user.role === 'admin') {
    // Chỉ render layout admin
    return (
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </Router>
    );
  }

  if (user.role === 'employee') {
    return <EmployeeDashboard onLogout={handleLogout} />;
  }

  // Menu cho khách hàng
  const renderCustomerMenu = () => (
    <nav className="customer-menu">
      <button className={customerTab === 'booking' ? 'active' : ''} onClick={() => setCustomerTab('booking')}>Đặt vé</button>
      <button className={customerTab === 'events' ? 'active' : ''} onClick={() => setCustomerTab('events')}>Sự kiện</button>
      <button className={customerTab === 'tickets' ? 'active' : ''} onClick={() => setCustomerTab('tickets')}>Vé của tôi</button>
      <button className={customerTab === 'orderhistory' ? 'active' : ''} onClick={() => setCustomerTab('orderhistory')}>Lịch sử đơn hàng</button>
      <button className={customerTab === 'changepw' ? 'active' : ''} onClick={() => setCustomerTab('changepw')}>Đổi mật khẩu</button>
      {/* <button className={customerTab === 'profile' ? 'active' : ''} onClick={() => setCustomerTab('profile')}>Cài đặt tài khoản</button> */}
    </nav>
  );

  // Layout cho khách hàng
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>Hệ Thống Đặt Vé Xem Ca Nhạc</h1>
          <div className="user-info">
            <span>Xin chào, {user.username}</span>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Đăng xuất
            </button>
          </div>
        </header>
        {renderCustomerMenu()}
        <main className="main-content">
          {customerTab === 'booking' && (
            <>
              <div className="left-section">
                <CustomerForm
                  onNext={handleCustomerChange}
                  events={mockEvents}
                  seatRows={seatRows}
                  customer={customer}
                />
              </div>
              <div className="right-section">
                {customer.row ? (
                  <>
                    <h2>Chọn Ghế Hạng {customer.row}</h2>
                    <SeatSelection
                      seats={seatsWithStatus.filter(s => s.row === customer.row)}
                      selectedSeats={selectedSeats}
                      onSelect={handleSeatSelect}
                      stage={{ row: 1, col: 20 }}
                    />
                    {selectedSeats.length > 0 && !showBill && (
                      <button
                        className="confirm-button"
                        onClick={handleShowBill}
                      >
                        Xác nhận mua vé
                      </button>
                    )}
                  </>
                ) : (
                  <div className="select-seat-message">
                    Vui lòng chọn hạng ghế để tiếp tục
                  </div>
                )}

                {showBill && (
                  <div className="bill-container">
                    <h2>Hóa Đơn Đặt Vé</h2>
                    <div className="bill-details">
                      <p><b>Họ tên:</b> {customer?.name}</p>
                      <p><b>Số điện thoại:</b> {customer?.phone}</p>
                      <p><b>Hạng ghế:</b> {customer.row}</p>
                      <p><b>Danh sách ghế:</b> {selectedSeats.map(s => `${s.row}${s.col}`).join(', ')}</p>
                      <p><b>Giá mỗi ghế:</b> {seatPrices[seatRows.indexOf(customer.row)].toLocaleString('vi-VN')}đ</p>
                      <p><b>Số lượng ghế:</b> {selectedSeats.length}</p>
                      <p><b>Tổng tiền:</b> {totalPrice.toLocaleString('vi-VN')}đ</p>
                    </div>

                    {!showPayment && (
                      <button 
                        className="payment-button"
                        onClick={handlePayment}
                      >
                        Thanh toán
                      </button>
                    )}

                    {showPayment && (
                      <div className="payment-options">
                        <p>Bạn muốn thanh toán bằng cách nào?</p>
                        <div className="payment-buttons">
                          <button 
                            onClick={() => handleSelectPayment('counter')}
                            className="payment-option-button"
                          >
                            Tại quầy
                          </button>
                          <button 
                            onClick={() => handleSelectPayment('online')}
                            className="payment-option-button"
                          >
                            Online
                          </button>
                        </div>
                      </div>
                    )}

                    {billStatus && (
                      <div className="payment-status">
                        <b>{billStatus}</b>
                        {paymentType === 'online' && (
                          <div className="qr-code">
                            <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ThanhToanOnline" 
                              alt="QR code thanh toán" 
                            />
                            <p>Quét mã QR để thanh toán</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {customerTab === 'events' && (
            <div style={{width: '100%'}}>
              <EventList />
            </div>
          )}
          {customerTab === 'tickets' && (
            <div style={{width: '100%'}}>
              <MyTickets />
            </div>
          )}
          {customerTab === 'orderhistory' && (
            <div style={{width: '100%'}}>
              <OrderHistory />
            </div>
          )}
          {customerTab === 'changepw' && (
            <div style={{width: '100%'}}>
              <ChangePassword />
            </div>
          )}
          {/* {customerTab === 'profile' && (
            <div style={{width: '100%'}}>
              <ProfileSettings user={user} />
            </div>
          )} */}
        </main>
      </div>
    </Router>
  )
}

export default App