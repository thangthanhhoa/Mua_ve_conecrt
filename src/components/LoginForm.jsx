import { useState } from 'react';

const iconStyle = { width: 20, marginRight: 8, verticalAlign: 'middle' };

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    // Gọi API đăng nhập ở đây, kiểm tra tài khoản/mật khẩu
    // Nếu sai, setError('Tài khoản hoặc mật khẩu không đúng!')
    onLogin && onLogin(form, setError);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(30,60,114,0.10)' }}>
      <h2 style={{ textAlign: 'center', color: '#2a5298', marginBottom: 24 }}>Đăng nhập</h2>
      <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="username" style={iconStyle}>🆔</span>
        <input placeholder="Tên tài khoản" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label="password" style={iconStyle}>🔒</span>
        <input placeholder="Mật khẩu" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }} />
      </div>
      <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white', padding: 12, border: 'none', borderRadius: 8, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }}>Đăng nhập</button>
      {error && <div style={{ color: 'red', marginTop: 14, textAlign: 'center' }}>{error}</div>}
      <div style={{ marginTop: 18, textAlign: 'center', color: '#2a5298', fontWeight: 500, cursor: 'pointer' }} onClick={onSwitchToRegister}>
        Bạn chưa có tài khoản? <span style={{ textDecoration: 'underline' }}>Đăng ký</span>
      </div>
    </form>
  );
};

export default LoginForm; 