import React, { useState, useEffect } from 'react';

// 1. 마스터 순정 SVG 아이콘 에셋 세트
const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Restore: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
};

const COLOR_MAP = { red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-400', green: 'bg-green-500', blue: 'bg-blue-500', purple: 'bg-purple-500' };
const EXPANDED_EMOJIS = ["✨", "💧", "🥣", "💊", "🪮", "⚖️", "🧸", "🏥", "🐾", "🚿", "✂️", "🥩", "🐟", "🍼", "🦷", "👁️", "👂", "🩹", "🧻", "💩", "🧺", "🧶", "🐭", "🦗", "🏡", "🚗", "🥇", "🎗️", "📅", "⏰", "💤", "❤️", "🐈"];

export default function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [tabIdx, setTabIdx] = useState(0);

  // 스마트 정밀 슬라이딩 센서 데이터 변수
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  // 로컬 스토리지 연동 브레인 가동
  const getLocalData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    try { return saved ? JSON.parse(saved) : fallback; } catch (e) { return fallback; }
  };

  // 대형 데이터 엔진 활성화
  const [cats, setCats] = useState(() => getLocalData('cats', [
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑", gender: "여아" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼", gender: "남아" }
  ]));
  const [currentCat, setCurrentCat] = useState("벨라");
  const [profilePics, setProfilePics] = useState(() => getLocalData('profilePics', {}));
  const [isAlbumEditMode, setIsAlbumEditMode] = useState(false);
  const [dashboardDate, setDashboardDate] = useState(getTodayDateString());
  const [dashYear, setDashYear] = useState(new Date().getFullYear());
  const [dashMonth, setDashMonth] = useState(new Date().getMonth() + 1);
  const [trashBin, setTrashBin] = useState(() => getLocalData('trashBin', []));

  const [careItems, setCareItems] = useState(() => getLocalData('careItems', {
    "벨라": [
      { id: "water", title: "음수량 측정", icon: "💧", isCustomImg: false, unit: "ml", color: "blue" },
      { id: "brush", title: "렉돌 코트 빗질", icon: "🪮", isCustomImg: false, unit: "회", color: "purple" },
      { id: "pill", title: "영양제 챙기기", icon: "💊", isCustomImg: false, unit: "알", color: "red" }
    ],
    "로이": [
      { id: "water", title: "음수량 측정", icon: "💧", isCustomImg: false, unit: "ml", color: "blue" },
      { id: "walk", title: "캣쇼 워킹 연습", icon: "🧸", isCustomImg: false, unit: "분", color: "orange" },
      { id: "weight", title: "몸무게 체크", icon: "⚖️", unit: "kg", color: "green" }
    ]
  }));

  const [careRecords, setCareRecords] = useState(() => getLocalData('careRecords', {}));
  const [expenses, setExpenses] = useState(() => getLocalData('expenses', [{ id: "exp-1", date: getTodayDateString(), detail: "벨라 간식 사료 구입", amount: 14500 }]));
  const [schedules, setSchedules] = useState(() => getLocalData('schedules', [{ id: "sch-1", cat: "벨라", date: getTodayDateString(), time: "14:00", title: "동물병원 검진 🏥" }]));
  const [albums, setAlbums] = useState(() => getLocalData('albums', {}));
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [bgImages, setBgImages] = useState(() => getLocalData('bgImages', { main: null, tab0: null, tab1: null, tab2: null, tab3: null, tab4: null, tab5: null }));
  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetId: null, fileEvent: null });
  const [formData, setFormData] = useState({ title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '✨', isCustomImg: false, color: 'blue', location: '우리집 🏠' });

  // 하드웨어 저장소 실시간 동기화
  useEffect(() => { localStorage.setItem('cats', JSON.stringify(cats)); }, [cats]);
  useEffect(() => { localStorage.setItem('profilePics', JSON.stringify(profilePics)); }, [profilePics]);
  useEffect(() => { localStorage.setItem('careItems', JSON.stringify(careItems)); }, [careItems]);
  useEffect(() => { localStorage.setItem('careRecords', JSON.stringify(careRecords)); }, [careRecords]);
  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('albums', JSON.stringify(albums)); }, [albums]);
  useEffect(() => { localStorage.setItem('trashBin', JSON.stringify(trashBin)); }, [trashBin]);
  useEffect(() => { localStorage.setItem('bgImages', JSON.stringify(bgImages)); }, [bgImages]);

  // ★ 모바일 위아래 흔들림 및 고무줄 튕김 원천 차단 방수벽 설정
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    const updateVh = () => setVh(window.innerHeight * 0.01);
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  // ★ 정밀 스크롤-슬라이딩 오작동 분리 센서 작동
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };
  const handleTouchEnd = (e) => {
    if (!touchStartX || !touchStartY) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    // Y축(위아래 스크롤) 이동이 작고, X축(좌우 밀기)이 확실할 때만 탭 전환 인정
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
      if (diffX > 0) setTabIdx((prev) => Math.min(prev + 1, 5));
      else setTabIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentCatData = cats.find(c => c.name === currentCat) || cats[0];
  const { monthTotal, yearTotal } = (() => {
    const targetYearStr = dashYear.toString(); const targetMonthStr = String(dashMonth).padStart(2, '0');
    let monthTotal = 0; let yearTotal = 0;
    expenses.forEach(exp => {
      if (exp.date && exp.date.startsWith(targetYearStr)) { yearTotal += exp.amount; if (exp.date.substring(5, 7) === targetMonthStr) monthTotal += exp.amount; }
    });
    return { monthTotal, yearTotal };
  })();

  const getAge = (dateStr) => {
    const birth = new Date(dateStr); const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    return months >= 12 ? `${Math.floor(months / 12)}살 ${months % 12}개월` : `${months}개월 차`;
  };

  const sendToTrashWithConfirm = (type, label, originalData, deleteAction) => {
    if (!window.confirm(`[삭제 확인] '${label}' 항목을 휴지통으로 보내시겠습니까?`)) return;
    setTrashBin([...trashBin, { id: Date.now().toString(), type, label, originalData, daysLeft: 30, deletedAt: getTodayDateString() }]);
    deleteAction();
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePics({ ...profilePics, [currentCat]: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleBgImageUpload = (e, targetKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBgImages({ ...bgImages, [targetKey]: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e, locationStr = "우리집 🏠") => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith('video/'); const reader = new FileReader();
      reader.onload = (ev) => {
        setAlbums({ ...albums, [currentCat]: [...(albums[currentCat] || []), { id: Date.now().toString(), src: ev.target.result, isVideo, date: getTodayDateString(), location: locationStr }] });
        setModalState({ isOpen: false, type: null, fileEvent: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecord = (amountStr) => {
    if (!amountStr || !activeTracker) return;
    const num = parseFloat(amountStr); if (isNaN(num)) return;
    const now = new Date(); const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const updated = { ...careRecords };
    if (!updated[currentCat]) updated[currentCat] = {};
    if (!updated[currentCat][activeTracker.id]) updated[currentCat][activeTracker.id] = {};
    if (!updated[currentCat][activeTracker.id][trackerDate]) updated[currentCat][activeTracker.id][trackerDate] = [];
    updated[currentCat][activeTracker.id][trackerDate].push({ amount: num, time: timeStr });
    setCareRecords(updated); setTrackerInputAmount('');
  };

  const getBgStyle = (key) => bgImages[key] ? { backgroundImage: `url(${bgImages[key]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255,255,255,0.78)' } : {};
  const renderBgEditButton = (key) => (
    <div className="absolute bottom-3 right-3 z-30 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow border text-[11px] font-bold">
      <label className="cursor-pointer">🎨 꾸미기<input type="file" accept="image/*" className="hidden" onChange={(e) => handleBgImageUpload(e, key)} /></label>
    </div>
  );

  // 4. 6대 서랍형 폴더 화면 복구 공정
  const renderTab0 = () => (
    <div className="flex flex-col h-full relative" style={getBgStyle('tab0')}>
      <div className="flex justify-between items-center p-3 bg-teal-500/10 backdrop-blur-md px-4 shrink-0">
        <div className="flex overflow-x-auto gap-2 flex-1 scrollbar-hide">
          {cats.map(c => (
            <button key={c.id} onClick={() => setCurrentCat(c.name)} className={`px-4 py-1.5 rounded-xl font-bold text-sm ${currentCat === c.name ? 'bg-white shadow text-gray-800' : 'bg-white/50 text-gray-400'}`}>{c.icon} {c.name}</button>
          ))}
        </div>
        <button onClick={() => setModalState({ isOpen: true, type: 'manageCats' })} className="ml-2 px-3 py-1.5 bg-gray-800 text-white rounded-xl text-xs font-bold">⚙️ 관리</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y">
        <div className="p-4 bg-white/90 rounded-2xl border flex items-center gap-4 shadow-xs">
          <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden border">
            {profilePics[currentCat] ? ( <img src={profilePics[currentCat]} alt="p" className="w-full h-full object-cover" /> ) : (
              <label className="flex items-center justify-center w-full h-full text-2xl cursor-pointer">{currentCatData.icon}<input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} /></label>
            )}
          </div>
          <div><h2 className="font-black text-lg text-gray-800">{currentCat} ({currentCatData.gender})</h2><p className="text-xs text-teal-600 font-bold mt-0.5">🎂 {currentCatData.birth} ({getAge(currentCatData.birth)})</p></div>
        </div>
        {(careItems[currentCat] || []).map((item, i) => {
          const total = (careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || []).reduce((sum, r) => sum + r.amount, 0);
          return (
            <div key={item.id} className="relative bg-white/90 border rounded-xl p-4 shadow-xs flex justify-between items-center">
              <button onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }} className="flex-1 text-left">
                <span className="font-bold text-gray-800 text-base">{item.icon} {item.title}</span>
                <p className="text-sm font-black text-teal-600 mt-1">오늘 누적: {total} {item.unit || '회'}</p>
              </button>
              <button onClick={() => sendToTrashWithConfirm('careItem', item.title, { cat: currentCat, data: item }, () => { const n = { ...careItems }; n[currentCat].splice(i, 1); setCareItems(n); })} className="text-gray-300 hover:text-red-500"><Icons.Delete /></button>
            </div>
          );
        })}
        <button onClick={() => { setModalState({ isOpen: true, type: 'careItem' }); setFormData({ title: '', unit: '', color: 'blue', icon: '✨' }); }} className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl shadow-xs">+ 새로운 케어 항목 추가</button>
      </div>
      {renderBgEditButton('tab0')}
    </div>
  );

  const renderTab1 = () => {
    const firstDay = new Date(dashYear, dashMonth - 1, 1).getDay(); const days = new Date(dashYear, dashMonth, 0).getDate();
    const calendarDays = Array.from({ length: firstDay }).map(() => null).concat(Array.from({ length: days }).map((_, i) => i + 1));
    return (
      <div className="flex flex-col h-full p-4 overflow-y-auto touch-pan-y" style={getBgStyle('tab1')}>
        <div className="bg-white/90 p-3 rounded-xl border flex justify-between items-center mb-3">
          <button onClick={() => setDashMonth(m => m === 1 ? 12 : m - 1)} className="font-bold">❮</button>
          <span className="font-black text-base">{dashYear}년 {dashMonth}월 만능 달력</span>
          <button onClick={() => setDashMonth(m => m === 12 ? 1 : m + 1)} className="font-bold">❯</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center bg-white/80 p-2 rounded-xl border">
          {['일','월','화','수','목','금','토'].map(w => <div key={w} className="text-xs font-bold text-gray-400 py-1">{w}</div>)}
          {calendarDays.map((d, i) => d ? (
            <button key={i} onClick={() => setDashboardDate(`${dashYear}-${String(dashMonth).padStart(2,'0')}-${String(d).padStart(2,'0')}`)} className={`h-10 rounded-lg text-xs font-bold ${dashboardDate.endsWith(`-${String(d).padStart(2,'0')}`) ? 'bg-teal-500 text-white' : 'bg-gray-50'}`}>{d}</button>
          ) : <div key={i}></div>)}
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center"><span className="text-xs font-black text-gray-700">📍 {dashboardDate} 일정</span><button onClick={() => setModalState({ isOpen: true, type: 'schedule' })} className="text-xs bg-gray-800 text-white px-2 py-1 rounded-lg">+ 추가</button></div>
          {schedules.filter(s => s.date === dashboardDate).map(s => (
            <div key={s.id} className="p-3 bg-white border rounded-xl flex justify-between items-center"><p className="text-sm font-bold">[{s.cat}] {s.title}</p><button onClick={() => setSchedules(schedules.filter(i => i.id !== s.id))} className="text-gray-300 hover:text-red-500"><Icons.Delete /></button></div>
          ))}
        </div>
        {renderBgEditButton('tab1')}
      </div>
    );
  };

  const renderTab2 = () => (
    <div className="flex flex-col h-full p-4 overflow-y-auto touch-pan-y" style={getBgStyle('tab2')}>
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm mb-3">
        <span className="text-xs font-bold text-teal-400">📊 원장 통계 관리</span>
        <h3 className="text-lg font-black mt-1">{dashMonth}월 지출: {monthTotal.toLocaleString()}원</h3>
      </div>
      <div className="flex-1 space-y-2">
        {expenses.map(e => (
          <div key={e.id} className="p-3 bg-white border rounded-xl flex justify-between items-center"><div><p className="font-bold text-sm">{e.detail}</p><p className="text-xs text-gray-400">{e.date}</p></div><div className="flex items-center gap-3"><span className="font-mono font-bold text-red-500">{e.amount.toLocaleString()}원</span><button onClick={() => setExpenses(expenses.filter(i => i.id !== e.id))} className="text-gray-300"><Icons.Delete /></button></div></div>
        ))}
        <button onClick={() => setModalState({ isOpen: true, type: 'expense' })} className="w-full py-3 bg-teal-500 text-white font-black rounded-xl">+ 새로운 지출 영수증 추가</button>
      </div>
      {renderBgEditButton('tab2')}
    </div>
  );

  const renderTab3 = () => (
    <div className="flex flex-col h-full p-4 relative overflow-y-auto touch-pan-y" style={getBgStyle('tab3')}>
      <div className="grid grid-cols-3 gap-2">
        {(albums[currentCat] || []).map(m => (
          <div key={m.id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border">{m.isVideo ? <video src={m.src} className="w-full h-full object-cover" /> : <img src={m.src} alt="img" className="w-full h-full object-cover" />}</div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2">
        <label className="flex-1 py-3 bg-teal-500 text-white font-black rounded-xl text-center shadow-md cursor-pointer text-sm flex justify-center items-center gap-2"><Icons.Camera /> 직접 촬영 / 선택<input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, "사진첩 📂")} className="hidden" /></label>
      </div>
      {renderBgEditButton('tab3')}
    </div>
  );

  const renderTab4 = () => (
    <div className="p-4 overflow-y-auto h-full touch-pan-y" style={getBgStyle('tab4')}>
      <h3 className="font-black text-lg mb-3">🗑 임시 휴지통 원장</h3>
      {trashBin.map(t => (
        <div key={t.id} className="p-3 bg-white border rounded-xl flex justify-between items-center mb-2"><p className="text-sm font-bold">{t.label}</p><button onClick={() => restoreFromTrash(t.id)} className="text-xs bg-teal-50 text-teal-600 px-3 py-1 rounded-lg font-bold">복구</button></div>
      ))}
      {renderBgEditButton('tab4')}
    </div>
  );

  const renderTab5 = () => (
    <div className="p-5 overflow-y-auto h-full text-xs font-mono text-slate-400 bg-slate-900" style={getBgStyle('tab5')}>
      <h2 className="text-teal-400 font-bold text-sm border-b border-slate-800 pb-2 mb-2">⚙️ SYSTEM MANUAL v2.5</h2>
      <p>• 완공 공정: 모바일 터치 흔들림 락(Lock) 및 강제 고정 보가 공사</p>
      <p>• 렌즈 개방: capture 우회 공정 완료 (필터 카메라 앱 연결 허용)</p>
      <p>• 집사 원장: 벨라 & 로이 전용 맞춤 대시보드 서버 작동 중</p>
    </div>
  );

  // 5. 트래커 입력 화면 모듈
  const renderTrackerScreen = () => {
    if (!activeTracker) return null;
    const records = careRecords[currentCat]?.[activeTracker.id]?.[trackerDate] || [];
    const total = records.reduce((sum, r) => sum + r.amount, 0);
    return (
      <div className="absolute inset-0 bg-gray-50 z-50 flex flex-col">
        <div className="p-4 bg-white border-b flex justify-between items-center font-bold"><button onClick={() => setActiveTracker(null)}>❮ 닫기</button><span>{activeTracker.title} 오늘 기록</span><div className="w-10"></div></div>
        <div className="flex-1 p-5 overflow-y-auto touch-pan-y">
          <h1 className="text-center text-4xl font-black text-teal-500 my-6">{total} <span className="text-xl">{activeTracker.unit || '회'}</span></h1>
          <div className="flex gap-2 mb-4"><input type="number" placeholder="숫자 입력" value={trackerInputAmount} onChange={e => setTrackerInputAmount(e.target.value)} className="flex-1 border p-3 rounded-xl text-base" /><button onClick={() => handleAddRecord(trackerInputAmount)} className="bg-teal-500 text-white font-bold px-6 rounded-xl text-base">등록</button></div>
          {records.map((r, idx) => <div key={idx} className="p-3 bg-white border rounded-xl mb-2 flex justify-between font-bold text-sm"><span>{r.amount} {activeTracker.unit || '회'}</span><span className="text-gray-400">{r.time}</span></div>)}
        </div>
      </div>
    );
  };

  // 6. 만능 항목 추가 팝업 모달창
  const renderModal = () => {
    if (!modalState.isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden p-5 space-y-3">
          <div className="flex justify-between items-center border-b pb-2"><h3 className="font-black text-sm text-gray-800">항목 데이터 추가</h3><button onClick={() => setModalState({ isOpen: false })}><Icons.Close /></button></div>
          <input type="text" placeholder="항목 명칭 입력" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />
          {modalState.type === 'careItem' && <input type="text" placeholder="단위 (예: ml, kg, 알)" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />}
          {modalState.type === 'expense' && <input type="number" placeholder="금액 숫자만" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />}
          <button onClick={() => {
            if (!formData.title) return;
            if (modalState.type === 'careItem') setCareItems({ ...careItems, [currentCat]: [...(careItems[currentCat] || []), { id: Date.now().toString(), title: formData.title, unit: formData.unit, color: 'blue', icon: '✨' }] });
            if (modalState.type === 'expense' && formData.amount) setExpenses([...expenses, { id: Date.now().toString(), date: getTodayDateString(), detail: formData.title, amount: parseInt(formData.amount) }]);
            if (modalState.type === 'schedule') setSchedules([...schedules, { id: Date.now().toString(), cat: currentCat, date: dashboardDate, time: "12:00", title: formData.title }]);
            setModalState({ isOpen: false }); setFormData({ title: '', amount: '', unit: '' });
          }} className="w-full py-2.5 bg-teal-500 text-white rounded-lg font-bold text-base">원장 등록 확정</button>
        </div>
      </div>
    );
  };

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4(), renderTab5()];
  const tabMenus = [
    { label: "오늘케어", icon: <Icons.CheckSquare /> }, { label: "종합달력", icon: <Icons.Calendar /> },
    { label: "지출관리", icon: <Icons.Card /> }, { label: "냥이앨범", icon: <Icons.PhotoLibrary /> },
    { label: "휴지통", icon: <Icons.Trash /> }, { label: "제작과정", icon: <Icons.Code /> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-0 select-none overflow-hidden touch-none antialiased">
      <div 
        className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative sm:border-8 border-gray-900 sm:rounded-[40px] shadow-2xl h-full" 
        style={{ height: `calc(${vh}px * 100)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 overflow-hidden relative bg-white">
          {tabs[tabIdx]}
        </div>

        {/* 🌟 고정 폴더형 하단 프리미엄 내비게이션 바 */}
        <div className="h-20 bg-white border-t border-gray-100 flex justify-around items-center px-1 shrink-0 z-40 pb-safe shadow-[0_-6px_20px_rgba(0,0,0,0.03)]">
          {tabMenus.map((menu, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all ${tabIdx === idx ? 'text-teal-500 bg-teal-50/50 font-black scale-105' : 'text-gray-400 font-medium'}`}>
              <div className="mb-0.5">{menu.icon}</div>
              <span className="text-[9px] tracking-tight">{menu.label}</span>
            </button>
          ))}
        </div>
      </div>
      {renderModal()} {renderTrackerScreen()}
    </div>
  );
}
