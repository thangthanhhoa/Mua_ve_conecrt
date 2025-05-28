import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

const revenueData = {
  '2024-05': {
    total: 125000000,
    month: 25000000,
    week: 7000000,
    topEvents: [
      { name: "Hòa nhạc Mùa Hè", revenue: 50000000 },
      { name: "Rock Night", revenue: 30000000 }
    ]
  },
  '2024-06': {
    total: 140000000,
    month: 32000000,
    week: 9000000,
    topEvents: [
      { name: "Lễ hội Âm nhạc", revenue: 60000000 },
      { name: "Rock Night", revenue: 40000000 }
    ]
  }
};

const months = [
  { value: '2024-06', label: 'Tháng 6/2024' },
  { value: '2024-05', label: 'Tháng 5/2024' }
];

const Revenue = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');
  const stats = revenueData[selectedMonth];

  return (
    <div style={{padding: 32}}>
      <h2 style={{display:'flex',alignItems:'center',gap:8}}><FaChartLine /> Tổng doanh thu</h2>
      <div style={{marginBottom:16}}>
        <label>Chọn tháng: </label>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
      </div>
      <p><b>Tổng doanh thu:</b> {stats.total.toLocaleString('vi-VN')} VNĐ</p>
      <p><b>Tháng này:</b> {stats.month.toLocaleString('vi-VN')} VNĐ</p>
      <p><b>Tuần này:</b> {stats.week.toLocaleString('vi-VN')} VNĐ</p>
      <h3>Top sự kiện doanh thu cao</h3>
      <ul>
        {stats.topEvents.map(ev => (
          <li key={ev.name}>{ev.name}: {ev.revenue.toLocaleString('vi-VN')} VNĐ</li>
        ))}
      </ul>
    </div>
  );
};

export default Revenue; 