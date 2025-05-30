import React, { useState, useEffect } from 'react';
import './StageSeatManager.css';

const StageSeatManager = () => {
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [seats, setSeats] = useState([]);
  const [newSeat, setNewSeat] = useState({
    row: '',
    col: '',
    type: 'normal',
    price: ''
  });


  useEffect(() => {
    if (selectedStage) {
      // Lấy danh sách ghế của sân khấu từ localStorage
      const storedSeats = JSON.parse(localStorage.getItem(`seats_${selectedStage.stage_id}`) || '[]');
      setSeats(storedSeats);
    }
  }, [selectedStage]);

  const handleAddSeat = () => {
    if (!selectedStage || !newSeat.row || !newSeat.col || !newSeat.price) {
      alert('Vui lòng chọn sân khấu và điền đầy đủ thông tin ghế!');
      return;
    }
    const seatToAdd = {
      ...newSeat,
      stage_seat_id: Date.now(),
      stage_id: selectedStage.stage_id,
      price: parseInt(newSeat.price)
    };
    const updatedSeats = [...seats, seatToAdd];
    setSeats(updatedSeats);
    localStorage.setItem(`seats_${selectedStage.stage_id}`, JSON.stringify(updatedSeats));
    setNewSeat({ row: '', col: '', type: 'normal', price: '' });
  };

  const handleEditSeat = (seat) => {
    setEditingSeat(seat);
    setNewSeat({
      row: seat.row,
      col: seat.col,
      type: seat.type,
      price: seat.price.toString()
    });
  };

  const handleUpdateSeat = () => {
    if (!editingSeat || !newSeat.row || !newSeat.col || !newSeat.price) {
      alert('Vui lòng điền đầy đủ thông tin ghế!');
      return;
    }

    const updatedSeats = seats.map(seat =>
      seat.stage_seat_id === editingSeat.stage_seat_id
        ? {
            ...newSeat,
            stage_seat_id: editingSeat.stage_seat_id,
            stage_id: selectedStage.stage_id,
            price: parseInt(newSeat.price)
          }
        : seat
    );

    setSeats(updatedSeats);
    localStorage.setItem(`seats_${selectedStage.stage_id}`, JSON.stringify(updatedSeats));
    setEditingSeat(null);
    setNewSeat({ row: '', col: '', type: 'normal', price: '' });
  };

  const handleDeleteSeat = (seatId) => {
    if (window.confirm('Bạn có chắc muốn xóa ghế này?')) {
      const updatedSeats = seats.filter(s => s.stage_seat_id !== seatId);
      setSeats(updatedSeats);
      localStorage.setItem(`seats_${selectedStage.stage_id}`, JSON.stringify(updatedSeats));
    }
  };

  const handleCancelEdit = () => {
    setEditingSeat(null);
    setNewSeat({ row: '', col: '', type: 'normal', price: '' });
  };

  return (
    <div className="stage-seat-manager">
      <h2>Quản lý ghế ngồi</h2>
      <div className="stage-selection">
        <h3>Chọn sân khấu</h3>
        <select
          value={selectedStage?.stage_id || ''}
          onChange={(e) => {
            const stage = stages.find(s => s.stage_id === parseInt(e.target.value));
            setSelectedStage(stage);
            setEditingSeat(null);
            setNewSeat({ row: '', col: '', type: 'normal', price: '' });
          }}
        >
          <option value="">Chọn sân khấu...</option>
          {stages.map(stage => (
            <option key={stage.stage_id} value={stage.stage_id}>
              {stage.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStage && (
        <>
          <div className="seat-form">
            <h3>{editingSeat ? 'Chỉnh sửa ghế' : 'Thêm ghế mới'}</h3>
            <input
              type="text"
              placeholder="Hàng (A, B, C...)"
              value={newSeat.row}
              onChange={(e) => setNewSeat({ ...newSeat, row: e.target.value.toUpperCase() })}
            />
            <input
              type="number"
              placeholder="Cột (1, 2, 3...)"
              value={newSeat.col}
              onChange={(e) => setNewSeat({ ...newSeat, col: e.target.value })}
            />
            <select
              value={newSeat.type}
              onChange={(e) => setNewSeat({ ...newSeat, type: e.target.value })}
            >
              <option value="normal">Ghế thường</option>
              <option value="vip">Ghế VIP</option>
              <option value="disabled">Ghế khuyết tật</option>
            </select>
            <input
              type="number"
              placeholder="Giá vé"
              value={newSeat.price}
              onChange={(e) => setNewSeat({ ...newSeat, price: e.target.value })}
            />
            {editingSeat ? (
              <div className="button-group">
                <button onClick={handleUpdateSeat}>Cập nhật</button>
                <button onClick={handleCancelEdit} className="cancel-button">Hủy</button>
              </div>
            ) : (
              <button onClick={handleAddSeat}>Thêm ghế</button>
            )}
          </div>

          <div className="seat-list">
            <h3>Danh sách ghế</h3>
            <table>
              <thead>
                <tr>
                  <th>Hàng</th>
                  <th>Cột</th>
                  <th>Loại ghế</th>
                  <th>Giá vé</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {seats.map(seat => (
                  <tr key={seat.stage_seat_id}>
                    <td>{seat.row}</td>
                    <td>{seat.col}</td>
                    <td>
                      {seat.type === 'normal' ? 'Ghế thường' :
                       seat.type === 'vip' ? 'Ghế VIP' : 'Ghế khuyết tật'}
                    </td>
                    <td>{seat.price.toLocaleString('vi-VN')}đ</td>
                    <td>
                      <button onClick={() => handleEditSeat(seat)}>Sửa</button>
                      <button onClick={() => handleDeleteSeat(seat.stage_seat_id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StageSeatManager;
