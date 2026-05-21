import React, { useState } from 'react';

const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  AddPhoto: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
};

const BIRTH_DATES = { "벨라": "2024-01-20", "로이": "2025-12-10" };
const PHOTO_EMOJIS = ["🐈", "🐾", "🎀", "🧸", "👑", "🐱", "🍼", "🧶", "🐟", "💤"];

export default function App() {
  const [tabIdx, setTabIdx] = useState(0);
  const [currentCat, setCurrentCat] = useState("벨라");
  const [profilePics, setProfilePics] = useState({ "벨라": null, "로이": null });
  
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [careItems, setCareItems] = useState({
    "벨라": [
      { id: "water", title: "음수량 측정", icon: "💧", unit: "ml" },
      { id: "brush", title: "렉돌 코트 빗질", icon: "🪮", unit: "회" },
      { id: "pill", title: "영양제 챙기기", icon: "💊", unit: "회" }
    ],
    "로이": [
      { id: "water", title: "음수량 측정", icon: "💧", unit: "ml" },
      { id: "walk", title: "캣쇼 워킹 연습", icon: "🧸", unit: "분" },
      { id: "weight", title: "몸무게 체크", icon: "⚖️", unit: "kg" }
    ]
  });

  const [careRecords, setCareRecords] = useState({
    "벨라": {
      "brush": { [getTodayDateString()]: [{ amount: 1, time: "10:30" }] }
    },
    "로이": {}
  });

  const [expenses, setExpenses] = useState([{ detail: "벨라 간식 캔", amount: 14500 }]);
  const [schedules, setSchedules] = useState([{ time: "14:00", title: "동물병원 검진 🏥" }]);
  const [albums, setAlbums] = useState({ "벨라": ["🐈", "🐾"], "로이": ["🐱", "🍼"] });

  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');

  const [modalState, setModalState] = useState({ isOpen: false, type: null });
  const [formData, setFormData] = useState({ title: '', amount: '', time: '', unit: '', icon: '' });

  const getAge = (dateStr) => {
    const birth = new Date(dateStr);
    const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    return months >= 12 ? `${Math.floor(months / 12)}살 ${months % 12}개월` : `${months}개월 차`;
  };

  const getDdayInfo = (dateStr) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birth = new Date(dateStr);
    const birthDay = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
    
    const diffSinceBirth = today.getTime() - birthDay.getTime();
    const daysSince = Math.floor(diffSinceBirth / (1000 * 60 * 60 * 24));
    
    let nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth < today) nextBirth.setFullYear(today.getFullYear() + 1);
    
    const diffUntilNext = nextBirth.getTime() - today.getTime();
    const daysUntil = Math.ceil(diffUntilNext / (1000 * 60 * 60 * 24));
    
    const dDayStr = daysUntil === 0 ? 'D-Day🎉' : `D-${daysUntil}`;
    return `D+${daysSince}일 / 생일 ${dDayStr}`;
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePics({ ...profilePics, [currentCat]: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteProfilePic = () => {
    setProfilePics({ ...profilePics, [currentCat]: null });
  };

  const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const deleteCareItem = (idx) => {
    const newItems = { ...careItems };
    newItems[currentCat].splice(idx, 1);
    setCareItems(newItems);
  };

  const deleteExpense = (idx) => {
    const newExp = [...expenses];
    newExp.splice(idx, 1);
    setExpenses(newExp);
  };

  const deleteSchedule = (idx) => {
    const newSch = [...schedules];
    newSch.splice(idx, 1);
    setSchedules(newSch);
  };

  const handleAddRecord = (amount) => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRecords = { ...careRecords };
    if (!newRecords[currentCat]) newRecords[currentCat] = {};
    if (!newRecords[currentCat][activeTracker.id]) newRecords[currentCat][activeTracker.id] = {};
    if (!newRecords[currentCat][activeTracker.id][trackerDate]) newRecords[currentCat][activeTracker.id][trackerDate] = [];
    
    newRecords[currentCat][activeTracker.id][trackerDate].push({ amount: numAmount, time: timeStr });
    
    setCareRecords(newRecords);
    setTrackerInputAmount('');
  };

  const handleDeleteRecord = (index) => {
    const newRecords = { ...careRecords };
    newRecords[currentCat][activeTracker.id][trackerDate].splice(index, 1);
    setCareRecords(newRecords);
  };

  const renderTab0 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-center p-3 bg-[#A3E4D7] bg-opacity-20 backdrop-blur-sm">
        {["벨라", "로이"].map((catName) => (
          <button
            key={catName}
            onClick={() => setCurrentCat(catName)}
            className={`mx-2 px-6 py-2 rounded-2xl border-2 transition-all duration-200 font-bold ${
              currentCat === catName 
                ? 'bg-white border-[#A3E4D7] shadow-sm text-gray-800' 
                : 'bg-white/60 border-transparent text-gray-500 hover:bg-white/80'
            }`}
          >
            {catName === '벨라' ? '👑' : '🍼'} {catName}
          </button>
        ))}
      </div>

      <div className="m-4 p-4 bg-white rounded-xl border border-[#A3E4D7] shadow-sm flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          {profilePics[currentCat] ? (
            <>
              <img src={profilePics[currentCat]} alt="profile" className="w-full h-full rounded-full object-cover border-2 border-[#A3E4D7]" />
              <button 
                onClick={deleteProfilePic}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm transition-colors z-10"
              >
                <Icons.Close />
              </button>
            </>
          ) : (
            <label className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300 transition-colors group">
              <span className="text-3xl">{currentCat === '벨라' ? '👑' : '🍼'}</span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Icons.AddPhoto />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
            </label>
          )}
        </div>
        
        <div>
          <h2 className="font-bold text-lg text-gray-800">{currentCat}의 프로필</h2>
          <p className="text-teal-600 text-sm font-bold mt-1">
            🎂 생일: {BIRTH_DATES[currentCat]}
          </p>
          <p className="text-gray-500 text-[11px] font-medium mt-1 tracking-tight">
            ({getAge(BIRTH_DATES[currentCat])}, {getDdayInfo(BIRTH_DATES[currentCat])})
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {careItems[currentCat].map((item, i) => {
          const todayRecords = careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || [];
          const total = todayRecords.reduce((sum, r) => sum + r.amount, 0);

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }}
                className="w-full bg-white hover:bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-2xl shadow-inner border border-teal-100">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-800 text-lg">{item.title}</span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">오늘 누적: <strong className="text-teal-600">{Number.isInteger(total) ? total : total.toFixed(1)} {item.unit}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pr-2">
                  <span className="bg-[#A3E4D7] text-teal-900 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                    기록하기 ❯
                  </span>
                </div>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteCareItem(i); }} 
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Icons.Delete />
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 shrink-0 border-t border-gray-100 bg-white">
        <button 
          onClick={() => { setModalState({ isOpen: true, type: 'careItem' }); setFormData({ title: '', amount: '', time: '', unit: '회', icon: '✨' }); }}
          className="w-full py-3.5 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-[15px]"
        >
          <span className="text-xl leading-none">+</span> 새로운 케어 항목 추가
        </button>
      </div>
    </div>
  );

  const renderTab1 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 space-y-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">💰 지출 내역</h3>
          <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">{totalExpense.toLocaleString()}원</span>
        </div>
        <div className="space-y-2 mb-3">
          {expenses.map((exp, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <p className="font-bold text-gray-800 text-sm">{exp.detail}</p>
                <p className="text-xs text-gray-500">{exp.amount.toLocaleString()}원</p>
              </div>
              <button onClick={() => deleteExpense(i)} className="text-gray-400 hover:text-red-500 p-1"><Icons.Delete /></button>
            </div>
          ))}
          {expenses.length === 0 && <p className="text-center text-sm text-gray-400 py-4">지출 내역이 없습니다.</p>}
        </div>
        <button onClick={() => { setModalState({ isOpen: true, type: 'expense' }); setFormData({ title: '', amount: '', time: '', unit: '', icon: '' }); }} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm transition-colors">+ 지출 추가</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">📅 {currentCat} 일정</h3>
          <span className="text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full text-sm">{schedules.length}건</span>
        </div>
        <div className="space-y-2 mb-3">
          {schedules.map((sch, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex gap-3 items-center">
                <span className="text-amber-600 font-bold text-sm bg-amber-100 px-2 py-1 rounded">{sch.time}</span>
                <p className="font-bold text-gray-800 text-sm">{sch.title}</p>
              </div>
              <button onClick={() => deleteSchedule(i)} className="text-gray-400 hover:text-red-500 p-1"><Icons.Delete /></button>
            </div>
          ))}
          {schedules.length === 0 && <p className="text-center text-sm text-gray-400 py-4">등록된 일정이 없습니다.</p>}
        </div>
        <button onClick={() => { setModalState({ isOpen: true, type: 'schedule' }); setFormData({ title: '', amount: '', time: '', unit: '', icon: '' }); }} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm transition-colors">+ 일정 추가</button>
      </div>
    </div>
  );

  const renderTab2 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="w-full p-3 bg-[#E8F8F5] border-b border-teal-100">
        <p className="text-center font-bold text-teal-700">보관된 사진: {albums[currentCat].length}장</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {albums[currentCat].map((emoji, i) => (
            <div key={i} className="aspect-square relative bg-[#FADBD8] bg-opacity-20 rounded-xl border border-[#A3E4D7] flex items-center justify-center text-4xl shadow-sm">
              {emoji}
              <button 
                onClick={() => {
                  const newAlbums = {...albums};
                  newAlbums[currentCat].splice(i, 1);
                  setAlbums(newAlbums);
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Icons.Close />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button 
          onClick={() => {
             const emoji = PHOTO_EMOJIS[albums[currentCat].length % PHOTO_EMOJIS.length];
             setAlbums({ ...albums, [currentCat]: [...albums[currentCat], emoji] });
          }}
          className="w-full py-3 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2"
        >
          <Icons.AddPhoto /> {currentCat} 사진 추가
        </button>
      </div>
    </div>
  );

  const renderTab3 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-2xl font-black text-gray-800 mb-6">앱 정보</h2>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-teal-600 mb-2">🧑‍💻 개발자 정보</h3>
        <p className="text-gray-700 font-bold text-lg">벨라와 로이 아빠</p>
        <p className="text-sm text-gray-400 mt-2">개인용 반려동물 건강관리 모바일 앱</p>
        <p className="text-xs text-teal-500 font-bold mt-2">🚀 추후 상용화(스토어 출시)를 목표로 제작 중</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-teal-600 mb-3">🛠 제작 노트</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex gap-2"><span>•</span><span>React 기반 모바일-first 아키텍처 설계</span></li>
          <li className="flex gap-2"><span>•</span><span>개별 케어 항목 트래커 및 상세 기록 기능</span></li>
          <li className="flex gap-2"><span>•</span><span>데이터 시각화 및 모바일 웹 최적화</span></li>
          <li className="flex gap-2"><span>•</span><span>상용화 대비 상태 관리 고도화 중</span></li>
        </ul>
      </div>

      <div className="text-center mt-auto py-4">
        <p className="text-[11px] font-bold text-gray-300">© 2026 NyangiApp Project. All Rights Reserved.</p>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!modalState.isOpen) return null;

    let title = "";
    if (modalState.type === 'careItem') title = `${currentCat} 케어 항목 추가`;
    if (modalState.type === 'expense') title = `지출 추가`;
    if (modalState.type === 'schedule') title = `일정 추가`;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[320px] shadow-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          </div>
          <div className="p-5 space-y-3">
            {modalState.type === 'careItem' && (
              <>
                <p className="text-xs font-bold text-gray-500 mb-1">아이콘 선택</p>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                  {["✨", "💧", "🥣", "💊", "🪮", "⚖️", "🧸", "🏥", "🐾", "🚿", "✂️"].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({...formData, icon: emoji})}
                      className={`text-2xl p-2 rounded-xl border shrink-0 transition-colors ${formData.icon === emoji ? 'bg-teal-50 border-teal-400 shadow-sm' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </>
            )}
            {modalState.type === 'schedule' && (
              <input 
                type="text" 
                placeholder="시간 (예: 12:00)" 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm"
              />
            )}
            <input 
              type="text" 
              placeholder={modalState.type === 'careItem' ? "항목 이름 (예: 사료 급여)" : "내용을 입력하세요"}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              autoFocus
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm"
            />
            {modalState.type === 'careItem' && (
              <input 
                type="text" 
                placeholder="단위 (예: 회, ml, g, 분)" 
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm"
              />
            )}
            {modalState.type === 'expense' && (
              <input 
                type="number" 
                placeholder="금액 (숫자만)" 
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm"
              />
            )}
          </div>
          <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
            <button onClick={() => setModalState({ isOpen: false, type: null })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              취소
            </button>
            <button onClick={() => {
              if (modalState.type === 'careItem' && formData.title) {
                setCareItems({...careItems, [currentCat]: [...careItems[currentCat], {id: Date.now().toString(), ...formData}]});
              } else if (modalState.type === 'expense' && formData.title && formData.amount) {
                setExpenses([...expenses, { detail: formData.title, amount: Number(formData.amount) }]);
              } else if (modalState.type === 'schedule' && formData.title && formData.time) {
                setSchedules([...schedules, { time: formData.time, title: formData.title }]);
              }
              setModalState({ isOpen: false, type: null });
            }} className="px-4 py-2 text-sm font-bold bg-[#A3E4D7] text-gray-800 hover:bg-[#8fd9cb] rounded-lg transition-colors">
              추가
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTrackerScreen = () => {
    const isOpen = activeTracker !== null;
    const tracker = activeTracker || { id: '', title: '', unit: '', icon: '' };
    const dailyRecords = (careRecords[currentCat]?.[tracker.id]?.[trackerDate]) || [];
    const totalAmount = dailyRecords.reduce((sum, record) => sum + record.amount, 0);

    let quickAmounts = [1, 2, 3];
    if (tracker.unit === 'ml') quickAmounts = [30, 50, 100];
    else if (tracker.unit === 'g') quickAmounts = [10, 30, 50];
    else if (tracker.unit === '분' || tracker.unit === '시간') quickAmounts = [5, 10, 30];
    else if (tracker.unit === 'kg') quickAmounts = [0.1, 0.5, 1];

    const [calYear, calMonth] = trackerDate.split('-').map(Number);
    const firstDay = new Date(calYear, calMonth - 1, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth, 0).getDate();
    const calendarDays = Array.from({ length: firstDay }).map(() => null).concat(
      Array.from({ length: daysInMonth }).map((_, i) => i + 1)
    );

    const handleMonthChange = (offset) => {
      const newDate = new Date(calYear, calMonth - 1 + offset, 1);
      setTrackerDate(`${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-01`);
    };

    return (
      <div className={`absolute inset-0 bg-gray-50 z-40 transition-transform duration-300 transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center p-4 bg-white border-b border-gray-200 shrink-0 shadow-sm z-20">
          <button onClick={() => setActiveTracker(null)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.ChevronLeft />
          </button>
          <h2 className="flex-1 text-center font-bold text-lg text-gray-800 mr-8">{currentCat} {tracker.title} 기록</h2>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="bg-white px-4 py-3 shrink-0 border-b border-gray-100 shadow-sm z-10">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => handleMonthChange(-1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronLeft /></button>
              <span className="font-bold text-lg text-gray-800">{calYear}년 {calMonth}월</span>
              <button onClick={() => handleMonthChange(1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                <div key={day} className={`text-[11px] font-bold py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, idx) => {
                if (!d) return <div key={`empty-${idx}`} className="h-[46px]"></div>;
                const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dayRecords = careRecords[currentCat]?.[tracker.id]?.[dateStr] || [];
                const dayTotal = dayRecords.reduce((sum, r) => sum + r.amount, 0);
                const isSelected = trackerDate === dateStr;
                const isToday = getTodayDateString() === dateStr;

                return (
                  <button
                    key={d}
                    onClick={() => setTrackerDate(dateStr)}
                    className={`flex flex-col items-center justify-start h-[46px] rounded-lg py-1 border transition-all ${isSelected ? 'border-teal-400 bg-teal-50 ring-1 ring-teal-400' : isToday ? 'border-gray-300 bg-gray-50' : 'border-transparent hover:bg-gray-50'}`}
                  >
                    <span className={`text-[13px] font-medium leading-none mb-1 ${isSelected ? 'text-teal-700 font-bold' : isToday ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>{d}</span>
                    {dayTotal > 0 && (
                      <span className="text-[9px] font-bold text-teal-600 bg-white/60 px-1 rounded-sm truncate w-full text-center leading-none">
                        {Number.isInteger(dayTotal) ? dayTotal : dayTotal.toFixed(1)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-b from-white to-teal-50/50 shrink-0 border-b border-teal-100">
             <div className="flex items-center gap-2 mb-2">
               <span className="text-xl">{tracker.icon}</span>
               <span className="text-sm font-bold text-teal-700 bg-teal-100/50 px-3 py-1 rounded-full">{trackerDate} 총 기록</span>
             </div>
             <p className="text-4xl font-black text-teal-600">
               {Number.isInteger(totalAmount) ? totalAmount : totalAmount.toFixed(1)}
               <span className="text-2xl text-teal-400 font-bold ml-1">{tracker.unit}</span>
             </p>
          </div>

          <div className="p-4 bg-white shadow-sm shrink-0 border-b border-gray-100">
            <div className="flex gap-2 mb-3">
              {quickAmounts.map(amount => (
                <button 
                  key={amount} 
                  onClick={() => handleAddRecord(amount)}
                  className="flex-1 py-2 bg-teal-50 text-teal-700 font-bold rounded-lg border border-teal-100 hover:bg-teal-100 transition-colors text-sm"
                >
                  +{amount}{tracker.unit}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder={`직접 입력 (${tracker.unit})`} 
                value={trackerInputAmount}
                onChange={e => setTrackerInputAmount(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
              />
              <button 
                onClick={() => handleAddRecord(trackerInputAmount)}
                className="px-6 py-2.5 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl transition-colors shadow-sm"
              >
                등록
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-2 bg-gray-50">
            {dailyRecords.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-gray-400 space-y-3">
                <div className="text-4xl opacity-50 grayscale">{tracker.icon}</div>
                <p className="text-sm font-medium">아직 기록된 내용이 없어요!</p>
              </div>
            ) : (
              dailyRecords.map((record, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 text-xl rounded-full flex items-center justify-center">
                      {tracker.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{record.amount} <span className="text-sm font-medium text-gray-500">{tracker.unit}</span></p>
                      <p className="text-xs text-gray-400 font-medium">{record.time}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteRecord(i)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
                    <Icons.Delete />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3()];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900">
        <div className="flex-1 overflow-hidden relative">
          {tabs[tabIdx]}
        </div>

        <div className="flex justify-around items-center bg-white border-t border-gray-200 pb-safe pt-2 px-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-30 shrink-0 h-16">
          {[
            { icon: <Icons.CheckSquare />, label: "오늘 케어" },
            { icon: <Icons.Calendar />, label: "가계부/일정" },
            { icon: <Icons.PhotoLibrary />, label: "냥이 앨범" },
            { icon: <Icons.Info />, label: "앱 정보" }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setTabIdx(idx)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                tabIdx === idx ? 'text-[#A3E4D7]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>

        {renderModal()}
        {renderTrackerScreen()}
      </div>
    </div>
  );
}
