import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(stored.length ? stored : [
      { id: 101, event: "Hòa nhạc Mùa Hè", seat: "A12", price: 500000, status: "Đã bán", customer: "Nguyễn Văn A" },
      { id: 102, event: "Rock Night", seat: "B15", price: 750000, status: "Còn trống", customer: "" }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleEdit = t => {
    setEditing(t.id);
    alert('Chức năng sửa vé sẽ được phát triển!');
  };

  const handleDelete = id => {
    if (window.confirm('Xóa vé này?')) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  const handleView = t => setViewing(t);
  const closeView = () => setViewing(null);

  return (
    <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
      <h2 style={{marginBottom: 16}}>Quản lý vé</h2>
      <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'transparent'}}>
        <thead>
          <tr style={{background: '#f5f7fa'}}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Sự kiện</th>
            <th style={thStyle}>Ghế</th>
            <th style={thStyle}>Giá</th>
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Khách hàng</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} style={{background: '#fff', borderRadius: 8}}>
              <td style={tdStyle}>{t.id}</td>
              <td style={tdStyle}>{t.event}</td>
              <td style={tdStyle}>{t.seat}</td>
              <td style={tdStyle}>{Number(t.price).toLocaleString('vi-VN')} VNĐ</td>
              <td style={tdStyle}>{t.status}</td>
              <td style={tdStyle}>{t.customer || '---'}</td>
              <td style={tdStyle}>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  <button className="btn edit" title="Sửa" onClick={() => handleEdit(t)}><FaEdit /> Sửa</button>
                  <button className="btn delete" title="Xóa" onClick={() => handleDelete(t.id)}><FaTrash /> Xóa</button>
                  <button className="btn view" title="Xem" onClick={() => handleView(t)}><FaEye /> Xem</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewing && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={closeView}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320}} onClick={e=>e.stopPropagation()}>
            <h3>Chi tiết vé</h3>
            <p><b>ID:</b> {viewing.id}</p>
            <p><b>Sự kiện:</b> {viewing.event}</p>
            <p><b>Ghế:</b> {viewing.seat}</p>
            <p><b>Giá:</b> {Number(viewing.price).toLocaleString('vi-VN')} VNĐ</p>
            <p><b>Trạng thái:</b> {viewing.status}</p>
            <p><b>Khách hàng:</b> {viewing.customer || '---'}</p>
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

export default TicketManager; 