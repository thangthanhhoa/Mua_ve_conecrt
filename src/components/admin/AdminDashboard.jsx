import React, { useState } from 'react';
import './AdminDashboard.css';
import Dashboard from './Dashboard';
import Revenue from './Revenue';
import CustomerManager from './CustomerManager';
import ProgramManager from './ProgramManager';
import OrderManager from './OrderManager';
import TicketManager from './TicketManager';
import { MdDashboard, MdAttachMoney, MdPeople, MdEvent, MdShoppingCart, MdConfirmationNumber, MdLogout } from 'react-icons/md';

const tabs = [
  { key: 'dashboard', label: 'Thông báo', icon: <MdDashboard /> },
  { key: 'revenue', label: 'Tổng doanh thu', icon: <MdAttachMoney /> },
  { key: 'customers', label: 'Quản lý khách hàng', icon: <MdPeople /> },
  { key: 'programs', label: 'Quản lý chương trình', icon: <MdEvent /> },
  { key: 'orders', label: 'Quản lý đơn hàng', icon: <MdShoppingCart /> },
  { key: 'tickets', label: 'Quản lý vé', icon: <MdConfirmationNumber /> },
];

const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState('dashboard');

  const renderContent = () => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard />;
      case 'revenue':
        return <Revenue />;
      case 'customers':
        return <CustomerManager />;
      case 'programs':
        return <ProgramManager />;
      case 'orders':
        return <OrderManager />;
      case 'tickets':
        return <TicketManager />;
      default:
        return <div style={{padding: 32}}><h3>{tabs.find(t => t.key === tab)?.label}</h3><p>Chức năng đang phát triển...</p></div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <nav>
          {tabs.map(t => (
            <button
              key={t.key}
              className={tab === t.key ? 'active' : ''}
              onClick={() => setTab(t.key)}
            >
              <span style={{marginRight:8, fontSize: '1.2em', verticalAlign: 'middle'}}>{t.icon}</span>{t.label}
            </button>
          ))}
          <button className="logout-btn" onClick={onLogout} style={{display:'flex',alignItems:'center',gap:8}}><MdLogout style={{fontSize:'1.2em'}}/>Đăng xuất</button>
        </nav>
      </aside>
      <main className="admin-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard; 