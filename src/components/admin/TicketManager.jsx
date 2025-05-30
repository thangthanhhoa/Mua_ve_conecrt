import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// Dữ liệu mẫu vé
const mockTickets = [
  { ticket_id: 1, code: 'ABC123', order_item_id: 1, status: 'new', time_checkin: '', customer: 'Nguyễn Văn A', event: 'Hòa nhạc Mùa Hè' },
  { ticket_id: 2, code: 'XYZ789', order_item_id: 2, status: 'checked', time_checkin: '2024-06-01 19:00', customer: 'Trần Thị B', event: 'Lễ hội Âm nhạc' },
  { ticket_id: 3, code: 'DEF456', order_item_id: 3, status: 'error', time_checkin: '', customer: 'Lê Văn C', event: 'Hòa nhạc Mùa Hè' },
];

const statusMap = {
  new: 'Chưa sử dụng',
  checked: 'Đã check-in',
  error: 'Lỗi'
};

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // TODO: Gọi API lấy danh sách vé
    setTickets(mockTickets);
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchSearch =
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.event.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (ticket_id) => {
    if (window.confirm('Bạn có chắc muốn xóa vé này?')) {
      setTickets(tickets.filter(t => t.ticket_id !== ticket_id));
    }
  };

  return (
    <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
      <h2 style={{marginBottom: 16}}>Quản lý vé</h2>
      <div style={{display:'flex',gap:16,marginBottom:16}}>
        <input
          type="text"
          placeholder="Tìm kiếm mã vé, khách, sự kiện..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{padding:8,borderRadius:6,border:'1px solid #bbb',width:220}}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{padding:8,borderRadius:6,border:'1px solid #bbb'}}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Chưa sử dụng</option>
          <option value="checked">Đã check-in</option>
          <option value="error">Lỗi</option>
        </select>
      </div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#f5f7fa'}}>
            <th>ID</th>
            <th>Mã vé</th>
            <th>Khách hàng</th>
            <th>Sự kiện</th>
            <th>Trạng thái</th>
            <th>Thời gian check-in</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length === 0 ? (
            <tr><td colSpan={7} style={{textAlign:'center',padding:18}}>Không có vé phù hợp.</td></tr>
          ) : filteredTickets.map(ticket => (
            <tr key={ticket.ticket_id} style={{background:'#fff',borderRadius:8}}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.code}</td>
              <td>{ticket.customer}</td>
              <td>{ticket.event}</td>
              <td style={{color:ticket.status==='checked'?'green':ticket.status==='error'?'red':'#2a5298',fontWeight:500}}>{statusMap[ticket.status]}</td>
              <td>{ticket.time_checkin || '-'}</td>
              <td>
                <button className="btn view" title="Xem" onClick={() => setSelectedTicket(ticket)}><FaEye /></button>
                <button className="btn delete" title="Xóa" onClick={() => handleDelete(ticket.ticket_id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup chi tiết vé */}
      {selectedTicket && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,60,114,0.15)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'white',borderRadius:12,padding:32,minWidth:340,boxShadow:'0 4px 24px rgba(30,60,114,0.15)'}}>
            <h3 style={{color:'#2a5298',marginBottom:18}}>Chi tiết vé</h3>
            <div><b>ID:</b> {selectedTicket.ticket_id}</div>
            <div><b>Mã vé:</b> {selectedTicket.code}</div>
            <div><b>Khách hàng:</b> {selectedTicket.customer}</div>
            <div><b>Sự kiện:</b> {selectedTicket.event}</div>
            <div><b>Trạng thái:</b> {statusMap[selectedTicket.status]}</div>
            <div><b>Thời gian check-in:</b> {selectedTicket.time_checkin || '-'}</div>
            <button onClick={() => setSelectedTicket(null)} style={{marginTop:14,width:'100%',background:'#bbb',color:'white',padding:10,border:'none',borderRadius:8}}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManager;
