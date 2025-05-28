import React, { useState, useEffect } from 'react';
import './UserManager.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    username: '', 
    password: '', 
    role: 'customer',
    name: '',
    phone: '',
    email: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Lấy danh sách người dùng từ localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.name) {
      alert('Vui lòng điền đầy đủ thông tin người dùng!');
      return;
    }
    if (users.find(u => u.username === newUser.username)) {
      alert('Tên đăng nhập đã tồn tại!');
      return;
    }
    const userToAdd = {
      ...newUser,
      created_at: new Date().toISOString()
    };
    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({ 
      username: '', 
      password: '', 
      role: 'customer',
      name: '',
      phone: '',
      email: ''
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    const updatedUsers = users.map(u => 
      u.username === editingUser.username 
        ? { ...newUser, username: editingUser.username } 
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setNewUser({ 
      username: '', 
      password: '', 
      role: 'customer',
      name: '',
      phone: '',
      email: ''
    });
  };

  const handleDeleteUser = (username) => {
    if (username === 'admin') {
      alert('Không thể xóa tài khoản admin!');
      return;
    }
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="user-manager">
      <h3>Quản lý người dùng</h3>
      <div className="user-form">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="customer">Khách hàng</option>
          <option value="employee">Nhân viên</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <input
          type="text"
          placeholder="Họ tên"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {editingUser ? (
          <button onClick={handleUpdateUser}>Cập nhật người dùng</button>
        ) : (
          <button onClick={handleAddUser}>Thêm người dùng</button>
        )}
      </div>
      <div className="user-list">
        <h4>Danh sách người dùng</h4>
        {users.map(user => (
          <div key={user.username} className="user-item">
            <h5>{user.name}</h5>
            <p>Tên đăng nhập: {user.username}</p>
            <p>Vai trò: {
              user.role === 'admin' ? 'Quản trị viên' :
              user.role === 'employee' ? 'Nhân viên' : 'Khách hàng'
            }</p>
            <p>SĐT: {user.phone || 'Chưa có'}</p>
            <p>Email: {user.email || 'Chưa có'}</p>
            <div className="user-actions">
              <button onClick={() => handleEditUser(user)}>Sửa</button>
              <button onClick={() => handleDeleteUser(user.username)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager; 