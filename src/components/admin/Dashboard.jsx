import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="admin-dashboard-main">
      <h2>Chào mừng Admin!</h2>
      <section className="admin-section">
        <h3>Thông báo hệ thống</h3>
        <ul>
          <li>Hệ thống sẽ bảo trì vào 23:00 ngày 30/05/2025.</li>
          <li>Vui lòng kiểm tra lại thông tin sự kiện trước khi duyệt đơn hàng.</li>
        </ul>
      </section>
      <section className="admin-section">
        <h3>Sự kiện sắp diễn ra trong tuần</h3>
        <ul>
          <li><b>Hòa nhạc Mùa Hè</b> - 2025-05-25 tại Nhà hát Hòa Bình</li>
          <li><b>Lễ hội Âm nhạc</b> - 2025-05-29 tại Sân vận động QK7</li>
        </ul>
      </section>
      <section className="admin-section">
        <h3>Đơn hàng lớn</h3>
        <ul>
          <li>Nguyễn Văn A - Hòa nhạc Mùa Hè - 1.000.000 VNĐ</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard; 