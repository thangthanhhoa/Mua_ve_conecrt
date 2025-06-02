import React, { useState } from 'react';
import CustomerManager from './CustomerManager';
import StageManager from './StageManager';
import ProgramManager from './ProgramManager';
import OrderManager from './OrderManager';
import TicketManager from './TicketManager';
import Dashboard from './Dashboard';
import EmployeeManager from './EmployeeManager';
import './AdminDashboard.css';
import { MdDashboard } from 'react-icons/md';
import { FaUserFriends, FaMapMarkerAlt, FaMusic, FaClipboardList, FaTicketAlt, FaUserTie } from 'react-icons/fa';

const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Quản trị viên</h2>
        <nav>
          <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}><MdDashboard style={{marginRight:8}}/>Tổng quan</button>
          <button className={tab === 'customer' ? 'active' : ''} onClick={() => setTab('customer')}><FaUserFriends style={{marginRight:8}}/>Khách hàng</button>
          <button className={tab === 'stage' ? 'active' : ''} onClick={() => setTab('stage')}><FaMapMarkerAlt style={{marginRight:8}}/>Địa điểm</button>
          <button className={tab === 'program' ? 'active' : ''} onClick={() => setTab('program')}><FaMusic style={{marginRight:8}}/>Chương trình</button>
          <button className={tab === 'order' ? 'active' : ''} onClick={() => setTab('order')}><FaClipboardList style={{marginRight:8}}/>Đơn hàng</button>
          <button className={tab === 'ticket' ? 'active' : ''} onClick={() => setTab('ticket')}><FaTicketAlt style={{marginRight:8}}/>Vé</button>
          <button className={tab === 'employee' ? 'active' : ''} onClick={() => setTab('employee')}><FaUserTie style={{marginRight:8}}/>Nhân viên</button>
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