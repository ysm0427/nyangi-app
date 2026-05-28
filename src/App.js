import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('care');
  const [expenses, setExpenses] = useState([
    { id: 1, name: '고양이 모래 3세트', date: '2026. 05. 28', price: '45,000', img: null }
  ]);
  const [expName, setExpName] = useState('');
  const [expPrice, setExpPrice] = useState('');
  const [expImg, setExpImg] = useState(null);

  // 탭 제목 변경 로직
  const getTabTitle = () => {
    switch(activeTab) {
      case 'care': return '오늘의 케어';
      case 'calendar': return '달력 관리';
      case 'expense': return '지출 내역';
      case 'album': return '사진 앨범';
      case 'trash': return '휴지통';
      case 'create': return '제작 및 설정';
      default: return '오늘케어';
    }
  };

  // 사진 첨부 로직
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setExpImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 지출 내역 저장 로직
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const dateStr = `${today.getFullYear()}. ${String(today.getMonth()+1).padStart(2,'0')}. ${String(today.getDate()).padStart(2,'0')}`;
    
    const newExpense = {
      id: Date.now(),
      name: expName,
      date: dateStr,
      price: Number(expPrice).toLocaleString(),
      img: expImg
    };
    
    setExpenses([newExpense, ...expenses]);
    setExpName('');
    setExpPrice('');
    setExpImg(null);
  };

  // CSS 스타일
  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, sans-serif; }
    body { background-color: #f4f5f7; color: #333; }
    #app-container { width: 100%; max-width: 480px; margin: 0 auto; background-color: #ffffff; min-height: 100vh; position: relative; display: flex; flex-direction: column; box-shadow: 0 0 20px rgba(0,0,0,0.05); }
    header { background: #fff; padding: 20px; text-align: center; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 100; }
    header h1 { font-size: 18px; font-weight: 700; color: #2c3e50; margin: 0; }
    main { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: 90px; }
    .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    .card-title { font-size: 18px; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
    .check-list { list-style: none; }
    .check-list li { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
    .check-list li:last-child { border-bottom: none; padding-bottom: 0; }
    .check-list input[type="checkbox"] { width: 20px; height: 20px; margin-right: 12px; accent-color: #4CAF50; cursor: pointer; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
    .form-group input { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; outline: none; }
    .form-group input:focus { border-color: #2ecc71; }
    .upload-box { border: 2px dashed #dcdde1; border-radius: 10px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer; position: relative; }
    .upload-box input[type="file"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
    .submit-btn { width: 100%; background: #2c3e50; color: #fff; border: none; padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .expense-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
    .expense-left { display: flex; align-items: center; gap: 12px; }
    .expense-thumb { width: 48px; height: 48px; background: #eee; border-radius: 8px; object-fit: cover; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #999; }
    .expense-info h4 { font-size: 15px; margin-bottom: 4px; color: #333; margin:0; }
    .expense-info p { font-size: 12px; color: #888; margin:0; }
    .expense-amount { font-weight: 700; color: #e74c3c; font-size: 16px; }
    nav { position: fixed; bottom: 0; width: 100%; max-width: 480px; background: #fff; border-top: 1px solid #eaeaea; display: flex; justify-content: space-around; padding: 10px 0; z-index: 100; }
    .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #a4b0be; cursor: pointer; font-size: 11px; font-weight: 500; flex: 1; padding: 5px 0; }
    .nav-btn svg { width: 24px; height: 24px; fill: currentColor; }
    .nav-btn.active { color: #2ecc71; }
  `;

  return (
    <div id="app-container">
      <style>{styles}</style>
      <header>
        <h1>{getTabTitle()}</h1>
      </header>

      <main>
        {/* 1. 케어 탭 */}
        {activeTab === 'care' && (
          <div>
            <div className="card">
              <div className="card-title">👑 벨라</div>
              <ul className="check-list">
                <li><input type="checkbox" /> 아침 식사 챙겨주기</li>
                <li><input type="checkbox" /> 빗질 10분 해주기</li>
                <li><input type="checkbox" /> 화장실 모래 정리</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-title">🍼 로이</div>
              <ul className="check-list">
                <li><input type="checkbox" /> 아침 식사 챙겨주기</li>
                <li><input type="checkbox" /> 영양제 먹이기</li>
                <li><input type="checkbox" /> 장난감 사냥놀이</li>
              </ul>
            </div>
          </div>
        )}

        {/* 2. 지출 탭 */}
        {activeTab === 'expense' && (
          <div>
            <div className="card">
              <div className="card-title">🧾 새로운 지출 등록</div>
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
              <div className="card-title">최근 지출 내역</div>
              <div>
                {expenses.map(exp => (
                  <div key={exp.id} className="expense-item">
                    <div className="expense-left">
                      {exp.img ? <img src={exp.img} className="expense-thumb" alt="영수증" /> : <div className="expense-thumb">NO IMG</div>}
                      <div className="expense-info">
                        <h4>{exp.name}</h4>
                        <p>{exp.date}</p>
                      </div>
                    </div>
                    <div className="expense-amount">{exp.price}원</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 나머지 탭 */}
        {activeTab === 'calendar' && <div className="card"><h3>달력 및 일정</h3></div>}
        {activeTab === 'album' && <div className="card"><h3>앨범</h3></div>}
        {activeTab === 'trash' && <div className="card"><h3>휴지통</h3></div>}
        {activeTab === 'create' && <div className="card"><h3>제작/설정</h3></div>}
      </main>

      <nav>
        {[
          { id: 'care', label: '케어', icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
          { id: 'calendar', label: '달력', icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" },
          { id: 'expense', label: '지출', icon: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
          { id: 'album', label: '앨범', icon: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" },
          { id: 'trash', label: '휴지통', icon: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" },
          { id: 'create', label: '제작', icon: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49-.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" }
        ].map(item => (
          <button key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <svg viewBox="0 0 24 24"><path d={item.icon}/></svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
