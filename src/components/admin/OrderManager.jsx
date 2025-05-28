import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const orders = [
  { id: 1, customer: "Nguyễn Văn A", event: "Hòa nhạc Mùa Hè", amount: 1000000, status: "Đã thanh toán", date: "2024-06-01" },
  { id: 2, customer: "Trần Thị B", event: "Lễ hội Âm nhạc", amount: 800000, status: "Chưa thanh toán", date: "2024-06-02" }
];

const OrderManager = () => (
  <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
    <h2 style={{marginBottom: 16}}>Quản lý đơn hàng</h2>
    <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'transparent'}}>
      <thead>
        <tr style={{background: '#f5f7fa'}}>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Khách hàng</th>
          <th style={thStyle}>Chương trình</th>
          <th style={thStyle}>Tổng tiền</th>
          <th style={thStyle}>Trạng thái</th>
          <th style={thStyle}>Ngày đặt</th>
          <th style={thStyle}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o.id} style={{background: '#fff', borderRadius: 8}}>
            <td style={tdStyle}>{o.id}</td>
            <td style={tdStyle}>{o.customer}</td>
            <td style={tdStyle}>{o.event}</td>
            <td style={tdStyle}>{o.amount.toLocaleString('vi-VN')} VNĐ</td>
            <td style={tdStyle}>{o.status}</td>
            <td style={tdStyle}>{o.date}</td>
            <td style={tdStyle}>
              <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                <button className="btn edit" title="Sửa" onClick={() => alert('Chức năng sửa đơn hàng sẽ được phát triển!')}><FaEdit /> Sửa</button>
                <button className="btn delete" title="Xóa"><FaTrash /> Xóa</button>
                <button className="btn view" title="Xem"><FaEye /> Xem</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

const thStyle = { padding: '12px 8px', fontWeight: 700, color: '#223', fontSize: '1.08rem', background: '#f5f7fa' };
const tdStyle = { padding: '10px 8px', fontSize: '1.02rem', color: '#222', background: '#fff' };

export default OrderManager; 