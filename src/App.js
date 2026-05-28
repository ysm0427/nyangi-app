import React, { useState, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [activePet, setActivePet] = useState('vella'); 

  // 🎨 테마 상태 관리
  const themes = [
    { id: '민트 (기본)', color: '#059669', bg: '#eaf8f5', border: '#a7ecd9', btn: '#10b981' },
    { id: '딸기 핑크', color: '#be185d', bg: '#fce7f3', border: '#fbcfe8', btn: '#ec4899' },
    { id: '라벤더 퍼플', color: '#7e22ce', bg: '#f3e8ff', border: '#e9d5ff', btn: '#a855f7' }
  ];
  const [themeIdx, setThemeIdx] = useState(0);
  const currentTheme = themes[themeIdx];

  const navItems = [
    { id: 'care', label: '오늘 케어', icon: "🐾" },
    { id: 'calendar', label: '종합 달력', icon: "📅" },
    { id: 'expense', label: '지출 관리', icon: "💸" },
    { id: 'album', label: '냥이 앨범', icon: "📸" },
    { id: 'trash', label: '휴지통', icon: "🗑️" },
    { id: 'create', label: '설정/제작', icon: "⚙️" }
  ];

  // === 1. 냥이 프로필 관리 ===
  const [pets, setPets] = useState({
    vella: { id: 'vella', name: '벨라', gender: '여아 ♀', birth: '2024-01-20', icon: '👑', img: null },
    roy: { id: 'roy', name: '로이', gender: '남아 ♂', birth: '2025-03-15', icon: '🍼', img: null }
  });
  const [showPetModal, setShowPetModal] = useState(false);
  const [editPetData, setEditPetData] = useState({ name: '', gender: '', birth: '' });
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onloadend=()=>setPets({...pets, [activePet]: {...pets[activePet], img: r.result}}); r.readAsDataURL(f); } };
  const handleProfileDelete = () => setPets({...pets, [activePet]: {...pets[activePet], img: null}});
  
  const openPetEditModal = () => { setEditPetData(pets[activePet]); setShowPetModal(true); };
  const savePetEdit = () => { setPets({...pets, [activePet]: {...pets[activePet], ...editPetData}}); setShowPetModal(false); };

  // === 2. 케어 항목 관리 (추가/수정/삭제) ===
  const [careList, setCareList] = useState({
    vella: [{ id: 1, icon: '💧', title: '음수량 측정', unit: 'ml', color: '#3b82f6', bg: '#eff6ff', borderColor: '#bfdbfe' }, { id: 2, icon: '🪮', title: '코트 빗질', unit: '회', color: '#9333ea', bg: '#faf5ff', borderColor: '#e9d5ff' }],
    roy: [{ id: 3, icon: '💊', title: '영양제 챙기기', unit: '알', color: '#e11d48', bg: '#fff1f2', borderColor: '#fecdd3' }]
  });
  const [careModalConfig, setCareModalConfig] = useState({ isOpen: false, mode: 'add', editId: null });
  const [careTitle, setCareTitle] = useState(''); const [careUnit, setCareUnit] = useState('');

  const openCareModal = (mode, item = null) => {
    setCareModalConfig({ isOpen: true, mode, editId: item ? item.id : null });
    setCareTitle(item ? item.title : ''); setCareUnit(item ? item.unit : '');
  };

  const saveCareItem = () => {
    if(!careTitle) return;
    if (careModalConfig.mode === 'add') {
      const newItem = { id: Date.now(), icon: '✨', title: careTitle, unit: careUnit || '회', color: currentTheme.color, bg: currentTheme.bg, borderColor: currentTheme.border };
      setCareList({...careList, [activePet]: [...careList[activePet], newItem]});
    } else {
      setCareList({...careList, [activePet]: careList[activePet].map(item => item.id === careModalConfig.editId ? { ...item, title: careTitle, unit: careUnit } : item)});
    }
    setCareModalConfig({ isOpen: false, mode: 'add', editId: null });
  };
  const handleDeleteCare = (item) => { setTrashItems([{ id: Date.now(), type: 'care', title: item.title, date: new Date().toLocaleDateString(), originalData: item, petId: activePet }, ...trashItems]); setCareList({...careList, [activePet]: careList[activePet].filter(i => i.id !== item.id)}); };

  // === 3. 종합 달력 ===
  const [currentDate, setCurrentDate] = useState(new Date()); const [selectedDate, setSelectedDate] = useState(new Date()); const [schedules, setSchedules] = useState({}); const [newSchedule, setNewSchedule] = useState('');
  const currentYear = currentDate.getFullYear(); const currentMonth = currentDate.getMonth();
  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1)); const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const selectedDateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;
  const handleAddSchedule = () => { if(!newSchedule) return; setSchedules({...schedules, [selectedDateString]: [...(schedules[selectedDateString] || []), { id: Date.now(), text: newSchedule }]}); setNewSchedule(''); };
  const handleDeleteSchedule = (dateStr, id) => setSchedules({...schedules, [dateStr]: schedules[dateStr].filter(s => s.id !== id)});

  // === 4. 지출, 휴지통, 앨범(다중 선택/삭제), 설정 ===
  const [expenses, setExpenses] = useState([]); const [expName, setExpName] = useState(''); const [expPrice, setExpPrice] = useState(''); const [expImg, setExpImg] = useState(null);
  const [trashItems, setTrashItems] = useState([]); 
  const [albumPhotos, setAlbumPhotos] = useState([{ id: 1, src: 'https://via.placeholder.com/150/eeeeee/aaaaaa?text=Photo+1' }]); 
  const albumInputRef = useRef(null); 
  const [settingView, setSettingView] = useState(null);

  const handleExpenseSubmit = (e) => { e.preventDefault(); setExpenses([{ id: Date.now(), name: expName, date: new Date().toLocaleDateString(), price: Number(expPrice).toLocaleString(), img: expImg }, ...expenses]); setExpName(''); setExpPrice(''); setExpImg(null); };
  const handleRestoreTrash = (item) => { if(item.type === 'care') setCareList({...careList, [item.petId]: [...careList[item.petId], item.originalData]}); setTrashItems(trashItems.filter(i => i.id !== item.id)); };
  const handlePermanentDelete = (id) => setTrashItems(trashItems.filter(i => i.id !== id));

  // 앨범 다중 사진 등록
  const handleAlbumUpload = async (e) => {
    const files = Array.from(e.target.files);
    if(files.length === 0) return;
    
    const filePromises = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ id: Date.now() + Math.random(), src: reader.result });
        reader.readAsDataURL(file);
      });
    });
    const newPhotos = await Promise.all(filePromises);
    setAlbumPhotos(prev => [...newPhotos, ...prev]);
  };
  
  // 앨범 개별 사진 삭제
  const handleAlbumDelete = (id) => {
    setAlbumPhotos(albumPhotos.filter(photo => photo.id !== id));
  };

  // ================= 🎨 테마 연동 동적 CSS =================
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: #e8eaed; color: #333; display: flex; justify-content: center; height: 100vh; height: 100dvh; overflow: hidden; }
    #app-container { width: 100vw; max-width: 480px; background-color: #f7f9fa; height: 100%; height: 100dvh; display: flex; flex-direction: column; position: relative; overflow: hidden; }
    @media (min-width: 481px) { #app-container { box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; } }
    .fade-in { animation: fadeIn 0.2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .top-pet-nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; padding-top: max(15px, env(safe-area-inset-top)); background-color: ${currentTheme.bg}; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; flex-shrink: 0; z-index: 10; transition: background-color 0.3s; }
    .pet-tab { background: #fff; border: 1px solid #e0e0e0; padding: 8px 14px; border-radius: 20px; font-weight: 600; font-size: 14px; color: #999; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s; }
    .pet-tab.active { color: #333; border-color: ${currentTheme.border}; box-shadow: 0 2px 5px ${currentTheme.color}33; }
    .btn-theme { width: 100%; background: ${currentTheme.border}; color: ${currentTheme.color}; border: none; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: bold; cursor: pointer; transition: background 0.3s; }
    .cal-day.active { background: ${currentTheme.border}; color: ${currentTheme.color}; font-weight: bold; }
    
    .page-header { padding: 20px; padding-top: max(20px, env(safe-area-inset-top)); background: #fff; font-size: 18px; font-weight: 700; text-align: center; border-bottom: 1px solid #eee; z-index: 10; }
    .pet-edit-btn { background: #344054; color: #fff; border: none; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; }
    main { flex: 1; overflow-y: auto; padding: 20px; position: relative; }
    .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    
    .profile-card { background: #fff; border: 1px solid ${currentTheme.border}; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-bottom: 20px; position: relative; }
    .profile-avatar { width: 75px; height: 75px; border-radius: 50%; border: 2px dashed #d1d5db; display: flex; justify-content: center; align-items: center; font-size: 30px; background: #f9fafb; cursor: pointer; overflow: hidden; position: relative; }
    .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .delete-photo-btn { position: absolute; top: 10px; right: 10px; background: #fee2e2; color: #ef4444; border: none; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; z-index: 5; }
    
    .care-item { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 15px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .care-left { display: flex; align-items: center; gap: 15px; }
    .care-icon { width: 45px; height: 45px; border-radius: 50%; border: 2px solid; display: flex; justify-content: center; align-items: center; font-size: 20px; flex-shrink: 0; }
    .action-icon-btn { background: #f5f5f5; border: none; color: #555; font-size: 14px; cursor: pointer; padding: 8px; border-radius: 8px; margin-left: 5px; }
    .action-icon-btn.delete { background: #fee2e2; color: #ef4444; }

    /* 모달 UI */
    .modal-overlay { position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 300; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .modal-content { background: #fff; width: 100%; max-width: 360px; border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .modal-input { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; font-size: 15px; outline: none; }
    .modal-input:focus { border-color: ${currentTheme.color}; }

    nav { background: #fff; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 10px 0; padding-bottom: max(25px, env(safe-area-inset-bottom)); flex-shrink: 0; z-index: 100; position: relative; }
    .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #b0b8c1; cursor: pointer; font-size: 11px; font-weight: 500; opacity: 0.6; transition: all 0.2s; width: 100%; }
    .nav-btn.active { opacity: 1; transform: translateY(-3px); color: ${currentTheme.btn}; font-weight: 700; }
    .nav-icon { font-size: 22px; }
    
    .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-weight: bold; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center; }
    .cal-day-name { font-size: 12px; color: #888; padding-bottom: 10px; }
    .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; border-radius: 8px; background: #fafafa; cursor: pointer; position: relative; }
    .cal-dot { width: 5px; height: 5px; background: #e11d48; border-radius: 50%; position: absolute; bottom: 4px; }
    
    /* 앨범 개별 사진 UI */
    .album-item-container { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; background: #eee; }
    .album-item-container img { width: 100%; height: 100%; object-fit: cover; }
    .album-del-btn { position: absolute; top: 5px; right: 5px; background: rgba(225, 29, 72, 0.9); color: #fff; border: none; width: 24px; height: 24px; border-radius: 50%; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    
    .sub-page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-size: 18px; font-weight: bold; }
    .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }
  `;

  return (
    <div id="app-container">
      <style>{styles}</style>
      
      {activeTab === 'care' ? (
        <div className="top-pet-nav fade-in">
          <div className="pet-tabs">
            <button className={`pet-tab ${activePet === 'vella' ? 'active' : ''}`} onClick={() => setActivePet('vella')}>👑 벨라</button>
            <button className={`pet-tab ${activePet === 'roy' ? 'active' : ''}`} onClick={() => setActivePet('roy')}>🍼 로이</button>
          </div>
          <button className="pet-edit-btn" onClick={openPetEditModal}>⚙️ 냥이 추가/수정</button>
        </div>
      ) : (
        <div className="page-header fade-in">
          {activeTab === 'calendar' && '종합 달력'}
          {activeTab === 'expense' && '지출 관리'}
          {activeTab === 'album' && '냥이 앨범'}
          {activeTab === 'trash' && '휴지통'}
          {activeTab === 'create' && '설정 및 제작'}
        </div>
      )}

      <main>
        {/* ================= 1. 오늘 케어 ================= */}
        {activeTab === 'care' && (
          <div className="fade-in">
            <div className="profile-card">
              {pets[activePet].img && <button className="delete-photo-btn" onClick={handleProfileDelete}>사진 삭제</button>}
              <input type="file" ref={profileInputRef} style={{display:'none'}} accept="image/*" onChange={handleProfileUpload} />
              <div className="profile-avatar" onClick={() => profileInputRef.current.click()}>
                {pets[activePet].img ? <img src={pets[activePet].img} alt="메인사진" /> : pets[activePet].icon}
              </div>
              <div>
                <h2 style={{fontSize:'18px', marginBottom:'6px'}}>{pets[activePet].name} <span style={{background: '#ffe4e6', color: '#e11d48', fontSize: '11px', padding: '2px 6px', borderRadius: '10px'}}>{pets[activePet].gender}</span></h2>
                <p style={{fontSize: '13px', color: currentTheme.color, fontWeight: '600'}}>🎂 생일: {pets[activePet].birth}</p>
                <p style={{fontSize: '11px', color: '#888', marginTop: '4px'}}>프로필 동그라미를 눌러 사진 등록</p>
              </div>
            </div>
            
            {careList[activePet].map(item => (
              <div key={item.id} className="care-item">
                <div className="care-left">
                  <div className="care-icon" style={{ borderColor: item.borderColor, color: item.color, background: item.bg }}>{item.icon}</div>
                  <div><h3 style={{fontSize:'15px', marginBottom:'2px'}}>{item.title}</h3><p style={{fontSize:'12px', color:'#0d9488'}}>단위: {item.unit}</p></div>
                </div>
                <div style={{display:'flex'}}>
                  <button className="action-icon-btn" onClick={() => openCareModal('edit', item)}>✏️</button>
                  <button className="action-icon-btn delete" onClick={() => handleDeleteCare(item)}>🗑️</button>
                </div>
              </div>
            ))}
            <button className="btn-theme" style={{marginTop:'10px'}} onClick={() => openCareModal('add')}>+ 새로운 케어 항목 추가</button>
          </div>
        )}

        {/* 냥이 프로필 수정 팝업창 */}
        {showPetModal && (
          <div className="modal-overlay">
            <div className="modal-content fade-in">
              <h3 style={{marginBottom:'15px'}}>🐾 프로필 수정</h3>
              <label style={{fontSize:'13px', color:'#666'}}>이름</label>
              <input className="modal-input" value={editPetData.name} onChange={e => setEditPetData({...editPetData, name: e.target.value})} />
              <label style={{fontSize:'13px', color:'#666'}}>성별 (예: 여아 ♀)</label>
              <input className="modal-input" value={editPetData.gender} onChange={e => setEditPetData({...editPetData, gender: e.target.value})} />
              <label style={{fontSize:'13px', color:'#666'}}>생일 (예: 2024-01-20)</label>
              <input className="modal-input" value={editPetData.birth} onChange={e => setEditPetData({...editPetData, birth: e.target.value})} />
              
              <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                <button className="btn-theme" style={{background:'#eee', color:'#333'}} onClick={() => setShowPetModal(false)}>취소</button>
                <button className="btn-theme" onClick={savePetEdit}>저장</button>
              </div>
            </div>
          </div>
        )}

        {/* 케어 항목 추가/수정 팝업창 */}
        {careModalConfig.isOpen && (
          <div className="modal-overlay">
            <div className="modal-content fade-in">
              <h3 style={{marginBottom:'15px'}}>{careModalConfig.mode === 'add' ? '새로운 케어 항목' : '항목 수정'}</h3>
              <input className="modal-input" placeholder="항목 이름 (예: 양치질하기)" value={careTitle} onChange={e => setCareTitle(e.target.value)} />
              <input className="modal-input" placeholder="단위 (예: 회, ml, 알)" value={careUnit} onChange={e => setCareUnit(e.target.value)} />
              <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                <button className="btn-theme" style={{background:'#eee', color:'#333'}} onClick={() => setCareModalConfig({isOpen: false})}>취소</button>
                <button className="btn-theme" onClick={saveCareItem}>저장</button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. 종합 달력 ================= */}
        {activeTab === 'calendar' && (
          <div className="fade-in">
            <div className="card">
              <div className="cal-header"><button style={{border:'none', background:'none', fontSize:'18px'}} onClick={handlePrevMonth}>◀</button><span>{currentYear}년 {currentMonth + 1}월</span><button style={{border:'none', background:'none', fontSize:'18px'}} onClick={handleNextMonth}>▶</button></div>
              <div className="cal-grid">
                {['일','월','화','수','목','금','토'].map(d => <div key={d} className="cal-day-name">{d}</div>)}
                {Array.from({length: new Date(currentYear, currentMonth, 1).getDay()}).map((_, i) => <div key={`empty-${i}`} className="cal-day" style={{background:'transparent'}}></div>)}
                {Array.from({length: new Date(currentYear, currentMonth + 1, 0).getDate()}).map((_, i) => {
                  const dateNum = i + 1; const targetDateStr = `${currentYear}-${currentMonth+1}-${dateNum}`; const hasSchedule = schedules[targetDateStr] && schedules[targetDateStr].length > 0;
                  const isSelected = selectedDate.getFullYear() === currentYear && selectedDate.getMonth() === currentMonth && selectedDate.getDate() === dateNum;
                  return (
                    <div key={dateNum} className={`cal-day ${isSelected ? 'active' : ''}`} onClick={() => setSelectedDate(new Date(currentYear, currentMonth, dateNum))}>
                      {dateNum} {hasSchedule && <div className="cal-dot"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card">
              <h3 style={{fontSize:'15px', marginBottom:'15px'}}>📝 {selectedDate.getMonth()+1}월 {selectedDate.getDate()}일 일정</h3>
              <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
                <input style={{flex:1, padding:'10px', borderRadius:'8px', border:'1px solid #ddd'}} placeholder="새로운 일정 입력" value={newSchedule} onChange={e => setNewSchedule(e.target.value)} />
                <button style={{background:currentTheme.border, color:currentTheme.color, border:'none', padding:'0 15px', borderRadius:'8px', fontWeight:'bold'}} onClick={handleAddSchedule}>추가</button>
              </div>
              {(schedules[selectedDateString] || []).map(sch => (
                <div key={sch.id} style={{display:'flex', justifyContent:'space-between', background:'#fafafa', padding:'12px', borderRadius:'8px', marginBottom:'8px', fontSize:'14px'}}>
                  <span>{sch.text}</span><button style={{background:'none', border:'none', color:'#e11d48'}} onClick={() => handleDeleteSchedule(selectedDateString, sch.id)}>삭제</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. 지출 관리 ================= */}
        {activeTab === 'expense' && (
          <div className="fade-in">
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>🧾 지출 등록</h3>
              <form onSubmit={handleExpenseSubmit}>
                <input style={{width:'100%', padding:'12px', marginBottom:'10px', border:'1px solid #ddd', borderRadius:'8px'}} placeholder="항목 이름" value={expName} onChange={e=>setExpName(e.target.value)} required />
                <input style={{width:'100%', padding:'12px', marginBottom:'10px', border:'1px solid #ddd', borderRadius:'8px'}} type="number" placeholder="금액" value={expPrice} onChange={e=>setExpPrice(e.target.value)} required />
                <button type="submit" className="btn-theme">저장하기</button>
              </form>
            </div>
            <div className="card">
              {expenses.map(exp => (
                <div key={exp.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 0', borderBottom:'1px solid #eee'}}>
                  <div style={{display:'flex', gap:'12px'}}>
                    <div><h4 style={{fontSize:'14px'}}>{exp.name}</h4><p style={{fontSize:'11px', color:'#888'}}>{exp.date}</p></div>
                  </div>
                  <div style={{fontWeight:'bold', color:'#e74c3c'}}>{exp.price}원</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. 냥이 앨범 (다중 업로드/개별 삭제 완벽 지원) ================= */}
        {activeTab === 'album' && (
          <div className="fade-in">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center'}}>
              <h3 style={{fontSize: '16px'}}>갤러리</h3>
              {/* multiple 속성 추가로 여러 장 선택 가능 */}
              <input type="file" multiple ref={albumInputRef} style={{display:'none'}} accept="image/*" onChange={handleAlbumUpload} />
              <button onClick={() => albumInputRef.current.click()} style={{background:currentTheme.border, color:currentTheme.color, border:'none', padding:'8px 12px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
                + 여러 장 올리기
              </button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px'}}>
              {albumPhotos.map((photo) => (
                <div key={photo.id} className="album-item-container fade-in">
                  <button className="album-del-btn" onClick={() => handleAlbumDelete(photo.id)}>X</button>
                  <img src={photo.src} alt="냥이" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 5. 휴지통 ================= */}
        {activeTab === 'trash' && (
          <div className="fade-in">
            <p style={{fontSize:'13px', color:'#888', marginBottom:'15px'}}>삭제된 케어 항목 등을 복구할 수 있습니다.</p>
            {trashItems.length === 0 && <div className="card" style={{textAlign:'center', color:'#999'}}>휴지통이 비어있습니다.</div>}
            {trashItems.map(item => (
              <div key={item.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px'}}>
                <div><h4 style={{fontSize:'15px', textDecoration:'line-through', color:'#666'}}>{item.title}</h4><p style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>삭제일: {item.date}</p></div>
                <div style={{display:'flex', gap:'5px'}}>
                  <button onClick={() => handleRestoreTrash(item)} style={{background:'#3b82f6', color:'white', border:'none', padding:'8px', borderRadius:'8px', fontSize:'12px'}}>복구</button>
                  <button onClick={() => handlePermanentDelete(item.id)} style={{background:'#e11d48', color:'white', border:'none', padding:'8px', borderRadius:'8px', fontSize:'12px'}}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= 6. 설정 및 제작 (테마 변경 탭 안으로 쏙 들어옴!) ================= */}
        {activeTab === 'create' && (
          <div className="fade-in">
            {!settingView ? (
              <div className="card" style={{padding: '0 20px'}}>
                <ul style={{listStyle:'none'}}>
                  {/* 테마 변경 메뉴를 안전한 설정 탭 안으로 이동 */}
                  <li onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer', fontWeight:'bold', color: currentTheme.color}}>
                    <span>🎨 테마 컬러 변경 (현재: {currentTheme.id})</span> <span>🔄</span>
                  </li>
                  <li onClick={() => setSettingView('guide')} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>📖 앱 사용 가이드</span> <span>❯</span></li>
                  <li onClick={() => setSettingView('dev')} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>💬 개발자 문의</span> <span>❯</span></li>
                  <li style={{display:'flex', justifyContent:'space-between', padding:'18px 0', cursor:'default'}}><span>ℹ️ 앱 버전 정보</span> <span style={{color:'#888', fontSize:'13px'}}>v1.0.3</span></li>
                </ul>
              </div>
            ) : (
              <div className="card fade-in">
                <div className="sub-page-header">
                  <button className="back-btn" onClick={() => setSettingView(null)}>←</button>
                  <span>{settingView === 'guide' ? '사용 가이드' : '개발자 문의'}</span>
                </div>
                <div style={{fontSize:'14px', lineHeight:'1.6', color:'#555', paddingBottom:'20px'}}>
                  {settingView === 'guide' && '✔️ 앨범 탭에서 다중 업로드 및 개별 삭제가 가능합니다.\n✔️ 오늘 케어 탭에서 ✏️ 버튼을 눌러 항목을 수정하세요.\n✔️ 휴지통에서 실수로 지운 내역을 복구하세요.'}
                  {settingView === 'dev' && '사용 중 불편한 점이 있다면 언제든 알려주세요!\n이메일: dev@nyangi.app\n버전: v1.0.3 완벽 호환'}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 🐾 커스텀 하단 네비게이션 */}
      <nav>
        {navItems.map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
