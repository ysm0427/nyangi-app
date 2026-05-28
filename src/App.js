import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [activePet, setActivePet] = useState('vella'); 

  // 🎨 테마 상태
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

  // === 1. 냥이 프로필 ===
  const [pets, setPets] = useState({
    vella: { id: 'vella', name: '벨라', gender: '여아 ♀', birth: '2024-01-20', icon: '👑', img: null },
    roy: { id: 'roy', name: '로이', gender: '남아 ♂', birth: '2025-03-15', icon: '🍼', img: null }
  });
  const [showPetModal, setShowPetModal] = useState(false);
  const [editTarget, setEditTarget] = useState('vella');
  const [editPetData, setEditPetData] = useState({ name: '', gender: '', birth: '' });
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onloadend=()=>setPets({...pets, [activePet]: {...pets[activePet], img: r.result}}); r.readAsDataURL(f); } };
  
  const handleProfileDelete = () => {
    if(window.confirm('프로필 사진을 삭제하시겠습니까?')) {
      setPets({...pets, [activePet]: {...pets[activePet], img: null}});
    }
  };
  
  const openPetEditModal = () => { setEditTarget(activePet); setEditPetData(pets[activePet]); setShowPetModal(true); };
  const handleEditTargetChange = (target) => {
    setPets({...pets, [editTarget]: {...pets[editTarget], ...editPetData}});
    setEditTarget(target); setEditPetData(pets[target]);
  };
  const savePetEdit = () => { setPets({...pets, [editTarget]: {...pets[editTarget], ...editPetData}}); setShowPetModal(false); };

  // === 2. 케어 항목 ===
  const [careList, setCareList] = useState({
    vella: [{ id: 1, icon: '💧', title: '음수량 측정', unit: 'ml', color: '#3b82f6', bg: '#eff6ff', borderColor: '#bfdbfe' }, { id: 2, icon: '🪮', title: '코트 빗질', unit: '회', color: '#9333ea', bg: '#faf5ff', borderColor: '#e9d5ff' }],
    roy: [{ id: 3, icon: '💊', title: '영양제 챙기기', unit: '알', color: '#e11d48', bg: '#fff1f2', borderColor: '#fecdd3' }]
  });
  const [careModalConfig, setCareModalConfig] = useState({ isOpen: false, mode: 'add', editId: null });
  const [careTitle, setCareTitle] = useState(''); const [careUnit, setCareUnit] = useState('');

  const openCareModal = (mode, item = null) => { setCareModalConfig({ isOpen: true, mode, editId: item ? item.id : null }); setCareTitle(item ? item.title : ''); setCareUnit(item ? item.unit : ''); };
  const saveCareItem = () => { if(!careTitle) return; if (careModalConfig.mode === 'add') { const newItem = { id: Date.now(), icon: '✨', title: careTitle, unit: careUnit || '회', color: currentTheme.color, bg: currentTheme.bg, borderColor: currentTheme.border }; setCareList({...careList, [activePet]: [...careList[activePet], newItem]}); } else { setCareList({...careList, [activePet]: careList[activePet].map(item => item.id === careModalConfig.editId ? { ...item, title: careTitle, unit: careUnit } : item)}); } setCareModalConfig({ isOpen: false, mode: 'add', editId: null }); };
  
  const handleDeleteCare = (item) => { 
    if(window.confirm(`'${item.title}' 항목을 삭제하시겠습니까?\n(휴지통으로 이동합니다.)`)) {
      setTrashItems([{ id: Date.now(), type: 'care', title: item.title, date: new Date().toLocaleDateString(), originalData: item, petId: activePet }, ...trashItems]); 
      setCareList({...careList, [activePet]: careList[activePet].filter(i => i.id !== item.id)}); 
    }
  };

  // === 3. 종합 달력 & 알람 기능 ===
  const [currentDate, setCurrentDate] = useState(new Date()); const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [schedules, setSchedules] = useState({}); 
  const [newSchedule, setNewSchedule] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('');

  const currentYear = currentDate.getFullYear(); const currentMonth = currentDate.getMonth();
  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1)); const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const selectedDateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;
  
  const handleAddSchedule = () => { 
    if(!newSchedule) return; 
    setSchedules({...schedules, [selectedDateString]: [...(schedules[selectedDateString] || []), { id: Date.now(), text: newSchedule, time: newScheduleTime, alerted: false }]}); 
    setNewSchedule(''); setNewScheduleTime(''); 
  };
  
  const handleDeleteSchedule = (dateStr, id) => { 
    if(window.confirm('이 일정을 삭제하시겠습니까?')) {
      setSchedules({...schedules, [dateStr]: schedules[dateStr].filter(s => s.id !== id)});
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
      const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

      setSchedules(prev => {
        if (!prev[dateStr]) return prev;
        let isUpdated = false;
        const updatedDay = prev[dateStr].map(sch => {
          if (sch.time === timeStr && !sch.alerted) {
            isUpdated = true;
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              osc.type = 'sine'; osc.frequency.value = 880; 
              osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.6);
            } catch(e) {}
            setTimeout(() => alert(`⏰ 알림: [${sch.text}] 하실 시간입니다!`), 100);
            return { ...sch, alerted: true };
          }
          return sch;
        });
        if(isUpdated) return { ...prev, [dateStr]: updatedDay };
        return prev;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // === 4. 지출, 휴지통, 앨범, 설정 ===
  const [expenses, setExpenses] = useState([]); 
  const [expName, setExpName] = useState(''); const [expPrice, setExpPrice] = useState(''); const [expImg, setExpImg] = useState(null); const [expTargetPet, setExpTargetPet] = useState('공통');
  const [trashItems, setTrashItems] = useState([]); 
  const [albumPhotos, setAlbumPhotos] = useState([{ id: 1, src: 'https://via.placeholder.com/150/eeeeee/aaaaaa?text=Photo+1' }]); 
  const albumInputRef = useRef(null); 
  const [settingView, setSettingView] = useState(null);
  const pressTimer = useRef(null);

  const handleExpenseSubmit = (e) => { e.preventDefault(); setExpenses([{ id: Date.now(), name: expName, date: new Date().toLocaleDateString(), price: Number(expPrice).toLocaleString(), img: expImg, pet: expTargetPet }, ...expenses]); setExpName(''); setExpPrice(''); setExpImg(null); };
  
  const handleAlbumUpload = async (e) => {
    const files = Array.from(e.target.files);
    if(files.length === 0) return;
    const filePromises = files.map(file => new Promise(resolve => { const reader = new FileReader(); reader.onloadend = () => resolve({ id: Date.now() + Math.random(), src: reader.result }); reader.readAsDataURL(file); }));
    const newPhotos = await Promise.all(filePromises);
    setAlbumPhotos(prev => [...newPhotos, ...prev]);
  };
  
  const handlePressStart = (photo) => {
    pressTimer.current = setTimeout(() => {
      if(window.confirm('이 사진을 삭제하시겠습니까?\n(휴지통으로 이동합니다)')) {
        setTrashItems(prev => [{ id: Date.now(), type: 'photo', title: '앨범 사진', date: new Date().toLocaleDateString(), src: photo.src, originalId: photo.id }, ...prev]);
        setAlbumPhotos(prev => prev.filter(p => p.id !== photo.id));
      }
    }, 700);
  };
  const handlePressEnd = () => { if(pressTimer.current) clearTimeout(pressTimer.current); };

  const handleRestoreTrash = (item) => {
    if(window.confirm('이 항목을 원래 위치로 복구하시겠습니까?')) {
      if(item.type === 'care') setCareList({...careList, [item.petId]: [...careList[item.petId], item.originalData]});
      if(item.type === 'photo') setAlbumPhotos([{id: item.originalId, src: item.src}, ...albumPhotos]); 
      setTrashItems(trashItems.filter(i => i.id !== item.id)); 
    }
  };
  const handlePermanentDelete = (id) => {
    if(window.confirm('정말 영구 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      setTrashItems(trashItems.filter(i => i.id !== id));
    }
  };

  // ================= 🎨 동적 CSS & 레이아웃 최적화 =================
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: #e8eaed; color: #333; display: flex; justify-content: center; height: 100vh; height: 100dvh; overflow: hidden; }
    #app-container { width: 100vw; max-width: 480px; background-color: #f7f9fa; height: 100%; height: 100dvh; display: flex; flex-direction: column; position: relative; overflow: hidden; }
    @media (min-width: 481px) { #app-container { box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; } }
    .fade-in { animation: fadeIn 0.2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* 💡 수정 1: 상단 펫 탭 좌우 나란히 배치 강제 적용 */
    .top-pet-nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; padding-top: max(15px, env(safe-area-inset-top)); background-color: ${currentTheme.bg}; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; flex-shrink: 0; z-index: 10; gap: 10px; transition: background-color 0.3s; }
    .pet-tabs { display: flex; flex-direction: row; flex-wrap: nowrap; gap: 8px; overflow-x: auto; scrollbar-width: none; }
    .pet-tabs::-webkit-scrollbar { display: none; }
    .pet-tab { white-space: nowrap; flex-shrink: 0; background: #fff; border: 1px solid #e0e0e0; padding: 8px 14px; border-radius: 20px; font-weight: 600; font-size: 14px; color: #999; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s; }
    .pet-tab.active { color: #333; border-color: ${currentTheme.border}; box-shadow: 0 2px 5px ${currentTheme.color}33; }
    .pet-edit-btn { white-space: nowrap; flex-shrink: 0; background: #344054; color: #fff; border: none; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; }
    
    .btn-theme { width: 100%; background: ${currentTheme.border}; color: ${currentTheme.color}; border: none; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: bold; cursor: pointer; transition: background 0.3s; }
    
    .page-header { padding: 20px; padding-top: max(20px, env(safe-area-inset-top)); background: #fff; font-size: 18px; font-weight: 700; text-align: center; border-bottom: 1px solid #eee; z-index: 10; }
    main { flex: 1; overflow-y: auto; padding: 20px; position: relative; }
    .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    
    .profile-card { background: #fff; border: 1px solid ${currentTheme.border}; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-bottom: 20px; position: relative; }
    .profile-avatar { width: 75px; height: 75px; border-radius: 50%; border: 2px dashed #d1d5db; display: flex; justify-content: center; align-items: center; font-size: 30px; background: #f9fafb; cursor: pointer; overflow: hidden; position: relative; flex-shrink: 0; }
    .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .delete-photo-btn { position: absolute; top: 10px; right: 10px; background: #fee2e2; color: #ef4444; border: none; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; z-index: 5; }
    
    .care-item { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 15px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .care-left { display: flex; align-items: center; gap: 15px; }
    .care-icon { width: 45px; height: 45px; border-radius: 50%; border: 2px solid; display: flex; justify-content: center; align-items: center; font-size: 20px; flex-shrink: 0; }
    .action-icon-btn { background: #f5f5f5; border: none; color: #555; font-size: 14px; cursor: pointer; padding: 8px; border-radius: 8px; margin-left: 5px; }
    .action-icon-btn.delete { background: #fee2e2; color: #ef4444; }

    .modal-overlay { position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 300; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .modal-content { background: #fff; width: 100%; max-width: 360px; border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .modal-input { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; font-size: 15px; outline: none; }
    .modal-input:focus { border-color: ${currentTheme.color}; }

    .exp-pet-tab { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #ddd; background: #fff; color: #666; font-size: 14px; cursor: pointer; text-align: center; }
    .exp-pet-tab.active { border: 2px solid ${currentTheme.border}; background: ${currentTheme.bg}; color: ${currentTheme.color}; font-weight: bold; }

    .album-item-container { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; background: #eee; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; cursor: pointer; }
    .album-item-container img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
    
    .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-weight: bold; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center; }
    .cal-day-name { font-size: 12px; color: #888; padding-bottom: 10px; }
    .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; border-radius: 8px; background: #fafafa; cursor: pointer; position: relative; }
    .cal-day.active { background: ${currentTheme.border}; color: ${currentTheme.color}; font-weight: bold; }
    .cal-dot { width: 5px; height: 5px; background: #e11d48; border-radius: 50%; position: absolute; bottom: 4px; }
    
    .sub-page-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-size: 18px; font-weight: bold; }
    .back-btn { background: none; border: none; font-size: 20px; cursor: pointer; }

    nav { background: #fff; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 10px 0; padding-bottom: max(25px, env(safe-area-inset-bottom)); flex-shrink: 0; z-index: 100; position: relative; }
    .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #b0b8c1; cursor: pointer; font-size: 11px; font-weight: 500; opacity: 0.6; transition: all 0.2s; width: 100%; }
    .nav-btn.active { opacity: 1; transform: translateY(-3px); color: ${currentTheme.btn}; font-weight: 700; }
    .nav-icon { font-size: 22px; }
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

        {showPetModal && (
          <div className="modal-overlay">
            <div className="modal-content fade-in">
              <h3 style={{marginBottom:'15px'}}>🐾 프로필 수정</h3>
              <div style={{display: 'flex', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px'}}>
                <button style={{flex: 1, padding: '12px', border: 'none', background: editTarget === 'vella' ? currentTheme.bg : '#fff', fontWeight: editTarget === 'vella' ? 'bold' : 'normal', color: editTarget === 'vella' ? currentTheme.color : '#666'}} onClick={() => handleEditTargetChange('vella')}>👑 벨라</button>
                <button style={{flex: 1, padding: '12px', border: 'none', borderLeft: '1px solid #ddd', background: editTarget === 'roy' ? currentTheme.bg : '#fff', fontWeight: editTarget === 'roy' ? 'bold' : 'normal', color: editTarget === 'roy' ? currentTheme.color : '#666'}} onClick={() => handleEditTargetChange('roy')}>🍼 로이</button>
              </div>

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

        {/* ================= 2. 종합 달력 (모바일 시간 UI 수정) ================= */}
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
              <h3 style={{fontSize:'15px', marginBottom:'15px'}}>📝 {selectedDate.getMonth()+1}월 {selectedDate.getDate()}일 일정 등록</h3>
              
              {/* 💡 수정 2: 가로 공간 부족 방지를 위한 모바일 친화적 상하 스택 폼 */}
              <div style={{display:'flex', flexDirection: 'column', gap:'10px', marginBottom:'15px'}}>
                <input style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize: '15px'}} placeholder="새로운 일정 내용 입력" value={newSchedule} onChange={e => setNewSchedule(e.target.value)} />
                <div style={{display: 'flex', gap: '10px'}}>
                  <input type="time" style={{flex: 1, padding:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize: '15px'}} value={newScheduleTime} onChange={e => setNewScheduleTime(e.target.value)} />
                  <button style={{flex: 1, background:currentTheme.border, color:currentTheme.color, border:'none', borderRadius:'8px', fontWeight:'bold', fontSize: '15px'}} onClick={handleAddSchedule}>등록하기</button>
                </div>
              </div>
              
              {(schedules[selectedDateString] || []).length === 0 ? (
                <p style={{fontSize:'13px', color:'#999'}}>등록된 일정이 없습니다.</p>
              ) : (
                schedules[selectedDateString].map(sch => (
                  <div key={sch.id} style={{display:'flex', justifyContent:'space-between', background:'#fafafa', padding:'12px', borderRadius:'8px', marginBottom:'8px', fontSize:'14px'}}>
                    <span>{sch.time && <b style={{color: currentTheme.color}}>[{sch.time}] </b>} {sch.text}</span>
                    <button style={{background:'none', border:'none', color:'#e11d48'}} onClick={() => handleDeleteSchedule(selectedDateString, sch.id)}>삭제</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= 3. 지출 관리 ================= */}
        {activeTab === 'expense' && (
          <div className="fade-in">
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>🧾 지출 등록</h3>
              <form onSubmit={handleExpenseSubmit}>
                <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                  {['공통', '벨라', '로이'].map(pet => (
                    <button type="button" key={pet} className={`exp-pet-tab ${expTargetPet === pet ? 'active' : ''}`} onClick={() => setExpTargetPet(pet)}>{pet}</button>
                  ))}
                </div>
                <input style={{width:'100%', padding:'12px', marginBottom:'10px', border:'1px solid #ddd', borderRadius:'8px'}} placeholder="항목 이름" value={expName} onChange={e=>setExpName(e.target.value)} required />
                <input style={{width:'100%', padding:'12px', marginBottom:'10px', border:'1px solid #ddd', borderRadius:'8px'}} type="number" placeholder="금액" value={expPrice} onChange={e=>setExpPrice(e.target.value)} required />
                <input type="file" style={{marginBottom:'15px'}} accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onload=()=>setExpImg(r.result); r.readAsDataURL(f); } }} />
                <button type="submit" className="btn-theme">저장하기</button>
              </form>
            </div>
            <div className="card">
              {expenses.map(exp => (
                <div key={exp.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 0', borderBottom:'1px solid #eee'}}>
                  <div style={{display:'flex', gap:'12px'}}>
                    {exp.img ? <img src={exp.img} style={{width:'40px', height:'40px', borderRadius:'8px'}} alt="영수증" /> : <div style={{width:'40px',height:'40px',background:'#eee',borderRadius:'8px',fontSize:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>사진없음</div>}
                    <div>
                      <h4 style={{fontSize:'14px', marginBottom:'4px'}}>
                        <span style={{fontSize:'10px', background:'#f0f0f0', padding:'2px 6px', borderRadius:'4px', marginRight:'6px', color:'#555'}}>{exp.pet}</span>
                        {exp.name}
                      </h4>
                      <p style={{fontSize:'11px', color:'#888'}}>{exp.date}</p>
                    </div>
                  </div>
                  <div style={{fontWeight:'bold', color:'#e74c3c'}}>{exp.price}원</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. 냥이 앨범 ================= */}
        {activeTab === 'album' && (
          <div className="fade-in">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center'}}>
              <h3 style={{fontSize: '13px', color: '#888'}}>사진을 꾹~ 누르면 삭제할 수 있어요</h3>
              <input type="file" multiple ref={albumInputRef} style={{display:'none'}} accept="image/*" onChange={handleAlbumUpload} />
              <button onClick={() => albumInputRef.current.click()} style={{background:currentTheme.border, color:currentTheme.color, border:'none', padding:'10px 16px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
                + 사진 등록
              </button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px'}}>
              {albumPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="album-item-container fade-in"
                  onTouchStart={() => handlePressStart(photo)}
                  onTouchEnd={handlePressEnd}
                  onMouseDown={() => handlePressStart(photo)}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img src={photo.src} alt="냥이" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 5. 휴지통 ================= */}
        {activeTab === 'trash' && (
          <div className="fade-in">
            <p style={{fontSize:'13px', color:'#888', marginBottom:'15px'}}>삭제된 항목 및 사진을 복구할 수 있습니다.</p>
            {trashItems.length === 0 && <div className="card" style={{textAlign:'center', color:'#999'}}>휴지통이 비어있습니다.</div>}
            
            {trashItems.map(item => (
              <div key={item.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  {item.type === 'photo' && <img src={item.src} style={{width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover'}} alt="thumb" />}
                  <div>
                    <h4 style={{fontSize:'15px', textDecoration:'line-through', color:'#666'}}>{item.title}</h4>
                    <p style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>삭제일: {item.date}</p>
                  </div>
                </div>
                <div style={{display:'flex', gap:'5px'}}>
                  <button onClick={() => handleRestoreTrash(item)} style={{background:'#3b82f6', color:'white', border:'none', padding:'8px', borderRadius:'8px', fontSize:'12px'}}>복구</button>
                  <button onClick={() => handlePermanentDelete(item.id)} style={{background:'#e11d48', color:'white', border:'none', padding:'8px', borderRadius:'8px', fontSize:'12px'}}>영구삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= 6. 설정 및 제작 ================= */}
        {activeTab === 'create' && (
          <div className="fade-in">
            {!settingView ? (
              <div className="card" style={{padding: '0 20px'}}>
                <ul style={{listStyle:'none'}}>
                  <li onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer', fontWeight:'bold', color: currentTheme.color}}>
                    <span>🎨 전체 테마 변경 (현재: {currentTheme.id})</span> <span>🔄</span>
                  </li>
                  <li onClick={() => setSettingView('guide')} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>📖 앱 사용 가이드</span> <span>❯</span></li>
                  <li onClick={() => setSettingView('dev')} style={{display:'flex', justifyContent:'space-between', padding:'18px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>💬 개발자 문의</span> <span>❯</span></li>
                  <li style={{display:'flex', justifyContent:'space-between', padding:'18px 0', cursor:'default'}}><span>ℹ️ 앱 버전 정보</span> <span style={{color:'#888', fontSize:'13px'}}>v1.0.6</span></li>
                </ul>
              </div>
            ) : (
              <div className="card fade-in">
                <div className="sub-page-header">
                  <button className="back-btn" onClick={() => setSettingView(null)}>←</button>
                  <span>{settingView === 'guide' ? '사용 가이드' : '개발자 문의'}</span>
                </div>
                <div style={{fontSize:'14px', lineHeight:'1.6', color:'#555', paddingBottom:'20px'}}>
                  {settingView === 'guide' && '✔️ 앨범의 사진을 1초간 꾹~ 누르면 삭제 후 휴지통으로 이동합니다.\n✔️ 달력에서 일정을 등록할 때 시간을 지정하면 알람이 울립니다.\n✔️ 오늘 케어 탭에서 ✏️ 버튼을 눌러 항목을 언제든 수정하세요.'}
                  {settingView === 'dev' && '이메일: dev@nyangi.app\n버전: v1.0.6 (모바일 UI 최적화 완료)'}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 🐾 하단 네비게이션 */}
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
