import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

// Dữ liệu mẫu nhân viên
const mockEmployees = [
  { contact_id: 1, name: 'Nguyễn Văn Nhân', identification_number: '123456789', phone: '0901234567', dob: '1990-01-01', address: 'Hà Nội', email: 'nhan1@email.com', position: 'Nhân viên' },
  { contact_id: 2, name: 'Trần Thị Quản Lý', identification_number: '987654321', phone: '0902345678', dob: '1985-05-10', address: 'TP.HCM', email: 'quanly@email.com', position: 'Quản lý' }
];

const mockUsers = [
  { user_id: 1, email: 'nhan1@email.com', role: 'Employee', contact_id: 1 },
  { user_id: 2, email: 'quanly@email.com', role: 'Employee', contact_id: 2 }
];

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '', identification_number: '', phone: '', dob: '', address: '', email: '', position: ''
  });
  const [editing, setEditing] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({ email: '', password: '', role: 'Employee' });
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    setEmployees(mockEmployees);
    setUsers(mockUsers);
  }, []);

  const handleAdd = () => {
    if (!form.name || !form.email) {
      alert('Vui lòng nhập đủ thông tin!');
      return;
    }
    const newEmp = { ...form, contact_id: Date.now() };
    setEmployees([...employees, newEmp]);
    setForm({ name: '', identification_number: '', phone: '', dob: '', address: '', email: '', position: '' });
  };

  const handleEdit = (emp) => {
    setEditing(emp.contact_id);
    setForm(emp);
  };

  const handleUpdate = () => {
    setEmployees(employees.map(e => e.contact_id === editing ? { ...form, contact_id: editing } : e));
    setEditing(null);
    setForm({ name: '', identification_number: '', phone: '', dob: '', address: '', email: '', position: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Xóa nhân viên này?')) {
      setEmployees(employees.filter(e => e.contact_id !== id));
      setUsers(users.filter(u => u.contact_id !== id));
    }
  };

  // Gán tài khoản cho nhân viên
  const handleShowUserForm = (contact_id, email) => {
    setSelectedContactId(contact_id);
    setUserForm({ email, password: '', role: 'Employee' });
    setShowUserForm(true);
  };
  const handleCreateUser = () => {
    if (!userForm.email || !userForm.password) {
      alert('Nhập đủ email và mật khẩu!');
      return;
    }
    setUsers([...users, { user_id: Date.now(), ...userForm, contact_id: selectedContactId }]);
    setShowUserForm(false);
    setSelectedContactId(null);
    setUserForm({ email: '', password: '', role: 'Employee' });
  };

  return (
    <div style={{padding:32, background:'rgba(255,255,255,0.95)', borderRadius:12}}>
      <h2 style={{marginBottom:16}}>Quản lý nhân viên</h2>
      <div style={{marginBottom:24}}>
        <input name="name" placeholder="Họ tên" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{marginRight:8}} />
        <input name="identification_number" placeholder="CMND/CCCD" value={form.identification_number} onChange={e=>setForm({...form,identification_number:e.target.value})} style={{marginRight:8}} />
        <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{marginRight:8}} />
        <input name="dob" type="date" placeholder="Ngày sinh" value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} style={{marginRight:8}} />
        <input name="address" placeholder="Địa chỉ" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} style={{marginRight:8}} />
        <input name="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{marginRight:8}} />
        <input name="position" placeholder="Chức vụ" value={form.position} onChange={e=>setForm({...form,position:e.target.value})} style={{marginRight:8}} />
        {editing ? (
          <>
            <button className="btn edit" onClick={handleUpdate}><FaEdit /> Cập nhật</button>
            <button className="btn delete" onClick={()=>{setEditing(null);setForm({ name: '', identification_number: '', phone: '', dob: '', address: '', email: '', position: '' });}}>Hủy</button>
          </>
        ) : (
          <button className="btn edit" onClick={handleAdd}><FaUserPlus /> Thêm</button>
        )}
      </div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#f5f7fa'}}>
            <th>ID</th>
            <th>Họ tên</th>
            <th>CMND/CCCD</th>
            <th>SĐT</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Tài khoản</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.contact_id} style={{background:'#fff',borderRadius:8}}>
              <td>{emp.contact_id}</td>
              <td>{emp.name}</td>
              <td>{emp.identification_number}</td>
              <td>{emp.phone}</td>
              <td>{emp.dob}</td>
              <td>{emp.address}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>
                {users.find(u => u.contact_id === emp.contact_id) ? (
                  <span style={{color:'green'}}>Đã có</span>
                ) : (
                  <button className="btn edit" onClick={()=>handleShowUserForm(emp.contact_id, emp.email)}>Tạo</button>
                )}
              </td>
              <td>
                <button className="btn edit" onClick={()=>handleEdit(emp)}><FaEdit /></button>
                <button className="btn delete" onClick={()=>handleDelete(emp.contact_id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup tạo tài khoản */}
      {showUserForm && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,60,114,0.15)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'white',borderRadius:12,padding:32,minWidth:340,boxShadow:'0 4px 24px rgba(30,60,114,0.15)'}}>
            <h3 style={{color:'#2a5298',marginBottom:18}}>Tạo tài khoản nhân viên</h3>
            <div><b>Email:</b> {userForm.email}</div>
            <input type="password" placeholder="Mật khẩu" value={userForm.password} onChange={e=>setUserForm({...userForm,password:e.target.value})} style={{width:'100%',padding:8,margin:'12px 0',borderRadius:6,border:'1px solid #bbb'}} />
            <button onClick={handleCreateUser} style={{marginTop:8,width:'100%',background:'#4caf50',color:'white',padding:10,border:'none',borderRadius:8}}>Tạo tài khoản</button>
            <button onClick={()=>setShowUserForm(false)} style={{marginTop:8,width:'100%',background:'#bbb',color:'white',padding:10,border:'none',borderRadius:8}}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManager; 