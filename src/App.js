import React, { useState, useEffect } from 'react';

// 1. 순정 마스터 아이콘 에셋 세트
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

const getLocalData = (key, fallback) => {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocalData = (key, data) => {
  try { window.localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
};

export default function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight * 0.01 : 8);
  const [tabIdx, setTabIdx] = useState(0);

  // 정밀 슬라이딩 터치 센서
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  // 데이터 로드
  const [cats, setCats] = useState(() => getLocalData('cats', [
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑", gender: "여아" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼", gender: "남아" }
  ]));
  const [currentCat, setCurrentCat] = useState("벨라");
  const [profilePics, setProfilePics] = useState(() => getLocalData('profilePics', {}));
  const [dashboardDate, setDashboardDate] = useState(getTodayDateString());
  const [dashYear, setDashYear] = useState(new Date().getFullYear());
  const [dashMonth, setDashMonth] = useState(new Date().getMonth() + 1);
  const [trashBin, setTrashBin] = useState(() => getLocalData('trashBin', []));

  const [careItems, setCareItems] = useState(() => getLocalData('careItems', {
    "벨라": [
      { id: "water", title: "음수량 측정", icon: "💧", unit: "ml", color: "blue" },
      { id: "brush", title: "렉돌 코트 빗질", icon: "🪮", unit: "회", color: "purple" },
      { id: "pill", title: "영양제 챙기기", icon: "💊", unit: "알", color: "red" }
    ],
    "로이": [
      { id: "water", title: "음수량 측정", icon: "💧", unit: "ml", color: "blue" },
      { id: "walk", title: "캣쇼 워킹 연습", icon: "🧸", unit: "분", color: "orange" },
      { id: "weight", title: "몸무게 체크", icon: "⚖️", unit: "kg", color: "green" }
    ]
  }));

  const [careRecords, setCareRecords] = useState(() => getLocalData('careRecords', {}));
  const [expenses, setExpenses] = useState(() => getLocalData('expenses', [{ id: "exp-1", date: getTodayDateString(), detail: "벨라 간식 사료 구입", amount: 14500 }]));
  const [schedules, setSchedules] = useState(() => getLocalData('schedules', [{ id: "sch-1", cat: "벨라", date: getTodayDateString(), time: "14:00", title: "동물병원 검진 🏥" }]));
  const [albums, setAlbums] = useState(() => getLocalData('albums', {}));
  const [bgImages, setBgImages] = useState(() => getLocalData('bgImages', { main: null, tab0: null, tab1: null, tab2: null, tab3: null, tab4: null, tab5: null }));
  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetId: null });
  const [formData, setFormData] = useState({ title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '✨', color: 'blue', location: '우리집 🏠', catIcon: '🐾', catName: '', catBirth: '', catGender: '여아' });

  // 데이터 안전 저장
  useEffect(() => { setLocalData('cats', cats); }, [cats]);
  useEffect(() => { setLocalData('profilePics', profilePics); }, [profilePics]);
  useEffect(() => { setLocalData('careItems', careItems); }, [careItems]);
  useEffect(() => { setLocalData('careRecords', careRecords); }, [careRecords]);
  useEffect(() => { setLocalData('expenses', expenses); }, [expenses]);
  useEffect(() => { setLocalData('schedules', schedules); }, [schedules]);
  useEffect(() => { setLocalData('albums', albums); }, [albums]);
  useEffect(() => { setLocalData('trashBin', trashBin); }, [trashBin]);
  useEffect(() => { setLocalData('bgImages', bgImages); }, [bgImages]);

  // 모바일 화면 떨림 방지
  useEffect(() => {
    try {
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
    } catch(e) {}
    const updateVh = () => { if(typeof window !== 'undefined') setVh(window.innerHeight * 0.01); };
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 안전한 스와이프 로직
  const handleTouchStart = (e) => {
    if(!e.targetTouches || !e.targetTouches[0]) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };
  const handleTouchEnd = (e) => {
    if (!touchStartX || !touchStartY || !e.changedTouches || !e.changedTouches[0]) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 75) {
      if (diffX > 0) setTabIdx((prev) => Math.min(prev + 1, 5));
      else setTabIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentCatData = cats.find(c => c.name === currentCat) || cats[0];
  const { monthTotal, yearTotal } = (() => {
    const targetYearStr = dashYear.toString(); const targetMonthStr = String(dashMonth).padStart(2, '0');
    let m = 0; let y = 0;
    expenses.forEach(exp => {
      if (exp.date && exp.date.startsWith(targetYearStr)) { y += exp.amount; if (exp.date.substring(5, 7) === targetMonthStr) m += exp.amount; }
    });
    return { monthTotal: m, yearTotal: y };
  })();

  const getAge = (dateStr) => {
    const birth = new Date(dateStr); const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    return months >= 12 ? `${Math.floor(months / 12)}살 ${months % 12}개월` : `${months}개월 차`;
  };

  const getDdayInfo = (dateStr) => {
    const now = new Date(); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birth = new Date(dateStr); let nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth < today) nextBirth.setFullYear(today.getFullYear() + 1);
    return `D+${Math.floor((today.getTime() - birth.getTime()) / (1000*60*60*24))}일 / 생일 D-${Math.ceil((nextBirth.getTime() - today.getTime()) / (1000*60*60*24))}`;
  };

  const compressImage = (base64Str, maxWidth = 500, quality = 0.5) => {
    return new Promise((resolve) => {
      const img = new Image(); img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width; let h = img.height;
        if (w > maxWidth) { h = Math.round((h * maxWidth) / w); w = maxWidth; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const sendToTrashWithConfirm = (type, label, originalData, deleteAction) => {
    if (!window.confirm(`[삭제 확인] '${label}' 항목을 휴지통으로 보내시겠습니까?`)) return;
    setTrashBin([...trashBin, { id: Date.now().toString(), type, label, originalData, daysLeft: 30, deletedAt: getTodayDateString() }]);
    deleteAction();
  };

  const restoreFromTrash = (id) => {
    const item = trashBin.find(t => t.id === id); if (!item) return;
    if (item.type === 'schedule') setSchedules([...schedules, item.originalData]);
    else if (item.type === 'expense') setExpenses([...expenses, item.originalData]);
    else if (item.type === 'careItem') setCareItems({ ...careItems, [item.originalData.cat]: [...(careItems[item.originalData.cat] || []), item.originalData.data] });
    setTrashBin(trashBin.filter(t => t.id !== id));
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => { const c = await compressImage(ev.target.result, 200, 0.5); setProfilePics({ ...profilePics, [currentCat]: c }); };
      reader.readAsDataURL(file);
    }
  };

  const handleBgImageUpload = (e, targetKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => { const c = await compressImage(ev.target.result, 600, 0.4); setBgImages({ ...bgImages, [targetKey]: c }); };
      reader.readAsDataURL(file);
    }
  };

  const handleBgLongPress = (targetKey) => setBgImages({ ...bgImages, [targetKey]: null });

  const handleMediaUpload = (e, locationStr = "우리집 🏠") => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith('video/'); const reader = new FileReader();
      reader.onload = async (ev) => {
        let src = ev.target.result; if (!isVideo) src = await compressImage(src, 500, 0.5);
        setAlbums({ ...albums, [currentCat]: [...(albums[currentCat] || []), { id: Date.now().toString(), src, isVideo, date: getTodayDateString(), location: locationStr }] });
        setModalState({ isOpen: false, type: null });
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

  const getBgStyle = (key) => bgImages[key] ? { backgroundImage: `url(${bgImages[key]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255,255,255,0.76)' } : {};

  const renderBgEditButton = (key) => (
    <div className="absolute bottom-3 right-3 z-30 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow border text-[11px] font-bold">
      <label className="cursor-pointer">🎨 꾸미기<input type="file" accept="image/*" className="hidden" onChange={(e) => handleBgImageUpload(e, key)} /></label>
    </div>
  );

  // 6대 폴더 내용 구성
  const tab0_view = (
    <div className="flex flex-col h-full relative" style={getBgStyle('tab0')}>
      <div className="flex justify-between items-center p-3 bg-teal-500/10 backdrop-blur-md px-4 shrink-0">
        <div className="flex overflow-x-auto gap-2 flex-1 scrollbar-hide">
          {cats.map(c => (
            <button key={c.id} onClick={() => setCurrentCat(c.name)} className={`px-4 py-1.5 rounded-xl border font-bold text-sm transition-all ${currentCat === c.name ? 'bg-white border-teal-400 text-gray-800' : 'bg-white/60 border-transparent text-gray-400'}`}>{c.icon} {c.name}</button>
          ))}
        </div>
        <button onClick={() => setModalState({ isOpen: true, type: 'manageCats' })} className="ml-2 px-3 py-1.5 bg-gray-800 text-white rounded-xl text-xs font-bold shrink-0">⚙️ 관리</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y pb-24">
        <div className="p-4 bg-white/90 rounded-2xl border flex items-center gap-4 shadow-sm">
          <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden border shrink-0">
            {profilePics[currentCat] ? ( <img src={profilePics[currentCat]} alt="p" className="w-full h-full object-cover" /> ) : (
              <label className="flex items-center justify-center w-full h-full text-2xl cursor-pointer">{currentCatData.icon}<input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} /></label>
            )}
          </div>
          <div><h2 className="font-black text-base text-gray-800">{currentCat} <span className="text-[11px] font-bold px-1.5 bg-teal-50 border text-teal-600 rounded-md">{currentCatData.gender}</span></h2><p className="text-xs text-teal-600 font-bold mt-0.5">🎂 {currentCatData.birth}</p><p className="text-[10px] text-gray-400 font-medium">({getAge(currentCatData.birth)}, {getDdayInfo(currentCatData.birth)})</p></div>
        </div>
        {(careItems[currentCat] || []).map((item, i) => {
          const total = (careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || []).reduce((sum, r) => sum + r.amount, 0);
          return (
            <div key={item.id} className="relative bg-white/90 border rounded-xl p-4 shadow-xs flex justify-between items-center border-l-4 border-l-teal-400">
              <button onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }} className="flex-1 text-left">
                <span className="font-bold text-gray-800 text-base">{item.icon} {item.title}</span>
                <p className="text-sm font-black text-teal-600 mt-0.5">오늘 누적: {total} {item.unit || '회'}</p>
              </button>
              <button onClick={() => sendToTrashWithConfirm('careItem', item.title, { cat: currentCat, data: item }, () => { const n = { ...careItems }; n[currentCat].splice(i, 1); setCareItems(n); })} className="text-gray-300 hover:text-red-500 pr-1 shrink-0"><Icons.Delete /></button>
            </div>
          );
        })}
        <button onClick={() => { setModalState({ isOpen: true, type: 'careItem' }); setFormData({ title: '', unit: '', color: 'blue', icon: '✨' }); }} className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl shadow-sm text-sm">+ 새로운 케어 항목 추가</button>
      </div>
      {renderBgEditButton('tab0')}
    </div>
  );

  const tab1_view = (
    <div className="flex flex-col h-full p-4 overflow-y-auto touch-pan-y pb-24" style={getBgStyle('tab1')}>
      <div className="bg-white/90 p-3 rounded-xl border flex justify-between items-center mb-3 shadow-xs border-t-4 border-t-teal-500">
        <button onClick={() => setDashMonth(m => m === 1 ? 12 : m - 1)} className="font-bold p-1 text-teal-500">❮</button>
        <span className="font-black text-base text-gray-800">{dashYear}년 {dashMonth}월 종합 달력</span>
        <button onClick={() => setDashMonth(m => m === 12 ? 1 : m + 1)} className="font-bold p-1 text-teal-500">❯</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center bg-white/90 p-2 rounded-xl border shadow-xs">
        {['일','월','화','수','목','금','토'].map((w,i) => <div key={w} className={`text-xs font-bold py-1 ${i===0?'text-red-500':'text-gray-400'}`}>{w}</div>)}
        {Array.from({ length: new Date(dashYear, dashMonth - 1, 1).getDay() }).map((_, i) => <div key={`e-${i}`}></div>)}
        {Array.from({ length: new Date(dashYear, dashMonth, 0).getDate() }).map((_, i) => {
          const d = i + 1; const dateStr = `${dashYear}-${String(dashMonth).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
          return <button key={d} onClick={() => setDashboardDate(dateStr)} className={`h-10 rounded-lg text-xs font-black transition-colors ${dashboardDate === dateStr ? 'bg-teal-500 text-white shadow-sm' : 'bg-gray-50 text-gray-700'}`}>{d}</button>
        })}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center border-l-4 border-l-amber-400 pl-2 bg-white/40 py-1 rounded"><span className="text-xs font-black text-gray-700">📍 {dashboardDate} 스케줄</span><button onClick={() => setModalState({ isOpen: true, type: 'schedule' })} className="text-xs bg-gray-800 text-white px-3 py-1 rounded-lg font-bold">+ 등록</button></div>
        {schedules.filter(s => s.date === dashboardDate).map(s => (
          <div key={s.id} className="p-3 bg-white border rounded-xl flex justify-between items-center shadow-xs"><p className="text-sm font-bold text-gray-800">[{s.cat}] {s.title}</p><button onClick={() => sendToTrashWithConfirm('schedule', s.title, s, () => setSchedules(schedules.filter(i => i.id !== s.id)))} className="text-gray-300"><Icons.Delete /></button></div>
        ))}
      </div>
      {renderBgEditButton('tab1')}
    </div>
  );

  const tab2_view = (
    <div className="flex flex-col h-full p-4 overflow-y-auto touch-pan-y pb-24" style={getBgStyle('tab2')}>
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md mb-3 border border-slate-800">
        <span className="text-xs font-black bg-teal-400 text-slate-900 px-2 py-0.5 rounded">지출 결산 통계 보드</span>
        <h3 className="text-lg font-black mt-2 text-teal-300">{dashMonth}월 합계: {monthTotal.toLocaleString()}원</h3>
      </div>
      <div className="space-y-2 flex-1">
        {expenses.map(e => (
          <div key={e.id} className="p-3 bg-white border rounded-xl flex justify-between items-center shadow-xs"><div><p className="font-bold text-sm text-gray-800">{e.detail}</p><p className="text-[10px] text-gray-400 font-mono">{e.date}</p></div><div className="flex items-center gap-3"><span className="font-mono font-bold text-rose-500 text-sm">{e.amount.toLocaleString()}원</span><button onClick={() => sendToTrashWithConfirm('expense', e.detail, e, () => setExpenses(expenses.filter(i => i.id !== e.id)))} className="text-gray-300"><Icons.Delete /></button></div></div>
        ))}
        <button onClick={() => setModalState({ isOpen: true, type: 'expense' })} className="w-full py-3 bg-teal-500 text-white font-black rounded-xl shadow-sm text-sm">+ 새로운 지출 내역 가계부 추가</button>
      </div>
      {renderBgEditButton('tab2')}
    </div>
  );

  const tab3_view = (
    <div className="flex flex-col h-full relative" style={getBgStyle('tab3')}>
      <div className="flex-1 overflow-y-auto p-4 pb-32 touch-pan-y">
        <p className="font-black text-sm text-teal-700 border-l-4 border-teal-500 pl-2 bg-teal-50/50 py-1 rounded mb-3">📸 {currentCat} 아카이브 미디어 룸</p>
        <div className="grid grid-cols-3 gap-2">
          {(albums[currentCat] || []).map(m => (
            <div key={m.id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border shadow-xs relative">{m.isVideo ? <video src={m.src} className="w-full h-full object-cover" /> : <img src={m.src} alt="img" className="w-full h-full object-cover" />}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-24 left-4 right-4 z-20 shrink-0">
        <label className="w-full py-3.5 bg-teal-500 text-white font-black rounded-xl text-center shadow-md cursor-pointer text-sm flex justify-center items-center gap-2 transition-all active:scale-95"><Icons.Camera /> 직접 촬영 및 앨범 업로드<input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, "사진첩 📂")} className="hidden" /></label>
      </div>
      {renderBgEditButton('tab3')}
    </div>
  );

  const tab4_view = (
    <div className="p-4 overflow-y-auto h-full touch-pan-y pb-24" style={getBgStyle('tab4')}>
      <h3 className="font-black text-base text-gray-800 border-b pb-2 mb-3">🗑 임시 보관소 휴지통 (30일 유효)</h3>
      {trashBin.map(t => (
        <div key={t.id} className="p-3 bg-white border rounded-xl flex justify-between items-center mb-2 shadow-xs"><p className="text-sm font-bold text-gray-700">{t.label}</p><button onClick={() => restoreFromTrash(t.id)} className="text-xs bg-teal-50 border text-teal-600 px-3 py-1.5 rounded-lg font-black shadow-xs">원장 복구</button></div>
      ))}
      {renderBgEditButton('tab4')}
    </div>
  );

  const tab5_view = (
    <div className="p-5 overflow-y-auto h-full text-xs font-mono text-slate-300 bg-slate-900 leading-relaxed select-text pb-24" style={getBgStyle('tab5')}>
      <div className="border-b border-slate-800 pb-3 mb-3">
        <span className="text-[9px] font-black bg-teal-500 text-teal-950 px-2 py-0.5 rounded">SYSTEM CONFIG MANUAL</span>
        <h2 className="text-base font-black text-white mt-1">📝 올인원 대시보드 시스템 구축 원장</h2>
        <p className="text-teal-400 font-bold mt-0.5">제작자: 벨라&로이 아빠</p>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800 text-slate-400 italic">
          "사랑하는 반려묘 벨라와 신입 렉돌 로이를 체계적으로 간호하고 캣쇼 출진 준비(워킹, 체중 관리)를 완벽하게 보살피기 위해 수많은 밤을 공들여 커스텀 완공한 평생 소장용 특수 프로그램입니다."
        </div>
        <div className="space-y-1.5 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <h3 className="font-bold text-teal-300 text-xs">🛠️ 1부: 내 클라우드 서버 무상 구축법</h3>
          <p className="text-white font-bold">1. GitHub 저장소 연동</p>
          <p className="pl-2 text-slate-400">오픈소스 저장소 가입 후 설계도 원본 주소로 이동합니다.</p>
          <p className="pl-2 font-mono text-[10px] text-teal-200">https://github.com/ysm0427/nyangi-app</p>
          <p className="pl-2 text-slate-400">우측 상단 [Fork] -> [Create fork]를 인가하여 본인 계정으로 영구 복사합니다.</p>
          <p className="text-white font-bold mt-1">2. Vercel 배포 공정 및 빌드 패치</p>
          <p className="pl-2 text-slate-400">버셀 로그인 후 Fork한 nyangi-app 레포지토리를 [Import] 합니다.</p>
          <p className="pl-2 text-rose-300 font-bold">※ 필수 패치: 배포 전 [Environment Variables] 탭을 열어 아래 항목을 등록해야 컴파일 오작동이 방지됩니다.</p>
          <p className="pl-4 font-mono text-[11px] text-white font-bold">• NAME: CI  /  VALUE: false</p>
          <p className="pl-2 text-slate-400">설정 완료 후 하단 [Deploy]를 승인하면 나만의 평생 무료 앱 링크 주소가 개방됩니다.</p>
        </div>
        <div className="space-y-1.5 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <h3 className="font-bold text-teal-300 text-xs">📱 2부: 주요 6대 스마트 폴더 기능 핵심 원장</h3>
          <p className="text-white font-bold mt-1">1. [오늘 케어] 탭 (다중 렌즈 간섭 낙하 솔루션)</p>
          <p className="pl-2 text-slate-400">• 고양이 상단 ⚙️ 설정을 통해 벨라, 로이 외에 그룹 개체를 무한 추가 관리할 수 있습니다.</p>
          <p className="pl-2 text-slate-400">• 최신 아이폰 M자 탈모 노치 및 카메라 홀 간섭 버그를 파쇄하기 위해 Safe-Area 헤더 상단 마진 자동 낙하(pt-12) 공법을 도입했습니다.</p>
          <p className="text-white font-bold mt-1">2. [종합 달력] 및 [지출 관리] 가계부 연동</p>
          <p className="pl-2 text-slate-400">• 케어 입력이 완료된 날짜는 종합 달력 하단에 고유 인덱스 컬러 도트가 정밀 매핑됩니다.</p>
          <p className="pl-2 text-slate-400">• 사료비, 모래비, 병원비를 지출에 기입하면 월간 통계와 연간 누적 총액 원장을 소수점 실시간 정산 처리합니다.</p>
          <p className="text-white font-bold mt-1">3. [냥이 앨범] 하드웨어 렌즈 보안 제어 잔혹사</p>
          <p className="pl-2 text-rose-300 font-bold">• iOS(아이폰 사파리) 모바일 한계 경고:</p>
          <p className="pl-4 text-slate-400">애플의 강력한 독립 샌드박스 보안 규격으로 인해 웹 주소 안에서 스노우, 소다 등 외부 필터 앱을 다이렉트로 강제 강점 호출하는 것은 불가능합니다. 스노우 앱으로 필터 촬영 후 사진첩 업로드를 추천합니다.</p>
          <p className="pl-2 text-teal-300 font-bold">• Android(갤럭시) 기기 환경 가이드:</p>
          <p className="pl-4 text-slate-400">안드로이드 환경에서는 촬영 터치 시 OS 연동 팝업이 개방되어 내장 렌즈 외에도 스노우 등 지정한 특정 필터 앱으로 직접 찍어 넘기기가 가능합니다.</p>
          <p className="text-white font-bold mt-1">4. 독립 실행형 풀화면 락 패치</p>
          <p className="pl-2 text-slate-400">• 모바일 '홈 화면에 추가' 구동 시 화면이 출렁거리거나 들리는 유동 버그를 잡기 위해 과도한 바운스를 물리적으로 차단하는 fixed 락(Lock) 설계 공법을 이식했습니다.</p>
        </div>
      </div>
    </div>
  );

  const renderTrackerScreen = () => {
    if (!activeTracker) return null;
    const records = careRecords[currentCat]?.[activeTracker.id]?.[trackerDate] || [];
    const total = records.reduce((sum, r) => sum + r.amount, 0);
    return (
      <div className="absolute inset-0 bg-gray-50 z-50 flex flex-col overflow-hidden">
        <div className="p-4 bg-white border-b flex justify-between items-center font-bold shrink-0"><button onClick={() => setActiveTracker(null)}>❮ 뒤로가기</button><span>{activeTracker.title} 기록기</span><div className="w-12"></div></div>
        <div className="flex-1 p-5 overflow-y-auto touch-pan-y">
          <h1 className="text-center text-4xl font-black text-teal-500 my-6">{total} <span className="text-xl">{activeTracker.unit || '회'}</span></h1>
          <div className="flex gap-2 mb-4"><input type="number" placeholder="수치 기록" value={trackerInputAmount} onChange={e => setTrackerInputAmount(e.target.value)} className="flex-1 border p-3 rounded-xl text-base" /><button onClick={() => handleAddRecord(trackerInputAmount)} className="bg-teal-500 text-white font-bold px-6 rounded-xl text-base">등록</button></div>
          {records.map((r, idx) => <div key={idx} className="p-3 bg-white border rounded-xl mb-2 flex justify-between font-bold text-sm"><span>{r.amount} {activeTracker.unit || '회'}</span><span className="text-gray-400">{r.time}</span></div>)}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!modalState.isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-xs p-5 space-y-3 animate-in zoom-in-95">
          <div className="flex justify-between items-center border-b pb-2"><h3 className="font-black text-sm text-gray-800">새 항목 추가 / 관리</h3><button onClick={() => setModalState({ isOpen: false })}><Icons.Close /></button></div>
          
          {modalState.type === 'manageCats' ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {cats.map((cat, idx) => (
                <div key={cat.id} className="flex flex-col gap-1.5 bg-gray-50 p-2.5 rounded-lg border">
                  <div className="flex gap-1 items-center">
                    <input type="text" value={cat.icon} onChange={e => { const n=[...cats]; n[idx].icon=e.target.value; setCats(n); }} className="w-8 text-center border rounded p-1" />
                    <input type="text" value={cat.name} onChange={e => { const n=[...cats]; n[idx].name=e.target.value; setCats(n); }} className="w-16 font-bold border rounded p-1" />
                    <input type="date" value={cat.birth} onChange={e => { const n=[...cats]; n[idx].birth=e.target.value; setCats(n); }} className="flex-1 border rounded p-1 text-xs" />
                    <button onClick={() => { if(cats.length>1) setCats(cats.filter(c => c.id !== cat.id)); }} className="text-red-400"><Icons.Delete /></button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <p className="text-xs font-bold mb-1 text-teal-600">새 그룹원 추가</p>
                <div className="flex gap-1 mb-1"><input type="text" placeholder="이모티콘" value={formData.catIcon} onChange={e => setFormData({...formData, catIcon: e.target.value})} className="w-12 border rounded p-1 text-center" /><input type="text" placeholder="이름" value={formData.catName} onChange={e => setFormData({...formData, catName: e.target.value})} className="flex-1 border rounded p-1" /></div>
                <input type="date" value={formData.catBirth} onChange={e => setFormData({...formData, catBirth: e.target.value})} className="w-full border rounded p-1 text-sm mb-1" />
                <button onClick={() => { if(formData.catName) { setCats([...cats, { id: Date.now().toString(), name: formData.catName, birth: formData.catBirth, icon: formData.catIcon || "🐾", gender: '여아' }]); setFormData({...formData, catName: ''}); } }} className="w-full bg-teal-500 text-white py-2 rounded-lg text-xs font-bold">추가 완료</button>
              </div>
            </div>
          ) : (
            <>
              <input type="text" placeholder="항목 이름 입력" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />
              {modalState.type === 'careItem' && <input type="text" placeholder="측정 단위 (ml, kg, 알 등)" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />}
              {modalState.type === 'expense' && <input type="number" placeholder="금액 기입 (숫자만)" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full border p-2.5 rounded-lg text-base" />}
              <button onClick={() => {
                if (!formData.title) return;
                if (modalState.type === 'careItem') setCareItems({ ...careItems, [currentCat]: [...(careItems[currentCat] || []), { id: Date.now().toString(), title: formData.title, unit: formData.unit, color: 'blue', icon: '✨' }] });
                if (modalState.type === 'expense' && formData.amount) setExpenses([...expenses, { id: Date.now().toString(), date: getTodayDateString(), detail: formData.title, amount: parseInt(formData.amount) }]);
                if (modalState.type === 'schedule') setSchedules([...schedules, { id: Date.now().toString(), cat: currentCat, date: dashboardDate, time: "12:00", title: formData.title }]);
                setModalState({ isOpen: false }); setFormData({ title: '', amount: '', unit: '' });
              }} className="w-full py-2.5 bg-teal-500 text-white rounded-lg font-bold text-base">원장 등록 확정</button>
            </>
          )}
        </div>
      </div>
    );
  };

  const tabViews = [tab0_view, tab1_view, tab2_view, tab3_view, tab4_view, tab5_view];
  const tabMenus = [
    { label: "오늘케어", icon: <Icons.CheckSquare /> }, { label: "종합달력", icon: <Icons.Calendar /> },
    { label: "지출관리", icon: <Icons.Card /> }, { label: "냥이앨범", icon: <Icons.PhotoLibrary /> },
    { label: "휴지통", icon: <Icons.Trash /> }, { label: "제작과정", icon: <Icons.Code /> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-0 select-none overflow-hidden antialiased">
      {/* 🏡 전체 페이지 꾸미기 바탕화면 매핑 전용 메인 박스 틀 */}
      <div 
        className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative sm:border-8 border-gray-900 sm:rounded-[40px] shadow-2xl h-full" 
        style={{ height: `calc(${vh}px * 100)`, ...getBgStyle('main') }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 상단 노치 회피용 안전 마진 뷰포트 (상단 여백 고정) */}
        <div className="w-full pt-12 shrink-0"></div>

        {/* 🌟 하드웨어 가속 방식의 매끄러운 6대 폴더 가로 슬라이딩 무빙 뷰 포트 */}
        <div className="flex-1 overflow-hidden relative">
          <div 
            className="flex h-full transition-transform duration-300 ease-out" 
            style={{ 
              transform: `translateX(-${tabIdx * (100 / 6)}%)`, 
              width: '600%' 
            }}
          >
            {tabViews.map((view, idx) => (
              <div key={idx} style={{ width: `${100 / 6}%` }} className="h-full shrink-0 overflow-hidden relative">
                {view}
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 고정 폴더형 하단 프리미엄 내비게이션 바 메뉴 배선 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex flex-col shrink-0 z-40 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="h-16 flex justify-around items-center px-1 pt-1">
            {tabMenus.map((menu, idx) => (
              <button key={idx} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all ${tabIdx === idx ? 'text-teal-500 bg-teal-50/60 font-black scale-105' : 'text-gray-400 font-medium'}`}>
                <div className="mb-0.5">{menu.icon}</div>
                <span className="text-[9px] tracking-tight">{menu.label}</span>
              </button>
            ))}
          </div>
          {/* 🏡 잃어버렸던 전체 바탕 테마 인스톨 / 리셋 포트 */}
          <div className="py-1 text-center bg-gray-50 border-t border-gray-100 flex justify-center items-center gap-2">
            <label className="text-[9px] text-gray-500 font-black cursor-pointer hover:underline">
              🏡 전체 바탕 테마 변경
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleBgImageUpload(e, 'main')} />
            </label>
            {bgImages.main && <button onClick={() => { if(window.confirm("전체 바탕 테마 사진을 완전히 지우시겠습니까?")) handleBgLongPress('main'); }} className="text-[9px] text-red-500 font-bold hover:underline">[바탕 리셋]</button>}
          </div>
        </div>
      </div>
      {renderModal()} {renderTrackerScreen()}
    </div>
  );
}
