import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Lấy đơn hàng từ localStorage (giả lập)
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(stored);
  }, []);

  if (orders.length === 0) {
    return <div className="order-history-empty">Bạn chưa có đơn đặt vé nào.</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Lịch Sử Đơn Hàng</h2>
      <div className="order-list">
        {orders.map(order => (
          <div className="order-card" key={order.order_id}>
            <div className="order-header">
              <h3>Đơn hàng #{order.order_id}</h3>
              <span className={`status ${order.status}`}>{order.status === 'new' ? 'Mới' : order.status === 'done' ? 'Hoàn thành' : 'Đã hủy'}</span>
            </div>
            <div className="order-info">
              <div><b>Sự kiện:</b> {order.event_name}</div>
              <div><b>Thời gian:</b> {order.event_time}</div>
              <div><b>Địa điểm:</b> {order.venue_name}</div>
              <div><b>Số lượng vé:</b> {order.ticket_count}</div>
              <div><b>Tổng tiền:</b> {order.total_amount?.toLocaleString('vi-VN')} VNĐ</div>
            </div>
            <div className="order-actions">
              <button className="view-tickets" onClick={() => alert('Xem vé chưa được tích hợp!')}>Xem Vé</button>
              {order.status === 'done' && (
                <button className="download-invoice" onClick={() => alert('Tải hóa đơn chưa được tích hợp!')}>Tải Hóa Đơn</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 