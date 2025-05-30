import { useState, useEffect } from 'react';

const iconStyle = { width: 20, marginRight: 8, verticalAlign: 'middle' };
const errorStyle = { color: '#f44336', fontSize: '0.85rem', marginTop: 4, marginLeft: 28 };

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

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Tên phải có ít nhất 2 ký tự' : '';
      case 'age':
        const age = parseInt(value);
        return !age || age < 18 ? 'Tuổi phải từ 18 trở lên' : '';
      case 'gender':
        return !value ? 'Vui lòng chọn giới tính' : '';
      case 'email':
        return !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? 'Email phải là Gmail hợp lệ' : '';
      case 'phone':
        return !/^0\d{9}$/.test(value) ? 'Số điện thoại phải là 10 số và bắt đầu bằng 0' : '';
      case 'username':
        return value.length < 4 ? 'Tên tài khoản phải có ít nhất 4 ký tự' : '';
      case 'password':
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/.test(value)
          ? 'Mật khẩu 8-16 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt'
          : '';
      case 'confirmPassword':
        return value !== form.password ? 'Mật khẩu nhập lại không khớp' : '';
      case 'address':
        return value.length < 5 ? 'Địa chỉ phải có ít nhất 5 ký tự' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const isAllFieldsFilled = Object.values(form).every(value => value !== '');
    setIsFormValid(!hasErrors && isAllFieldsFilled);
  }, [form, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onRegister && onRegister(form);
  };

  const renderInput = (name, placeholder, type = 'text', icon) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <span role="img" aria-label={name} style={iconStyle}>{icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          required
          style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }}
        />
      </div>
      {errors[name] && <div style={errorStyle}>{errors[name]}</div>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(30,60,114,0.10)' }}>
      <h2 style={{ textAlign: 'center', color: '#2a5298', marginBottom: 24 }}>Đăng ký tài khoản</h2>
      
      {renderInput('name', 'Họ tên', 'text', '👤')}
      {renderInput('age', 'Tuổi', 'number', '🎂')}
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <span role="img" aria-label="gender" style={iconStyle}>⚧️</span>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            style={{ width: '100%', border: 'none', outline: 'none', padding: 10, background: 'transparent' }}
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
      </div>

      {renderInput('email', 'Email (Gmail)', 'email', '📧')}
      {renderInput('phone', 'Số điện thoại', 'tel', '📱')}
      {renderInput('username', 'Tên tài khoản', 'text', '🆔')}
      {renderInput('password', 'Mật khẩu', 'password', '🔒')}
      {renderInput('confirmPassword', 'Nhập lại mật khẩu', 'password', '🔒')}
      {renderInput('address', 'Địa chỉ', 'text', '🏠')}

      <button
        type="submit"
        disabled={!isFormValid}
        style={{
          width: '100%',
          background: isFormValid ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : '#ccc',
          color: 'white',
          padding: 12,
          border: 'none',
          borderRadius: 8,
          fontWeight: 'bold',
          fontSize: 16,
          letterSpacing: 1,
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          opacity: isFormValid ? 1 : 0.7
        }}
      >
        Đăng ký
      </button>

      {error && <div style={{ color: '#f44336', marginTop: 14, textAlign: 'center' }}>{error}</div>}
      
      <div style={{ marginTop: 18, textAlign: 'center', color: '#2a5298', fontWeight: 500, cursor: 'pointer' }}>
        Bạn đã có tài khoản? <span style={{ textDecoration: 'underline' }} onClick={e => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</span>
      </div>
    </form>
  );
};

export default RegisterForm; 