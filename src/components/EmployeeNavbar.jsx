import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeNavbar.css';

const EmployeeNavbar = () => {
  return (
    <nav className="employee-navbar">
      <div className="navbar-brand">
        <Link to="/employee/dashboard">Hệ thống quản lý vé</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/employee/tickets" className="nav-link">
          <i className="fas fa-ticket-alt"></i>
          Quản lý vé
        </Link>
        
        <Link to="/employee/check-in" className="nav-link">
          <i className="fas fa-check-circle"></i>
          Check-in
        </Link>
        
        <Link to="/employee/payments" className="nav-link">
          <i className="fas fa-money-bill-wave"></i>
          Thanh toán
        </Link>
        
        <Link to="/employee/search" className="nav-link">
          <i className="fas fa-search"></i>
          Tìm kiếm
        </Link>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          <span>Nhân viên</span>
        </div>
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default EmployeeNavbar; 