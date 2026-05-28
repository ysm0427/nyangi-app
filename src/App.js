import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [activePet, setActivePet] = useState('vella'); 

  // 지출 상태
  const [expenses, setExpenses] = useState([
    { id: 1, name: '고양이 모래 3세트', date: '2026. 05. 28', price: '45,000', img: null }
  ]);
  const [expName, setExpName] = useState('');
  const [expPrice, setExpPrice] = useState('');
  const [expImg, setExpImg] = useState(null);

  // 휴지통 상태 (더미 데이터)
  const [trashItems, setTrashItems] = useState([
    { id: 1, title: '잘못 기록한 양치', date: '2026. 05. 27' }
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setExpImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const dateStr = `${today.getFullYear()}. ${String(today.getMonth()+1).padStart(2,'0')}. ${String(today.getDate()).padStart(2,'0')}`;
    const newExpense = { id: Date.now(), name: expName, date: dateStr, price: Number(expPrice).toLocaleString(), img: expImg };
    setExpenses([newExpense, ...expenses]);
    setExpName(''); setExpPrice(''); setExpImg(null);
  };

  // 🌟 아이폰 좌우 풀사이즈 & 모든 탭 UI 구현 완료 CSS
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, sans-serif; -webkit-tap-highlight-color: transparent; }
    
    body { background-color: #e8eaed; color: #333; display: flex; justify-content: center; height: 100vh; height: 100dvh; overflow: hidden; }
    
    /* 📱 좌우 여백 제거: 아이폰에 완벽 밀착, PC에선 앱 모양 유지 */
    #app-container { 
      width: 100vw; max-width: 480px; background-color: #f7f9fa; 
      height: 100%; height: 100dvh; display: flex; flex-direction: column; 
      position: relative; overflow: hidden;
    }
    @media (min-width: 481px) { #app-container { box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; } }

    /* 탭 전환 애니메이션 */
    .fade-in { animation: fadeIn 0.3s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* 공통 헤더 (케어 탭 제외) */
    .page-header { padding: 20px; padding-top: max(20px, env(safe-area-inset-top)); background: #fff; font-size: 18px; font-weight: 700; text-align: center; border-bottom: 1px solid #eee; z-index: 10; }

    /* 케어 탭 전용 펫 네비게이션 */
    .top-pet-nav {
      display: flex; justify-content: space-between; align-items: center; 
      padding: 15px 20px; padding-top: max(15px, env(safe-area-inset-top));
      background-color: #eaf8f5; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; flex-shrink: 0; z-index: 10;
    }
    .pet-tabs { display: flex; gap: 8px; }
    .pet-tab { background: #fff; border: 1px solid #e0e0e0; padding: 8px 14px; border-radius: 20px; font-weight: 600; font-size: 14px; color: #999; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s; }
    .pet-tab.active { color: #333; border-color: #a7ecd9; box-shadow: 0 2px 5px rgba(167, 236, 217, 0.3); }
    .pet-edit-btn { background: #344054; color: #fff; border: none; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; }

    /* 메인 컨텐츠 영역 */
    main { flex: 1; overflow-y: auto; padding: 20px; position: relative; }
    
    /* 카드 및 리스트 UI */
    .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    .profile-card { background: #fff; border: 1px solid #a7ecd9; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(167,236,217,0.1); }
    .profile-avatar { width: 70px; height: 70px; border-radius: 50%; border: 2px dashed #d1d5db; display: flex; justify-content: center; align-items: center; font-size: 30px; background: #f9fafb; }
    .profile-info h2 { font-size: 18px; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
    .gender-badge { background: #ffe4e6; color: #e11d48; font-size: 11px; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
    .care-item { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 15px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .care-left { display: flex; align-items: center; gap: 15px; }
    .care-icon { width: 45px; height: 45px; border-radius: 50%; border: 2px solid; display: flex; justify-content: center; align-items: center; font-size: 20px; flex-shrink: 0; }
    .care-actions { display: flex; align-items: center; gap: 8px; }
    .record-btn { background: #a7ecd9; color: #065f46; border: none; padding: 6px 10px; border-radius: 16px; font-size: 12px; font-weight: 700; cursor: pointer; }
    .action-icon-btn { background: none; border: none; color: #a0a0a0; font-size: 16px; cursor: pointer; padding: 4px; }
    .add-care-btn { width: 100%; background: #a7ecd9; color: #065f46; border: none; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: bold; margin-top: 10px; margin-bottom: 30px; cursor: pointer; }

    /* 달력 UI */
    .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 16px; font-weight: bold; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center; }
    .cal-day-name { font-size: 12px; color: #888; padding-bottom: 10px; }
    .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; border-radius: 8px; background: #fafafa; position: relative; }
    .cal-day.today { background: #a7ecd9; color: #065f46; font-weight: bold; }
    .cal-dot { width: 4px; height: 4px; background: #e11d48; border-radius: 50%; position: absolute; bottom: 4px; }

    /* 앨범 UI */
    .album-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .album-item { aspect-ratio: 1; background: #eee; border-radius: 12px; display: flex; justify-content: center; align-items: center; font-size: 30px; object-fit: cover; }
    
    /* 설정/제작 리스트 UI */
    .settings-list { list-style: none; }
    .settings-list li { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee; font-size: 15px; align-items: center; cursor: pointer; }
    .settings-list li:last-child { border-bottom: none; }
    .badge { background: #fee2e2; color: #ef4444; font-size: 10px; padding: 2px 6px; border-radius: 8px; font-weight: bold; }

    /* 지출 입력 폼 */
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
    .form-group input { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; outline: none; }
    .upload-box { border: 2px dashed #dcdde1; border-radius: 10px; padding: 20px; text-align: center; background: #fafafa; position: relative; }
    .upload-box input[type="file"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
    .submit-btn { width: 100%; background: #344054; color: #fff; border: none; padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .expense-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }

    /* 하단 네비게이션바 (풀 사이즈 밀착) */
    nav {
      background: #fff; border-top: 1px solid #eee; 
      display: flex; justify-content: space-around; 
      padding: 12px 0; padding-bottom: max(25px, env(safe-area-inset-bottom)); 
      flex-shrink: 0; z-index: 100; position: relative;
    }
    .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #b0b8c1; cursor: pointer; font-size: 10px; font-weight: 600; padding: 5px 0; width: 100%; }
    .nav-btn svg { width: 22px; height: 22px; fill: currentColor; }
    .nav-btn.active { color: #10b981; }
    .bottom-theme-text { position: absolute; bottom: max(6px, calc(env(safe-area-inset-bottom) - 15px)); width: 100%; text-align: center; font-size: 9px; color: #999; pointer-events: none; }
  `;

  return (
    <div id="app-container">
      <style>{styles}</style>
      
      {/* 🐾 1. 상단 탭: '오늘 케어' 페이지에서만 냥이 추가/수정이 보이도록 조건부 렌더링 */}
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

      {/* 메인 영역 */}
      <main>
        {/* === 오늘 케어 탭 === */}
        {activeTab === 'care' && (
          <div className="fade-in">
            <div className="profile-card">
              <div className="profile-avatar">{activePet === 'vella' ? '👑' : '🍼'}</div>
              <div className="profile-info">
                <h2>{activePet === 'vella' ? '벨라' : '로이'} <span className="gender-badge">{activePet === 'vella' ? '여아 ♀' : '남아 ♂'}</span></h2>
                <p style={{fontSize: '13px', color: '#059669', fontWeight: '600', marginBottom: '4px'}}>🎂 생일: {activePet === 'vella' ? '2024-01-20' : '2025-03-15'}</p>
                <p style={{fontSize: '11px', color: '#888'}}>D-Day 정보 기록 중</p>
              </div>
            </div>

            {/* 케어 아이템 (수정/삭제 버튼 모두 보이게 최적화) */}
            <div className="care-item">
              <div className="care-left">
                <div className="care-icon" style={{ borderColor: '#bfdbfe', color: '#3b82f6', background: '#eff6ff' }}>💧</div>
                <div><h3 style={{fontSize:'15px', marginBottom:'2px'}}>음수량 측정</h3><p style={{fontSize:'12px', color:'#0d9488'}}>오늘 기록: ml</p></div>
              </div>
              <div className="care-actions">
                <button className="record-btn">기록 ❯</button>
                <button className="action-icon-btn">✏️</button>
                <button className="action-icon-btn">🗑️</button>
              </div>
            </div>

            <div className="care-item">
              <div className="care-left">
                <div className="care-icon" style={{ borderColor: '#e9d5ff', color: '#9333ea', background: '#faf5ff' }}>🪮</div>
                <div><h3 style={{fontSize:'15px', marginBottom:'2px'}}>코트 빗질</h3><p style={{fontSize:'12px', color:'#0d9488'}}>오늘 기록: 회</p></div>
              </div>
              <div className="care-actions">
                <button className="record-btn">기록 ❯</button>
                <button className="action-icon-btn">✏️</button>
                <button className="action-icon-btn">🗑️</button>
              </div>
            </div>

            <button className="add-care-btn">+ 새로운 케어 항목 추가</button>
          </div>
        )}

        {/* === 종합 달력 탭 === */}
        {activeTab === 'calendar' && (
          <div className="fade-in">
            <div className="card">
              <div className="calendar-header">
                <button style={{border:'none', background:'none', fontSize:'16px'}}>◀</button>
                <span>2026년 5월</span>
                <button style={{border:'none', background:'none', fontSize:'16px'}}>▶</button>
              </div>
              <div className="calendar-grid">
                {['일','월','화','수','목','금','토'].map(day => <div key={day} className="cal-day-name">{day}</div>)}
                {/* 빈 날짜들 */}
                <div className="cal-day"></div><div className="cal-day"></div><div className="cal-day"></div><div className="cal-day"></div><div className="cal-day"></div>
                {/* 1일 ~ 15일 생성 */}
                {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                  <div key={date} className={`cal-day ${date === 28 ? 'today' : ''}`}>
                    {date}
                    {date % 3 === 0 && <div className="cal-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{fontSize: '15px'}}>🐾 오늘의 일정</h3>
              <p style={{fontSize: '13px', color: '#666', marginTop: '10px'}}>- 심장사상충 약 바르기 (예정)</p>
            </div>
          </div>
        )}

        {/* === 지출 관리 탭 === */}
        {activeTab === 'expense' && (
          <div className="fade-in">
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>🧾 새로운 지출 등록</h3>
              <form onSubmit={handleExpenseSubmit}>
                <div className="form-group"><label>구매 항목</label><input type="text" value={expName} onChange={e => setExpName(e.target.value)} required /></div>
                <div className="form-group"><label>결제 금액</label><input type="number" value={expPrice} onChange={e => setExpPrice(e.target.value)} required /></div>
                <div className="form-group">
                  <div className="upload-box">
                    {!expImg && <span style={{fontSize:'13px'}}>📸 여기를 눌러 영수증 첨부</span>}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {expImg && <img src={expImg} alt="미리보기" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover' }} />}
                  </div>
                </div>
                <button type="submit" className="submit-btn">저장하기</button>
              </form>
            </div>
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>최근 내역</h3>
              {expenses.map(exp => (
                <div key={exp.id} className="expense-item">
                  <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                    {exp.img ? <img src={exp.img} style={{width:'40px', height:'40px', borderRadius:'8px'}} /> : <div style={{width:'40px', height:'40px', background:'#eee', borderRadius:'8px', fontSize:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>사진없음</div>}
                    <div><h4 style={{fontSize:'14px', marginBottom:'4px'}}>{exp.name}</h4><p style={{fontSize:'11px', color:'#888'}}>{exp.date}</p></div>
                  </div>
                  <div style={{fontWeight:'bold', color:'#e74c3c'}}>{exp.price}원</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === 냥이 앨범 탭 === */}
        {activeTab === 'album' && (
          <div className="fade-in">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center'}}>
              <h3 style={{fontSize: '16px'}}>최근 사진</h3>
              <button style={{background:'#a7ecd9', color:'#065f46', border:'none', padding:'6px 12px', borderRadius:'10px', fontSize:'12px', fontWeight:'bold'}}>+ 사진 올리기</button>
            </div>
            <div className="album-grid">
              <div className="album-item">🐈</div><div className="album-item">🧶</div><div className="album-item">🐟</div>
              <div className="album-item">📦</div><div className="album-item">🐾</div><div className="album-item" style={{background:'#fdf4ff', color:'#db2777', fontSize:'14px'}}>+ 더보기</div>
            </div>
          </div>
        )}

        {/* === 휴지통 탭 === */}
        {activeTab === 'trash' && (
          <div className="fade-in">
            <p style={{fontSize:'13px', color:'#888', marginBottom:'15px'}}>삭제된 항목은 30일 후 영구 삭제됩니다.</p>
            {trashItems.map(item => (
              <div key={item.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px'}}>
                <div>
                  <h4 style={{fontSize:'15px', textDecoration:'line-through', color:'#666'}}>{item.title}</h4>
                  <p style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>삭제일: {item.date}</p>
                </div>
                <button style={{background:'#3b82f6', color:'white', border:'none', padding:'6px 12px', borderRadius:'8px', fontSize:'12px'}}>복구</button>
              </div>
            ))}
          </div>
        )}

        {/* === 제작/설정 탭 === */}
        {activeTab === 'create' && (
          <div className="fade-in card" style={{padding: '0 20px'}}>
            <ul className="settings-list">
              <li><span>📖 앱 사용 가이드</span> <span>❯</span></li>
              <li><span>🎨 전체 테마 설정 <span className="badge">NEW</span></span> <span>❯</span></li>
              <li><span>🔔 알림 설정 (밥, 약 시간)</span> <span>❯</span></li>
              <li><span>💾 데이터 백업 및 복구</span> <span>❯</span></li>
              <li><span>💬 개발자에게 문의하기</span> <span>❯</span></li>
              <li><span>ℹ️ 앱 버전 정보</span> <span style={{color:'#888', fontSize:'13px'}}>v1.0.2</span></li>
            </ul>
          </div>
        )}
      </main>

      {/* 하단 네비게이션 */}
      <nav>
        {[
          { id: 'care', label: '오늘 케어', icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
          { id: 'calendar', label: '종합 달력', icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" },
          { id: 'expense', label: '지출 관리', icon: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
          { id: 'album', label: '냥이 앨범', icon: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" },
          { id: 'trash', label: '휴지통', icon: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" },
          { id: 'create', label: '제작/설정', icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }
        ].map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <svg viewBox="0 0 24 24"><path d={item.icon}/></svg>
            <span>{item.label}</span>
          </button>
        ))}
        <div className="bottom-theme-text">🏡 전체 바탕 테마 변경</div>
      </nav>
    </div>
  );
}
