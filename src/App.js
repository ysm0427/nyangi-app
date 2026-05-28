import React, { useState, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [activePet, setActivePet] = useState('vella'); 

  // 🎨 테마 상태 관리 (민트 -> 핑크 -> 라벤더)
  const themes = [
    { id: 'mint', color: '#059669', bg: '#eaf8f5', border: '#a7ecd9', btn: '#10b981' },
    { id: 'pink', color: '#be185d', bg: '#fce7f3', border: '#fbcfe8', btn: '#ec4899' },
    { id: 'purple', color: '#7e22ce', bg: '#f3e8ff', border: '#e9d5ff', btn: '#a855f7' }
  ];
  const [themeIdx, setThemeIdx] = useState(0);
  const currentTheme = themes[themeIdx];

  // 💡 여기서 하단 메뉴 아이콘(이모지)과 글씨를 직접 마음대로 수정하세요!
  const navItems = [
    { id: 'care', label: '오늘 케어', icon: "🐾" },
    { id: 'calendar', label: '종합 달력', icon: "📅" },
    { id: 'expense', label: '지출 관리', icon: "💸" },
    { id: 'album', label: '냥이 앨범', icon: "📸" },
    { id: 'trash', label: '휴지통', icon: "🗑️" },
    { id: 'create', label: '설정/제작', icon: "⚙️" }
  ];

  // === 이전과 동일한 상태 및 로직들 (손대지 않음) ===
  const [pets, setPets] = useState({
    vella: { id: 'vella', name: '벨라', gender: '여아 ♀', birth: '2024-01-20', icon: '👑', img: null },
    roy: { id: 'roy', name: '로이', gender: '남아 ♂', birth: '2025-03-15', icon: '🍼', img: null }
  });
  const profileInputRef = useRef(null);
  const handleProfileUpload = (e) => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onloadend=()=>setPets({...pets, [activePet]: {...pets[activePet], img: r.result}}); r.readAsDataURL(f); } };
  const handleProfileDelete = () => setPets({...pets, [activePet]: {...pets[activePet], img: null}});

  const [careList, setCareList] = useState({
    vella: [{ id: 1, icon: '💧', title: '음수량 측정', unit: 'ml', color: '#3b82f6', bg: '#eff6ff', borderColor: '#bfdbfe' }, { id: 2, icon: '🪮', title: '코트 빗질', unit: '회', color: '#9333ea', bg: '#faf5ff', borderColor: '#e9d5ff' }],
    roy: [{ id: 3, icon: '💊', title: '영양제 챙기기', unit: '알', color: '#e11d48', bg: '#fff1f2', borderColor: '#fecdd3' }]
  });
  const [showAddCareModal, setShowAddCareModal] = useState(false);
  const [newCareTitle, setNewCareTitle] = useState(''); const [newCareUnit, setNewCareUnit] = useState('');
  const handleAddCare = () => { if(!newCareTitle) return; const newItem = { id: Date.now(), icon: '✨', title: newCareTitle, unit: newCareUnit || '회', color: currentTheme.color, bg: currentTheme.bg, borderColor: currentTheme.border }; setCareList({...careList, [activePet]: [...careList[activePet], newItem]}); setShowAddCareModal(false); setNewCareTitle(''); setNewCareUnit(''); };
  const handleDeleteCare = (item) => { setTrashItems([{ id: Date.now(), type: 'care', title: item.title, date: new Date().toLocaleDateString(), originalData: item, petId: activePet }, ...trashItems]); setCareList({...careList, [activePet]: careList[activePet].filter(i => i.id !== item.id)}); };

  const [currentDate, setCurrentDate] = useState(new Date()); const [selectedDate, setSelectedDate] = useState(new Date()); const [schedules, setSchedules] = useState({}); const [newSchedule, setNewSchedule] = useState('');
  const currentYear = currentDate.getFullYear(); const currentMonth = currentDate.getMonth();
  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1)); const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const selectedDateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;
  const handleAddSchedule = () => { if(!newSchedule) return; setSchedules({...schedules, [selectedDateString]: [...(schedules[selectedDateString] || []), { id: Date.now(), text: newSchedule }]}); setNewSchedule(''); };
  const handleDeleteSchedule = (dateStr, id) => setSchedules({...schedules, [dateStr]: schedules[dateStr].filter(s => s.id !== id)});

  const [expenses, setExpenses] = useState([]); const [expName, setExpName] = useState(''); const [expPrice, setExpPrice] = useState(''); const [expImg, setExpImg] = useState(null);
  const [trashItems, setTrashItems] = useState([]); const [albumPhotos, setAlbumPhotos] = useState([]); const albumInputRef = useRef(null); const [settingView, setSettingView] = useState(null);
  const handleExpenseSubmit = (e) => { e.preventDefault(); setExpenses([{ id: Date.now(), name: expName, date: new Date().toLocaleDateString(), price: Number(expPrice).toLocaleString(), img: expImg }, ...expenses]); setExpName(''); setExpPrice(''); setExpImg(null); };
  const handleRestoreTrash = (item) => { if(item.type === 'care') setCareList({...careList, [item.petId]: [...careList[item.petId], item.originalData]}); setTrashItems(trashItems.filter(i => i.id !== item.id)); };
  const handlePermanentDelete = (id) => setTrashItems(trashItems.filter(i => i.id !== id));

  // ================= 🎨 테마 연동 동적 CSS =================
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: #e8eaed; color: #333; display: flex; justify-content: center; height: 100vh; height: 100dvh; overflow: hidden; }
    #app-container { width: 100vw; max-width: 480px; background-color: #f7f9fa; height: 100%; height: 100dvh; display: flex; flex-direction: column; position: relative; overflow: hidden; }
    @media (min-width: 481px) { #app-container { box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; } }
    .fade-in { animation: fadeIn 0.2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* 동적 테마 컬러 적용 영역 */
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
    .delete-photo-btn { position: absolute; top: 10px; right: 10px; background: #fee2e2; color: #ef4444; border: none; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; }
    .care-item { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 15px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .care-left { display: flex; align-items: center; gap: 15px; }
    .care-icon { width: 45px; height: 45px; border-radius: 50%; border: 2px solid; display: flex; justify-content: center; align-items: center; font-size: 20px; flex-shrink: 0; }
    .action-icon-btn { background: none; border: none; color: #a0a0a0; font-size: 16px; cursor: pointer; padding: 6px; }

    /* 하단 메뉴 디자인 개선 */
    nav { background: #fff; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 10px 0; padding-bottom: max(35px, env(safe-area-inset-bottom)); flex-shrink: 0; z-index: 100; position: relative; }
    .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #b0b8c1; cursor: pointer; font-size: 11px; font-weight: 500; opacity: 0.6; transition: all 0.2s; width: 100%; }
    .nav-btn.active { opacity: 1; transform: translateY(-3px); color: ${currentTheme.btn}; font-weight: 700; }
    .nav-icon { font-size: 22px; } /* 이모지 크기 */
    
    /* 테마 변경 버튼을 클릭 가능하도록 수정 */
    .bottom-theme-btn { position: absolute; bottom: max(5px, calc(env(safe-area-inset-bottom) - 10px)); left: 50%; transform: translateX(-50%); text-align: center; font-size: 10px; color: #888; background: #f0f0f0; padding: 4px 12px; border-radius: 12px; border: none; cursor: pointer; z-index: 105; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .bottom-theme-btn:active { background: #e0e0e0; }

    .modal-overlay { position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 200; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .modal-content { background: #fff; width: 100%; max-width: 360px; border-radius: 16px; padding: 20px; }
    .modal-input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; font-size: 14px; outline: none; }
    .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-weight: bold; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center; }
    .cal-day-name { font-size: 12px; color: #888; padding-bottom: 10px; }
    .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; border-radius: 8px; background: #fafafa; cursor: pointer; position: relative; }
    .cal-dot { width: 5px; height: 5px; background: #e11d48; border-radius: 50%; position: absolute; bottom: 4px; }
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
          <button className="pet-edit-btn">⚙️ 냥이 추가/수정</button>
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
                <p style={{fontSize: '11px', color: '#888', marginTop: '4px'}}>사진을 눌러 프로필을 등록하세요</p>
              </div>
            </div>
            {careList[activePet].map(item => (
              <div key={item.id} className="care-item">
                <div className="care-left">
                  <div className="care-icon" style={{ borderColor: item.borderColor, color: item.color, background: item.bg }}>{item.icon}</div>
                  <div><h3 style={{fontSize:'15px', marginBottom:'2px'}}>{item.title}</h3><p style={{fontSize:'12px', color:'#0d9488'}}>오늘 기록: {item.unit}</p></div>
                </div>
                <button className="action-icon-btn" onClick={() => handleDeleteCare(item)}>🗑️</button>
              </div>
            ))}
            <button className="btn-theme" style={{marginTop:'10px'}} onClick={() => setShowAddCareModal(true)}>+ 새로운 케어 항목 추가</button>
          </div>
        )}

        {showAddCareModal && (
          <div className="modal-overlay">
            <div className="modal-content fade-in">
              <h3 style={{marginBottom:'15px'}}>새로운 케어 항목</h3>
              <input className="modal-input" placeholder="항목 이름 (예: 양치질하기)" value={newCareTitle} onChange={e => setNewCareTitle(e.target.value)} />
              <input className="modal-input" placeholder="단위 (예: 회, ml, 알)" value={newCareUnit} onChange={e => setNewCareUnit(e.target.value)} />
              <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                <button className="btn-theme" style={{background:'#eee', color:'#333'}} onClick={() => setShowAddCareModal(false)}>취소</button>
                <button className="btn-theme" onClick={handleAddCare}>추가하기</button>
              </div>
            </div>
          </div>
        )}

        {/* 나머지 탭 생략 없이 기존 기능 유지 */}
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

        {activeTab === 'expense' && (
          <div className="fade-in">
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>🧾 지출 등록</h3>
              <form onSubmit={handleExpenseSubmit}>
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
                    <div><h4 style={{fontSize:'14px'}}>{exp.name}</h4><p style={{fontSize:'11px', color:'#888'}}>{exp.date}</p></div>
                  </div>
                  <div style={{fontWeight:'bold', color:'#e74c3c'}}>{exp.price}원</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'album' && (
          <div className="fade-in">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center'}}>
              <h3 style={{fontSize: '16px'}}>갤러리</h3>
              <input type="file" ref={albumInputRef} style={{display:'none'}} accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onload=()=>setAlbumPhotos([r.result, ...albumPhotos]); r.readAsDataURL(f); } }} />
              <button onClick={() => albumInputRef.current.click()} style={{background:currentTheme.border, color:currentTheme.color, border:'none', padding:'8px 12px', borderRadius:'10px', fontWeight:'bold'}}>+ 사진 올리기</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px'}}>
              {albumPhotos.map((photo, idx) => (
                <div key={idx} style={{aspectRatio:'1', borderRadius:'12px', overflow:'hidden'}}><img src={photo} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="냥이" /></div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trash' && (
          <div className="fade-in">
            <p style={{fontSize:'13px', color:'#888', marginBottom:'15px'}}>삭제된 케어 항목 등을 복구할 수 있습니다.</p>
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

        {activeTab === 'create' && (
          <div className="fade-in card" style={{padding: '0 20px'}}>
            <ul style={{listStyle:'none'}}>
              <li style={{display:'flex', justifyContent:'space-between', padding:'16px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>📖 앱 사용 가이드</span> <span>❯</span></li>
              <li style={{display:'flex', justifyContent:'space-between', padding:'16px 0', borderBottom:'1px solid #eee', cursor:'pointer'}}><span>🔔 알림 설정</span> <span>❯</span></li>
              <li style={{display:'flex', justifyContent:'space-between', padding:'16px 0', cursor:'pointer'}}><span>ℹ️ 앱 버전 정보 v1.0.2</span></li>
            </ul>
          </div>
        )}
      </main>

      {/* 🐾 이모지로 교체된 커스텀 하단 네비게이션 & 🎨 진짜 테마 변경 버튼 */}
      <nav>
        {navItems.map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        {/* 이제 클릭할 때마다 테마가 바뀝니다! */}
        <button className="bottom-theme-btn" onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)}>
          🎨 테마 변경 (현재: {currentTheme.id})
        </button>
      </nav>
    </div>
  );
}
