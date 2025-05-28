import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('customers') || '[]');
    setCustomers(stored.length ? stored : [
      { id: 1, name: "Nguyễn Văn A", phone: "0901234567", email: "a@gmail.com", totalOrders: 3 },
      { id: 2, name: "Trần Thị B", phone: "0912345678", email: "b@gmail.com", totalOrders: 2 }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const handleEdit = c => {
    setEditing(c.id);
    alert('Chức năng sửa khách hàng sẽ được phát triển!');
  };

  const handleDelete = id => {
    if (window.confirm('Xóa khách hàng này?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleView = c => setViewing(c);
  const closeView = () => setViewing(null);

  return (
    <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
      <h2 style={{marginBottom: 16}}>Quản lý khách hàng</h2>
      <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'transparent'}}>
        <thead>
          <tr style={{background: '#f5f7fa'}}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Họ tên</th>
            <th style={thStyle}>Số điện thoại</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Số đơn hàng</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} style={{background: '#fff', borderRadius: 8}}>
              <td style={tdStyle}>{c.id}</td>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>{c.phone}</td>
              <td style={tdStyle}>{c.email}</td>
              <td style={tdStyle}>{c.totalOrders}</td>
              <td style={tdStyle}>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  <button className="btn edit" title="Sửa" onClick={() => handleEdit(c)}><FaEdit /> Sửa</button>
                  <button className="btn delete" title="Xóa" onClick={() => handleDelete(c.id)}><FaTrash /> Xóa</button>
                  <button className="btn view" title="Xem" onClick={() => handleView(c)}><FaEye /> Xem</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewing && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={closeView}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320}} onClick={e=>e.stopPropagation()}>
            <h3>Chi tiết khách hàng</h3>
            <p><b>ID:</b> {viewing.id}</p>
            <p><b>Họ tên:</b> {viewing.name}</p>
            <p><b>Số điện thoại:</b> {viewing.phone}</p>
            <p><b>Email:</b> {viewing.email}</p>
            <p><b>Số đơn hàng:</b> {viewing.totalOrders}</p>
            <button className="btn view" onClick={closeView}>Đóng</button>
          </div>
        </div>
      )}
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          border-radius: 8px;
          padding: 6px 16px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 2px;
        }
        .btn.edit { background: #2196f3; color: #fff; }
        .btn.delete { background: #f44336; color: #fff; }
        .btn.view { background: #4caf50; color: #fff; }
        .btn:active { opacity: 0.85; }
        th, td { text-align: center; }
      `}</style>
    </div>
  );
};

const thStyle = { padding: '12px 8px', fontWeight: 700, color: '#223', fontSize: '1.08rem', background: '#f5f7fa' };
const tdStyle = { padding: '10px 8px', fontSize: '1.02rem', color: '#222', background: '#fff' };

export default CustomerManager; 