import { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setIsLoading(true);
    try {
      await onLogin(form, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🎵 Concert Ticket</h1>
          <p>Đăng nhập để tiếp tục</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <span role="img" aria-label="username">👤</span>
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <span role="img" aria-label="password">🔒</span>
              Mật khẩu
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Chưa có tài khoản?{' '}
            <button 
              onClick={onSwitchToRegister}
              className="register-link"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 