import React from 'react';
import './Invoice.css';

const Invoice = ({ invoice }) => {
  if (!invoice) return <div className="invoice-error">Không tìm thấy hóa đơn.</div>;
  return (
    <div className="invoice-container">
      <h2>Hóa Đơn</h2>
      <div><b>Mã đơn hàng:</b> {invoice.order_id}</div>
      <div><b>Khách hàng:</b> {invoice.customer_name}</div>
      <div><b>Email:</b> {invoice.customer_email}</div>
      <div><b>Số điện thoại:</b> {invoice.customer_phone}</div>
      <div><b>Ngày đặt:</b> {invoice.order_date}</div>
      <div><b>Trạng thái:</b> {invoice.status}</div>
      <div><b>Tổng tiền:</b> {invoice.total_amount?.toLocaleString('vi-VN')} VNĐ</div>
      <h3>Chi tiết vé</h3>
      <ul>
        {invoice.items?.map((item, idx) => (
          <li key={idx}>{item.event_name} - {item.ticket_type} - {item.quantity} vé - {item.price?.toLocaleString('vi-VN')} VNĐ</li>
        ))}
      </ul>
      <div className="invoice-footer">Cảm ơn quý khách!</div>
    </div>
  );
};

export default Invoice; 