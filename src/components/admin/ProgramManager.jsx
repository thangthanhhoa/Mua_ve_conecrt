import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// Dữ liệu mẫu chương trình/sự kiện
const mockEvents = [
  { event_id: 1, name: 'Hòa nhạc Mùa Hè', date: '2024-06-01', stage_id: 1, status: 'Sắp diễn ra' },
  { event_id: 2, name: 'Lễ hội Âm nhạc', date: '2024-06-02', stage_id: 2, status: 'Đã kết thúc' }
];

// Dữ liệu mẫu địa điểm
const mockStages = [
  { stage_id: 1, name: 'Nhà Hát Lớn' },
  { stage_id: 2, name: 'Sân Vận Động' }
];

// Dữ liệu mẫu loại ghế
const mockTypes = [
  { type_id: 1, name: 'VIP' },
  { type_id: 2, name: 'Thường' }
];

// Dữ liệu mẫu ghế sự kiện
const mockStageSeatEvents = [
  { stage_seat_event_id: 1, event_id: 1, stage_id: 1, type_id: 1, row: 1, column: 1, price: 1000000, active: true, status: 'open' },
  { stage_seat_event_id: 2, event_id: 1, stage_id: 1, type_id: 2, row: 1, column: 2, price: 500000, active: true, status: 'sold' },
  { stage_seat_event_id: 3, event_id: 2, stage_id: 2, type_id: 1, row: 1, column: 1, price: 1200000, active: false, status: 'hold' }
];

const statusMap = {
  open: 'Còn trống',
  sold: 'Đã bán',
  hold: 'Đang giữ'
};

const ProgramManager = () => {
  const [events, setEvents] = useState([]);
  const [stages, setStages] = useState([]);
  const [types, setTypes] = useState([]);
  const [stageSeatEvents, setStageSeatEvents] = useState([]);
  const [showSeats, setShowSeats] = useState(null); // event_id đang xem ghế
  const [editingSeat, setEditingSeat] = useState(null);
  const [seatForm, setSeatForm] = useState({ row: '', column: '', type_id: '', price: '', active: true, status: 'open' });

  useEffect(() => {
    setEvents(mockEvents);
    setStages(mockStages);
    setTypes(mockTypes);
    setStageSeatEvents(mockStageSeatEvents);
  }, []);

  // Thao tác ghế sự kiện
  const handleAddSeat = (event_id, stage_id) => {
    if (!seatForm.row || !seatForm.column || !seatForm.type_id || !seatForm.price) {
      alert('Nhập đủ thông tin ghế!');
      return;
    }
    const newSeat = {
      stage_seat_event_id: Date.now(),
      event_id,
      stage_id,
      ...seatForm,
      type_id: Number(seatForm.type_id),
      price: Number(seatForm.price),
      active: Boolean(seatForm.active)
    };
    setStageSeatEvents([...stageSeatEvents, newSeat]);
    setSeatForm({ row: '', column: '', type_id: '', price: '', active: true, status: 'open' });
  };
  const handleEditSeat = (seat) => {
    setEditingSeat(seat.stage_seat_event_id);
    setSeatForm({
      row: seat.row,
      column: seat.column,
      type_id: seat.type_id,
      price: seat.price,
      active: seat.active,
      status: seat.status
    });
  };
  const handleUpdateSeat = (event_id, stage_id) => {
    setStageSeatEvents(stageSeatEvents.map(s =>
      s.stage_seat_event_id === editingSeat ? { ...seatForm, stage_seat_event_id: editingSeat, event_id, stage_id, type_id: Number(seatForm.type_id), price: Number(seatForm.price), active: Boolean(seatForm.active) } : s
    ));
    setEditingSeat(null);
    setSeatForm({ row: '', column: '', type_id: '', price: '', active: true, status: 'open' });
  };
  const handleDeleteSeat = (seat_id) => {
    if (window.confirm('Xóa ghế này?')) {
      setStageSeatEvents(stageSeatEvents.filter(s => s.stage_seat_event_id !== seat_id));
    }
  };

  return (
    <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
      <h2 style={{marginBottom: 16}}>Quản lý chương trình</h2>
      <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'transparent'}}>
        <thead>
          <tr style={{background: '#f5f7fa'}}>
            <th>ID</th>
            <th>Tên chương trình</th>
            <th>Ngày</th>
            <th>Địa điểm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.event_id} style={{background: '#fff', borderRadius: 8}}>
              <td>{ev.event_id}</td>
              <td>{ev.name}</td>
              <td>{ev.date}</td>
              <td>{stages.find(s=>s.stage_id===ev.stage_id)?.name}</td>
              <td>{ev.status}</td>
              <td>
                <button className="btn view" title="Sơ đồ ghế" onClick={()=>setShowSeats(ev.event_id)}><FaEye /> Ghế</button>
                {/* Các nút Sửa/Xóa chương trình nếu cần */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup sơ đồ ghế sự kiện */}
      {showSeats && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,60,114,0.15)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'white',borderRadius:12,padding:32,minWidth:600,maxWidth:900,maxHeight:'80vh',overflow:'auto',boxShadow:'0 4px 24px rgba(30,60,114,0.15)'}}>
            <h3 style={{color:'#2a5298',marginBottom:18}}>Sơ đồ ghế - {events.find(e=>e.event_id===showSeats)?.name}</h3>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f5f7fa'}}>
                  <th>Hàng</th>
                  <th>Cột</th>
                  <th>Loại ghế</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Hoạt động</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {stageSeatEvents.filter(s=>s.event_id===showSeats).map(seat=>(
                  <tr key={seat.stage_seat_event_id}>
                    <td>{seat.row}</td>
                    <td>{seat.column}</td>
                    <td>{types.find(t=>t.type_id===seat.type_id)?.name}</td>
                    <td>{seat.price.toLocaleString('vi-VN')}đ</td>
                    <td>{statusMap[seat.status]}</td>
                    <td>{seat.active ? 'Hoạt động' : 'Tắt'}</td>
                    <td>
                      <button onClick={()=>handleEditSeat(seat)}><FaEdit /></button>
                      <button onClick={()=>handleDeleteSeat(seat.stage_seat_event_id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Form thêm/sửa ghế */}
            <div style={{marginTop:18}}>
              <h4>{editingSeat ? 'Sửa ghế' : 'Thêm ghế mới'}</h4>
              <input type="number" placeholder="Hàng" value={seatForm.row} onChange={e=>setSeatForm({...seatForm,row:e.target.value})} style={{marginRight:8}} />
              <input type="number" placeholder="Cột" value={seatForm.column} onChange={e=>setSeatForm({...seatForm,column:e.target.value})} style={{marginRight:8}} />
              <select value={seatForm.type_id} onChange={e=>setSeatForm({...seatForm,type_id:e.target.value})} style={{marginRight:8}}>
                <option value="">Chọn loại ghế</option>
                {types.map(t=>(<option key={t.type_id} value={t.type_id}>{t.name}</option>))}
              </select>
              <input type="number" placeholder="Giá" value={seatForm.price} onChange={e=>setSeatForm({...seatForm,price:e.target.value})} style={{marginRight:8}} />
              <select value={seatForm.status} onChange={e=>setSeatForm({...seatForm,status:e.target.value})} style={{marginRight:8}}>
                <option value="open">Còn trống</option>
                <option value="sold">Đã bán</option>
                <option value="hold">Đang giữ</option>
              </select>
              <select value={seatForm.active} onChange={e=>setSeatForm({...seatForm,active:e.target.value==='true'})} style={{marginRight:8}}>
                <option value="true">Hoạt động</option>
                <option value="false">Tắt</option>
              </select>
              {editingSeat ? (
                <>
                  <button onClick={()=>handleUpdateSeat(showSeats, events.find(e=>e.event_id===showSeats)?.stage_id)}>Cập nhật</button>
                  <button onClick={()=>{setEditingSeat(null);setSeatForm({ row: '', column: '', type_id: '', price: '', active: true, status: 'open' });}}>Hủy</button>
                </>
              ) : (
                <button onClick={()=>handleAddSeat(showSeats, events.find(e=>e.event_id===showSeats)?.stage_id)}>Thêm ghế</button>
              )}
            </div>
            <button onClick={()=>{setShowSeats(null);setEditingSeat(null);setSeatForm({ row: '', column: '', type_id: '', price: '', active: true, status: 'open' });}} style={{marginTop:18,width:'100%',background:'#bbb',color:'white',padding:10,border:'none',borderRadius:8}}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramManager; 