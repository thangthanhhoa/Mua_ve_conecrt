import { useState } from 'react';

const iconStyle = { width: 20, marginRight: 8, verticalAlign: 'middle' };

const RegisterForm = ({ onRegister, onSwitchToLogin, loading, error }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [showLogin, setShowLogin] = useState(false);

  const validate = () => {
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      return 'Email phải là Gmail hợp lệ!';
    }
    if (!/^0\d{9}$/.test(form.phone)) {
      return 'Số điện thoại phải là 10 số và bắt đầu bằng 0!';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/.test(form.password)) {
      return 'Mật khẩu 8-16 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt!';
    }
    if (form.password !== form.confirmPassword) {
      return 'Mật khẩu nhập lại không khớp!';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    onRegister && onRegister(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(30,60,114,0.10)' }}>
      <h2 style={{ textAlign: 'center', color: '#2a5298', marginBottom: 24 }}>Đăng ký tài khoản</h2>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="user" style={iconStyle}>👤</span>
        <input placeholder="Họ tên" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="age" style={iconStyle}>🎂</span>
        <input placeholder="Tuổi" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="gender" style={iconStyle}>⚧️</span>
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }}>
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="email" style={iconStyle}>📧</span>
        <input placeholder="Email (Gmail)" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="phone" style={iconStyle}>📱</span>
        <input placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="username" style={iconStyle}>🆔</span>
        <input placeholder="Tên tài khoản" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="password" style={iconStyle}>🔒</span>
        <input placeholder="Mật khẩu" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="password2" style={iconStyle}>🔒</span>
        <input placeholder="Nhập lại mật khẩu" type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="address" style={iconStyle}>🏠</span>
        <input placeholder="Địa chỉ" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white', padding: 12, border: 'none', borderRadius: 8, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }}>Đăng ký</button>
      {error && <div style={{ color: 'red', marginTop: 14, textAlign: 'center' }}>{error}</div>}
      <div style={{ marginTop: 18, textAlign: 'center', color: '#2a5298', fontWeight: 500, cursor: 'pointer' }}>
        Bạn đã có tài khoản? <span style={{ textDecoration: 'underline' }} onClick={e => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</span>
      </div>
    </form>
  );
};

export default RegisterForm; 