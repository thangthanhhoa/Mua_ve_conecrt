import React, { useState } from 'react';
import CustomerManager from './CustomerManager';
import StageManager from './StageManager';
import ProgramManager from './ProgramManager';
import OrderManager from './OrderManager';
import TicketManager from './TicketManager';
import Dashboard from './Dashboard';
import EmployeeManager from './EmployeeManager';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Quản trị viên</h2>
        <nav>
          <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>Tổng quan</button>
          <button className={tab === 'customer' ? 'active' : ''} onClick={() => setTab('customer')}>Khách hàng</button>
          <button className={tab === 'stage' ? 'active' : ''} onClick={() => setTab('stage')}>Địa điểm</button>
          <button className={tab === 'program' ? 'active' : ''} onClick={() => setTab('program')}>Chương trình</button>
          <button className={tab === 'order' ? 'active' : ''} onClick={() => setTab('order')}>Đơn hàng</button>
          <button className={tab === 'ticket' ? 'active' : ''} onClick={() => setTab('ticket')}>Vé</button>
          <button className={tab === 'employee' ? 'active' : ''} onClick={() => setTab('employee')}>Nhân viên</button>
          <button className="logout-btn" onClick={onLogout}>Đăng xuất</button>
        </nav>
      </aside>
      <main className="admin-content">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'customer' && <CustomerManager />}
        {tab === 'stage' && <StageManager />}
        {tab === 'program' && <ProgramManager />}
        {tab === 'order' && <OrderManager />}
        {tab === 'ticket' && <TicketManager />}
        {tab === 'employee' && <EmployeeManager />}
      </main>
    </div>
  );
};

export default AdminDashboard; 