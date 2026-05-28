import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [activePet, setActivePet] = useState('vella'); // 벨라, 로이 탭 상태

  // 지출 관리 상태 (이전 기능 유지)
  const [expenses, setExpenses] = useState([
    { id: 1, name: '고양이 모래 3세트', date: '2026. 05. 28', price: '45,000', img: null }
  ]);
  const [expName, setExpName] = useState('');
  const [expPrice, setExpPrice] = useState('');
  const [expImg, setExpImg] = useState(null);

  // 지출 관리 로직
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

  // 1번 이미지 스타일 완벽 구현 CSS
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, sans-serif; }
    body { background-color: #e8eaed; color: #333; display: flex; justify-content: center; }
    
    /* 앱 전체 컨테이너 (스마트폰 비율) */
    #app-container { 
      width: 100%; max-width: 480px; margin: 0 auto; background-color: #f7f9fa; 
      min-height: 100vh; position: relative; display: flex; flex-direction: column; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
    }

    /* 상단 펫 선택 탭 (민트 배경) */
    .top-pet-nav {
      display: flex; justify-content: space-between; align-items: center; 
      padding: 15px 20px; background-color: #eaf8f5; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;
    }
    .pet-tabs { display: flex; gap: 10px; }
    .pet-tab { 
      background: #fff; border: 1px solid #e0e0e0; padding: 8px 16px; 
      border-radius: 20px; font-weight: 600; font-size: 14px; color: #999; 
      cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.2s;
    }
    .pet-tab.active { color: #333; border-color: #a7ecd9; box-shadow: 0 2px 5px rgba(167, 236, 217, 0.3); }
    .pet-edit-btn {
      background: #344054; color: #fff; border: none; padding: 8px 14px; 
      border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;
    }

    /* 메인 컨텐츠 영역 */
    main { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: 120px; }

    /* 프로필 카드 (벨라) */
    .profile-card {
      background: #fff; border: 1px solid #a7ecd9; border-radius: 16px; 
      padding: 20px; display: flex; align-items: center; gap: 20px; margin-bottom: 20px;
    }
    .profile-avatar {
      width: 70px; height: 70px; border-radius: 50%; border: 2px dashed #d1d5db; 
      display: flex; justify-content: center; align-items: center; font-size: 30px; background: #f9fafb;
    }
    .profile-info h2 { font-size: 18px; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
    .gender-badge { background: #ffe4e6; color: #e11d48; font-size: 11px; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
    .birth-info { font-size: 13px; color: #059669; font-weight: 600; margin-bottom: 4px; }
    .d-day-info { font-size: 11px; color: #888; }

    /* 케어 항목 리스트 */
    .care-item {
      background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; 
      padding: 15px; display: flex; align-items: center; justify-content: space-between; 
      margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.01);
    }
    .care-left { display: flex; align-items: center; gap: 15px; }
    .care-icon {
      width: 50px; height: 50px; border-radius: 50%; border: 2px solid; 
      display: flex; justify-content: center; align-items: center; font-size: 24px;
    }
    .care-text h3 { font-size: 16px; color: #111; margin-bottom: 4px; }
    .care-text p { font-size: 13px; color: #0d9488; font-weight: 600; }
    .care-actions { display: flex; align-items: center; gap: 10px; }
    .record-btn {
      background: #a7ecd9; color: #065f46; border: none; padding: 8px 12px; 
      border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer;
    }
    .delete-btn { background: none; border: none; color: #ccc; cursor: pointer; font-size: 16px; }

    /* 하단 버튼들 */
    .add-care-btn {
      width: 100%; background: #a7ecd9; color: #065f46; border: none; 
      padding: 16px; border-radius: 12px; font-size: 15px; font-weight: bold; 
      margin-top: 10px; cursor: pointer;
    }
    .deco-btn {
      position: absolute; right: 20px; bottom: 90px; background: #fff; 
      border: 1px solid #eee; box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
      padding: 10px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; z-index: 10;
    }

    /* 하단 네비게이션바 (아이콘 및 색상 매칭) */
    nav {
      position: absolute; bottom: 0; width: 100%; background: #fff; 
      border-top: 1px solid #eee; border-top-left-radius: 20px; border-top-right-radius: 20px;
      display: flex; justify-content: space-around; padding: 12px 0 25px 0; z-index: 100;
    }
    .nav-btn {
      background: none; border: none; display: flex; flex-direction: column; 
      align-items: center; gap: 6px; color: #b0b8c1; cursor: pointer; font-size: 10px; font-weight: 600;
    }
    .nav-btn svg { width: 22px; height: 22px; fill: currentColor; }
    .nav-btn.active { color: #10b981; }

    /* 지출관리 화면용 기존 폼 스타일 */
    .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
    .form-group input { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; outline: none; }
    .form-group input:focus { border-color: #a7ecd9; }
    .upload-box { border: 2px dashed #dcdde1; border-radius: 10px; padding: 20px; text-align: center; background: #fafafa; position: relative; }
    .upload-box input[type="file"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
    .submit-btn { width: 100%; background: #344054; color: #fff; border: none; padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .expense-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
    .expense-thumb { width: 48px; height: 48px; background: #eee; border-radius: 8px; object-fit: cover; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #999; }
  `;

  return (
    <div id="app-container">
      <style>{styles}</style>
      
      {/* 1번 이미지 상단: 펫 선택 및 수정 헤더 */}
      <div className="top-pet-nav">
        <div className="pet-tabs">
          <button className={`pet-tab ${activePet === 'vella' ? 'active' : ''}`} onClick={() => setActivePet('vella')}>👑 벨라</button>
          <button className={`pet-tab ${activePet === 'roy' ? 'active' : ''}`} onClick={() => setActivePet('roy')}>🍼 로이</button>
        </div>
        <button className="pet-edit-btn">⚙️ 냥이 추가/수정</button>
      </div>

      <main>
        {/* === 1. 케어 탭 (1번 이미지 완벽 구현) === */}
        {activeTab === 'care' && (
          <div>
            {/* 프로필 카드 */}
            <div className="profile-card">
              <div className="profile-avatar">👑</div>
              <div className="profile-info">
                <h2>벨라 <span className="gender-badge">여아 ♀</span></h2>
                <p className="birth-info">🎂 생일: 2024-01-20</p>
                <p className="d-day-info">(2살 4개월, D+857일 / 생일 D-239)</p>
              </div>
            </div>

            {/* 케어 리스트 1: 음수량 */}
            <div className="care-item">
              <div className="care-left">
                <div className="care-icon" style={{ borderColor: '#bfdbfe', color: '#3b82f6', background: '#eff6ff' }}>💧</div>
                <div className="care-text">
                  <h3>음수량 측정</h3>
                  <p>오늘 기록: ml</p>
                </div>
              </div>
              <div className="care-actions">
                <button className="record-btn">기록하기 ❯</button>
                <button className="delete-btn">🗑️</button>
              </div>
            </div>

            {/* 케어 리스트 2: 렉돌 빗질 */}
            <div className="care-item">
              <div className="care-left">
                <div className="care-icon" style={{ borderColor: '#e9d5ff', color: '#9333ea', background: '#faf5ff' }}>🪮</div>
                <div className="care-text">
                  <h3>렉돌 코트 빗질</h3>
                  <p>오늘 기록: 회</p>
                </div>
              </div>
              <div className="care-actions">
                <button className="record-btn">기록하기 ❯</button>
                <button className="delete-btn">🗑️</button>
              </div>
            </div>

            {/* 케어 리스트 3: 영양제 */}
            <div className="care-item">
              <div className="care-left">
                <div className="care-icon" style={{ borderColor: '#fecdd3', color: '#e11d48', background: '#fff1f2' }}>💊</div>
                <div className="care-text">
                  <h3>영양제 챙기기</h3>
                  <p>오늘 기록: 알</p>
                </div>
              </div>
              <div className="care-actions">
                <button className="record-btn">기록하기 ❯</button>
                <button className="delete-btn">🗑️</button>
              </div>
            </div>

            <button className="add-care-btn">+ 새로운 케어 항목 추가</button>
            <button className="deco-btn">🎨 꾸미기</button>
          </div>
        )}

        {/* === 2. 지출 탭 (기존 기능 유지) === */}
        {activeTab === 'expense' && (
          <div>
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>🧾 새로운 지출 등록</h3>
              <form onSubmit={handleExpenseSubmit}>
                <div className="form-group">
                  <label>구매 항목</label>
                  <input type="text" value={expName} onChange={e => setExpName(e.target.value)} placeholder="예) 로이 사료, 벨라 간식" required />
                </div>
                <div className="form-group">
                  <label>결제 금액</label>
                  <input type="number" value={expPrice} onChange={e => setExpPrice(e.target.value)} placeholder="금액을 숫자로 입력" required />
                </div>
                <div className="form-group">
                  <label>영수증 및 구매 인증 샷</label>
                  <div className="upload-box">
                    {!expImg && <span>📸 여기를 눌러 사진을 첨부하세요</span>}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {expImg && <img src={expImg} alt="미리보기" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', marginTop: '10px', objectFit: 'cover' }} />}
                  </div>
                </div>
                <button type="submit" className="submit-btn">지출 내역 저장</button>
              </form>
            </div>
            
            <div className="card">
              <h3 style={{marginBottom: '15px'}}>최근 지출 내역</h3>
              <div>
                {expenses.map(exp => (
                  <div key={exp.id} className="expense-item">
                    <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                      {exp.img ? <img src={exp.img} className="expense-thumb" alt="영수증" /> : <div className="expense-thumb">NO IMG</div>}
                      <div>
                        <h4 style={{fontSize:'15px', marginBottom:'4px'}}>{exp.name}</h4>
                        <p style={{fontSize:'12px', color:'#888'}}>{exp.date}</p>
                      </div>
                    </div>
                    <div style={{fontWeight:'bold', color:'#e74c3c'}}>{exp.price}원</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 기타 탭 더미 */}
        {activeTab === 'calendar' && <div className="card"><h3>달력 및 일정</h3></div>}
        {activeTab === 'album' && <div className="card"><h3>앨범</h3></div>}
        {activeTab === 'trash' && <div className="card"><h3>휴지통</h3></div>}
        {activeTab === 'create' && <div className="card"><h3>제작 과정</h3></div>}
      </main>

      {/* 하단 네비게이션 (1번 이미지 텍스트 매칭) */}
      <nav>
        {[
          { id: 'care', label: '오늘 케어', icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
          { id: 'calendar', label: '종합 달력', icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" },
          { id: 'expense', label: '지출 관리', icon: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
          { id: 'album', label: '냥이 앨범', icon: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" },
          { id: 'trash', label: '휴지통', icon: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" },
          { id: 'create', label: '제작 과정', icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }
        ].map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <svg viewBox="0 0 24 24"><path d={item.icon}/></svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* 최하단 테마 변경 텍스트 */}
      <div style={{position: 'absolute', bottom: '6px', width: '100%', textAlign: 'center', fontSize: '9px', color: '#999', zIndex: 101}}>
        🏡 전체 바탕 테마 변경
      </div>
    </div>
  );
}
