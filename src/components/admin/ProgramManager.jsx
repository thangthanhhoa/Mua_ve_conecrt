import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const defaultForm = { name: '', date: '', venue: '', status: '' };

const ProgramManager = () => {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('programs') || '[]');
    setPrograms(stored.length ? stored : [
      { id: 1, name: "Hòa nhạc Mùa Hè", date: "2025-05-25", venue: "Nhà hát Hòa Bình", status: "Sắp diễn ra" },
      { id: 2, name: "Rock Night", date: "2025-06-02", venue: "Sân vận động Thống Nhất", status: "Đang bán vé" }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('programs', JSON.stringify(programs));
  }, [programs]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.date || !form.venue || !form.status) return alert('Điền đủ thông tin!');
    setPrograms([...programs, { ...form, id: Date.now() }]);
    setForm(defaultForm);
  };

  const handleEdit = p => {
    setEditing(p.id);
    setForm(p);
  };

  const handleUpdate = () => {
    setPrograms(programs.map(p => p.id === editing ? { ...form, id: editing } : p));
    setEditing(null);
    setForm(defaultForm);
  };

  const handleDelete = id => {
    if (window.confirm('Xóa chương trình này?')) {
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  const handleView = p => setViewing(p);
  const closeView = () => setViewing(null);

  return (
    <div style={{padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 12}}>
      <h2 style={{marginBottom: 16}}>Quản lý chương trình</h2>
      <div style={{marginBottom: 24}}>
        <input name="name" placeholder="Tên chương trình" value={form.name} onChange={handleChange} style={{marginRight:8}} />
        <input name="date" type="date" placeholder="Ngày" value={form.date} onChange={handleChange} style={{marginRight:8}} />
        <input name="venue" placeholder="Địa điểm" value={form.venue} onChange={handleChange} style={{marginRight:8}} />
        <input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} style={{marginRight:8}} />
        {editing ? (
          <button className="btn edit" onClick={handleUpdate}><FaEdit /> Cập nhật</button>
        ) : (
          <button className="btn edit" onClick={handleAdd}><FaEdit /> Thêm</button>
        )}
      </div>
      <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'transparent'}}>
        <thead>
          <tr style={{background: '#f5f7fa'}}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Tên chương trình</th>
            <th style={thStyle}>Ngày</th>
            <th style={thStyle}>Địa điểm</th>
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(p => (
            <tr key={p.id} style={{background: '#fff', borderRadius: 8}}>
              <td style={tdStyle}>{p.id}</td>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.date}</td>
              <td style={tdStyle}>{p.venue}</td>
              <td style={tdStyle}>{p.status}</td>
              <td style={tdStyle}>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  <button className="btn edit" title="Sửa" onClick={() => handleEdit(p)}><FaEdit /> Sửa</button>
                  <button className="btn delete" title="Xóa" onClick={() => handleDelete(p.id)}><FaTrash /> Xóa</button>
                  <button className="btn view" title="Xem" onClick={() => handleView(p)}><FaEye /> Xem</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewing && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={closeView}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320}} onClick={e=>e.stopPropagation()}>
            <h3>Chi tiết chương trình</h3>
            <p><b>ID:</b> {viewing.id}</p>
            <p><b>Tên:</b> {viewing.name}</p>
            <p><b>Ngày:</b> {viewing.date}</p>
            <p><b>Địa điểm:</b> {viewing.venue}</p>
            <p><b>Trạng thái:</b> {viewing.status}</p>
            <button className="btn view" onClick={closeView}>Đóng</button>
          </div>
        </div>
      )}
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          border-radius: 8px;
          padding: 6px 16px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-right: 4px;
          margin-bottom: 2px;
        }
        .btn.edit { background: #2196f3; color: #fff; }
        .btn.delete { background: #f44336; color: #fff; }
        .btn.view { background: #4caf50; color: #fff; }
        .btn:active { opacity: 0.85; }
        th, td { text-align: center; }
      `}</style>
    </div>
  );
};

const thStyle = { padding: '12px 8px', fontWeight: 700, color: '#223', fontSize: '1.08rem', background: '#f5f7fa' };
const tdStyle = { padding: '10px 8px', fontSize: '1.02rem', color: '#222', background: '#fff' };

export default ProgramManager; 