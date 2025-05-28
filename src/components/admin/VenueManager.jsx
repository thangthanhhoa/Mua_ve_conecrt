import React from 'react';

const venues = [
  { name: "Nhà hát Hòa Bình", address: "240 Đường 3/2, Quận 10, TP.HCM", capacity: 2000 },
  { name: "Sân vận động QK7", address: "202 Hoàng Văn Thụ, Tân Bình, TP.HCM", capacity: 10000 }
];

const VenueManager = () => (
  <div style={{padding: 32}}>
    <h2>Quản lý địa điểm</h2>
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        <tr>
          <th>Tên địa điểm</th>
          <th>Địa chỉ</th>
          <th>Sức chứa</th>
        </tr>
      </thead>
      <tbody>
        {venues.map(v => (
          <tr key={v.name}>
            <td>{v.name}</td>
            <td>{v.address}</td>
            <td>{v.capacity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VenueManager; 