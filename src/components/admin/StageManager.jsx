import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import './StageManager.css';

const StageManager = () => {
  // State cho địa điểm
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [stageForm, setStageForm] = useState({
    name: '',
    address: '',
    row: '',
    column: ''
  });

  // State cho loại ghế
  const [seatTypes, setSeatTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [typeForm, setTypeForm] = useState({
    name: '',
    color: '#000000',
    price: ''
  });

  // State cho sơ đồ ghế
  const [showSeats, setShowSeats] = useState(null); // stage_id đang xem sơ đồ ghế
  const [seats, setSeats] = useState([]);
  const [seatForm, setSeatForm] = useState({ row: '', column: '', type_id: '', price: '', active: true });
  const [editingSeat, setEditingSeat] = useState(null);

  // Load dữ liệu
  useEffect(() => {
    // TODO: Gọi API lấy dữ liệu
    // Tạm thời dùng dữ liệu mẫu
    setStages([
      { stage_id: 1, name: 'Nhà Hát Lớn', address: 'Hà Nội', row: 10, column: 20 },
      { stage_id: 2, name: 'Sân Vận Động', address: 'TP.HCM', row: 15, column: 30 }
    ]);
    setSeatTypes([
      { type_id: 1, name: 'VIP', color: '#FFD700', price: 1000000 },
      { type_id: 2, name: 'Thường', color: '#FFFFFF', price: 500000 }
    ]);
    setSeats([
      { stage_seat_id: 1, stage_id: 1, row: 1, column: 1, type_id: 1, price: 1000000, active: true },
      { stage_seat_id: 2, stage_id: 1, row: 1, column: 2, type_id: 2, price: 500000, active: true },
      { stage_seat_id: 3, stage_id: 2, row: 1, column: 1, type_id: 1, price: 1200000, active: true }
    ]);
  }, []);

  // Xử lý địa điểm
  const handleAddStage = () => {
    if (!stageForm.name || !stageForm.address || !stageForm.row || !stageForm.column) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const newStage = {
      stage_id: stages.length + 1,
      ...stageForm
    };
    setStages([...stages, newStage]);
    setStageForm({ name: '', address: '', row: '', column: '' });
  };

  const handleEditStage = (stage) => {
    setSelectedStage(stage);
    setStageForm(stage);
  };

  const handleUpdateStage = () => {
    if (!selectedStage) return;
    setStages(stages.map(s => 
      s.stage_id === selectedStage.stage_id ? { ...stageForm, stage_id: s.stage_id } : s
    ));
    setSelectedStage(null);
    setStageForm({ name: '', address: '', row: '', column: '' });
  };

  const handleDeleteStage = (stageId) => {
    if (window.confirm('Bạn có chắc muốn xóa địa điểm này?')) {
      setStages(stages.filter(s => s.stage_id !== stageId));
    }
  };

  // Xử lý loại ghế
  const handleAddType = () => {
    if (!typeForm.name || !typeForm.price) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const newType = {
      type_id: seatTypes.length + 1,
      ...typeForm
    };
    setSeatTypes([...seatTypes, newType]);
    setTypeForm({ name: '', color: '#000000', price: '' });
  };

  const handleEditType = (type) => {
    setSelectedType(type);
    setTypeForm(type);
  };

  const handleUpdateType = () => {
    if (!selectedType) return;
    setSeatTypes(seatTypes.map(t => 
      t.type_id === selectedType.type_id ? { ...typeForm, type_id: t.type_id } : t
    ));
    setSelectedType(null);
    setTypeForm({ name: '', color: '#000000', price: '' });
  };

  const handleDeleteType = (typeId) => {
    if (window.confirm('Bạn có chắc muốn xóa loại ghế này?')) {
      setSeatTypes(seatTypes.filter(t => t.type_id !== typeId));
    }
  };

  // Thao tác ghế
  const handleAddSeat = (stage_id) => {
    if (!seatForm.row || !seatForm.column || !seatForm.type_id || !seatForm.price) {
      alert('Nhập đủ thông tin ghế!');
      return;
    }
    const newSeat = {
      stage_seat_id: Date.now(),
      stage_id,
      ...seatForm,
      type_id: Number(seatForm.type_id),
      price: Number(seatForm.price),
      active: Boolean(seatForm.active)
    };
    setSeats([...seats, newSeat]);
    setSeatForm({ row: '', column: '', type_id: '', price: '', active: true });
  };

  const handleEditSeat = (seat) => {
    setEditingSeat(seat.stage_seat_id);
    setSeatForm({
      row: seat.row,
      column: seat.column,
      type_id: seat.type_id,
      price: seat.price,
      active: seat.active
    });
  };

  const handleUpdateSeat = (stage_id) => {
    setSeats(seats.map(s =>
      s.stage_seat_id === editingSeat ? { ...seatForm, stage_seat_id: editingSeat, stage_id: stage_id, type_id: Number(seatForm.type_id), price: Number(seatForm.price), active: Boolean(seatForm.active) } : s
    ));
    setEditingSeat(null);
    setSeatForm({ row: '', column: '', type_id: '', price: '', active: true });
  };

  const handleDeleteSeat = (seat_id) => {
    if (window.confirm('Xóa ghế này?')) {
      setSeats(seats.filter(s => s.stage_seat_id !== seat_id));
    }
  };

  return (
    <div className="stage-manager">
      <h2>Quản lý địa điểm</h2>
      
      {/* Form thêm/sửa địa điểm */}
      <div className="stage-form">
        <h3>{selectedStage ? 'Sửa địa điểm' : 'Thêm địa điểm mới'}</h3>
        <input
          type="text"
          placeholder="Tên địa điểm"
          value={stageForm.name}
          onChange={(e) => setStageForm({ ...stageForm, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={stageForm.address}
          onChange={(e) => setStageForm({ ...stageForm, address: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số hàng ghế"
          value={stageForm.row}
          onChange={(e) => setStageForm({ ...stageForm, row: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số cột ghế"
          value={stageForm.column}
          onChange={(e) => setStageForm({ ...stageForm, column: e.target.value })}
        />
        <div className="button-group">
          {selectedStage ? (
            <>
              <button onClick={handleUpdateStage}>Cập nhật</button>
              <button className="cancel-button" onClick={() => {
                setSelectedStage(null);
                setStageForm({ name: '', address: '', row: '', column: '' });
              }}>Hủy</button>
            </>
          ) : (
            <button onClick={handleAddStage}>Thêm địa điểm</button>
          )}
        </div>
      </div>

      {/* Danh sách địa điểm */}
      <div className="stage-list">
        <h3>Danh sách địa điểm</h3>
        <table>
          <thead>
            <tr>
              <th>Tên địa điểm</th>
              <th>Địa chỉ</th>
              <th>Số hàng</th>
              <th>Số cột</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {stages.map(stage => (
              <tr key={stage.stage_id}>
                <td>{stage.name}</td>
                <td>{stage.address}</td>
                <td>{stage.row}</td>
                <td>{stage.column}</td>
                <td>
                  <button onClick={() => handleEditStage(stage)}><FaEdit /> Sửa</button>
                  <button onClick={() => handleDeleteStage(stage.stage_id)}><FaTrash /> Xóa</button>
                  <button onClick={() => setShowSeats(stage.stage_id)}><FaEye /> Sơ đồ ghế</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form thêm/sửa loại ghế */}
      <div className="stage-form">
        <h3>{selectedType ? 'Sửa loại ghế' : 'Thêm loại ghế mới'}</h3>
        <input
          type="text"
          placeholder="Tên loại ghế"
          value={typeForm.name}
          onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
        />
        <input
          type="color"
          value={typeForm.color}
          onChange={(e) => setTypeForm({ ...typeForm, color: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá vé"
          value={typeForm.price}
          onChange={(e) => setTypeForm({ ...typeForm, price: e.target.value })}
        />
        <div className="button-group">
          {selectedType ? (
            <>
              <button onClick={handleUpdateType}>Cập nhật</button>
              <button className="cancel-button" onClick={() => {
                setSelectedType(null);
                setTypeForm({ name: '', color: '#000000', price: '' });
              }}>Hủy</button>
            </>
          ) : (
            <button onClick={handleAddType}>Thêm loại ghế</button>
          )}
        </div>
      </div>

      {/* Danh sách loại ghế */}
      <div className="stage-list">
        <h3>Danh sách loại ghế</h3>
        <table>
          <thead>
            <tr>
              <th>Tên loại</th>
              <th>Màu sắc</th>
              <th>Giá vé</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {seatTypes.map(type => (
              <tr key={type.type_id}>
                <td>{type.name}</td>
                <td>
                  <div style={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: type.color,
                    border: '1px solid #ccc'
                  }}></div>
                </td>
                <td>{type.price.toLocaleString('vi-VN')}đ</td>
                <td>
                  <button onClick={() => handleEditType(type)}><FaEdit /> Sửa</button>
                  <button onClick={() => handleDeleteType(type.type_id)}><FaTrash /> Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup sơ đồ ghế */}
      {showSeats && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,60,114,0.15)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'white',borderRadius:12,padding:32,minWidth:600,maxWidth:900,maxHeight:'80vh',overflow:'auto',boxShadow:'0 4px 24px rgba(30,60,114,0.15)'}}>
            <h3 style={{color:'#2a5298',marginBottom:18}}>Sơ đồ ghế - {stages.find(s=>s.stage_id===showSeats)?.name}</h3>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f5f7fa'}}>
                  <th>Hàng</th>
                  <th>Cột</th>
                  <th>Loại ghế</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {seats.filter(s=>s.stage_id===showSeats).map(seat=>(
                  <tr key={seat.stage_seat_id}>
                    <td>{seat.row}</td>
                    <td>{seat.column}</td>
                    <td>{seatTypes.find(t=>t.type_id===seat.type_id)?.name}</td>
                    <td>{seat.price.toLocaleString('vi-VN')}đ</td>
                    <td>{seat.active ? 'Hoạt động' : 'Tắt'}</td>
                    <td>
                      <button onClick={()=>handleEditSeat(seat)}><FaEdit /></button>
                      <button onClick={()=>handleDeleteSeat(seat.stage_seat_id)}><FaTrash /></button>
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
                {seatTypes.map(t=>(<option key={t.type_id} value={t.type_id}>{t.name}</option>))}
              </select>
              <input type="number" placeholder="Giá" value={seatForm.price} onChange={e=>setSeatForm({...seatForm,price:e.target.value})} style={{marginRight:8}} />
              <select value={seatForm.active} onChange={e=>setSeatForm({...seatForm,active:e.target.value==='true'})} style={{marginRight:8}}>
                <option value="true">Hoạt động</option>
                <option value="false">Tắt</option>
              </select>
              {editingSeat ? (
                <>
                  <button onClick={()=>handleUpdateSeat(showSeats)}>Cập nhật</button>
                  <button onClick={()=>{setEditingSeat(null);setSeatForm({ row: '', column: '', type_id: '', price: '', active: true });}}>Hủy</button>
                </>
              ) : (
                <button onClick={()=>handleAddSeat(showSeats)}>Thêm ghế</button>
              )}
            </div>
            <button onClick={()=>{setShowSeats(null);setEditingSeat(null);setSeatForm({ row: '', column: '', type_id: '', price: '', active: true });}} style={{marginTop:18,width:'100%',background:'#bbb',color:'white',padding:10,border:'none',borderRadius:8}}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageManager;