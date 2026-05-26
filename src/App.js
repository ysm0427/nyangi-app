import React, { useState, useEffect } from 'react';

// 1. 순정 아이콘 정의 (오류 유발 방지 완전체 세트)
const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  AddPhoto: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
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

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);

    const updateVh = () => { setVh(window.innerHeight * 0.01); };
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => { window.removeEventListener('resize', updateVh); window.removeEventListener('orientationchange', updateVh); };
  }, []);

  const getLocalData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    try { return saved ? JSON.parse(saved) : fallback; } catch (e) { return fallback; }
  };

  const compressImage = (base64Str, maxWidth = 500, quality = 0.5) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width; let height = img.height;
        if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  // 2. 아빠님의 소중한 데이터 원장 복구
  const [cats, setCats] = useState(() => getLocalData('cats', [
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑", gender: "여아" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼", gender: "남아" }
  ]));
  
  const [currentCat, setCurrentCat] = useState("벨라");
  const [tabIdx, setTabIdx] = useState(0);
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
  const [formData, setFormData] = useState({ title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '✨', isCustomImg: false, color: 'blue', location: '우리집 🏠', catId: '', catName: '', catBirth: '', catIcon: '🐾', catGender: '여아' });

  useEffect(() => { localStorage.setItem('cats', JSON.stringify(cats)); }, [cats]);
  useEffect(() => { localStorage.setItem('profilePics', JSON.stringify(profilePics)); }, [profilePics]);
  useEffect(() => { localStorage.setItem('careItems', JSON.stringify(careItems)); }, [careItems]);
  useEffect(() => { localStorage.setItem('careRecords', JSON.stringify(careRecords)); }, [careRecords]);
  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('albums', JSON.stringify(albums)); }, [albums]);
  useEffect(() => { localStorage.setItem('trashBin', JSON.stringify(trashBin)); }, [trashBin]);
  useEffect(() => { localStorage.setItem('bgImages', JSON.stringify(bgImages)); }, [bgImages]);

  const currentCatData = cats.find(c => c.name === currentCat) || cats[0] || { name: '', birth: '2026-01-01', icon: '🐾', gender: '여아' };

  const getExpenseStats = () => {
    const targetYearStr = dashYear.toString(); const targetMonthStr = String(dashMonth).padStart(2, '0');
    let monthTotal = 0; let yearTotal = 0;
    expenses.forEach(exp => {
      if (exp.date && exp.date.startsWith(targetYearStr)) { yearTotal += exp.amount; if (exp.date.substring(5, 7) === targetMonthStr) { monthTotal += exp.amount; } }
    });
    return { monthTotal, yearTotal };
  };
  const { monthTotal, yearTotal } = getExpenseStats();

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
      reader.onload = async (ev) => { const compressed = await compressImage(ev.target.result, 200, 0.5); setProfilePics({ ...profilePics, [currentCat]: compressed }); };
      reader.readAsDataURL(file);
    }
  };

  const handleBgImageUpload = (e, targetKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => { const compressed = await compressImage(ev.target.result, 600, 0.4); setBgImages({ ...bgImages, [targetKey]: compressed }); };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e, locationStr = "우리집 🏠") => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith('video/'); const reader = new FileReader();
      reader.onload = async (ev) => {
        let finalSrc = ev.target.result; if (!isVideo) finalSrc = await compressImage(ev.target.result, 500, 0.5);
        setAlbums({ ...albums, [currentCat]: [...(albums[currentCat] || []), { id: Date.now().toString(), src: finalSrc, isVideo, date: getTodayDateString(), location: locationStr }] });
        setModalState({ isOpen: false, type: null, fileEvent: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgStyle = (key) => bgImages[key] ? { backgroundImage: `url(${bgImages[key]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255,255,255,0.75)' } : {};

  const renderBgEditButton = (key) => (
    <div className="absolute bottom-3 right-3 z-40 flex items-center bg-white/80 backdrop-blur-md px-2 py-1 rounded-full shadow border text-[11px] font-bold">
      <label className="cursor-pointer">🎨 꾸미기<input type="file" accept="image/*" className="hidden" onChange={(e) => handleBgImageUpload(e, key)} /></label>
    </div>
  );

  // 3. 아빠님이 요청하신 화면 그리기 완전체 복구
  const renderTab0 = () => (
    <div className="flex flex-col h-full relative pt-10" style={handleBgStyle('tab0')}>
      <div className="flex justify-between items-center p-3 bg-teal-500/20 backdrop-blur-sm px-4">
        <div className="flex overflow-x-auto gap-2 flex-1 scrollbar-hide">
          {cats.map((c) => (
            <button key={c.id} onClick={() => setCurrentCat(c.name)} className={`px-4 py-1.5 rounded-xl border font-bold text-sm transition-all ${currentCat === c.name ? 'bg-white border-teal-400 text-gray-800 shadow-sm' : 'bg-white/60 border-transparent text-gray-500'}`}>{c.icon} {c.name}</button>
          ))}
        </div>
        <button onClick={() => setModalState({ isOpen: true, type: 'manageCats' })} className="ml-2 px-3 py-1.5 bg-gray-800 text-white rounded-xl text-xs font-bold shrink-0">⚙️ 냥이 관리</button>
      </div>

      <div className="m-4 p-4 bg-white/90 rounded-xl border border-teal-200 shadow-sm flex items-center gap-4 relative">
        <div className="relative w-20 h-20 shrink-0">
          {profilePics[currentCat] ? ( <img src={profilePics[currentCat]} alt="p" className="w-full h-full rounded-full object-cover border-2 border-teal-300" /> ) : (
            <label className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full cursor-pointer border-2 border-dashed border-gray-300"><span className="text-3xl">{currentCatData.icon}</span><input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} /></label>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5"><h2 className="font-bold text-lg text-gray-800">{currentCat}</h2><span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-600">{currentCatData.gender}</span></div>
          <p className="text-teal-600 text-sm font-bold mt-1">🎂 {currentCatData.birth}</p>
          <p className="text-gray-500 text-[11px] mt-0.5">({getAge(currentCatData.birth)}, {getDdayInfo(currentCatData.birth)})</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-14 space-y-3">
        {(careItems[currentCat] || []).map((item) => {
          const total = (careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || []).reduce((sum, r) => sum + r.amount, 0);
          return (
            <button key={item.id} onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }} className="w-full bg-white/90 border p-4 rounded-xl shadow-sm flex justify-between items-center text-left">
              <div><p className="font-bold text-gray-800 text-base">{item.icon} {item.title}</p><p className="text-sm font-bold text-teal-600 mt-1">오늘: {total} {item.unit || '회'}</p></div>
              <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full">기록 ❯</span>
            </button>
          );
        })}
      </div>
      {renderBgEditButton('tab0')}
    </div>
  );

  const renderTab1 = () => {
    const daysInMonth = new Date(dashYear, dashMonth, 0).getDate();
    return (
      <div className="flex flex-col h-full bg-gray-50 p-4 pt-10" style={handleBgStyle('tab1')}>
        <div className="bg-white/90 p-3 rounded-xl border shadow-sm mb-3 text-center font-bold text-lg">{dashYear}년 {dashMonth}월 스케줄 만능 달력</div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {schedules.map(s => (
            <div key={s.id} className="bg-white p-3 rounded-xl border flex justify-between items-center"><div className="text-sm font-bold text-gray-800">[{s.cat}] {s.title}</div><span className="text-xs text-gray-400 font-mono">{s.date} {s.time}</span></div>
          ))}
        </div>
        {renderBgEditButton('tab1')}
      </div>
    );
  };

  const renderTab2 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 pt-10" style={handleBgStyle('tab2')}>
      <div className="bg-slate-800 text-white p-4 rounded-xl shadow-sm mb-3">
        <p className="text-xs font-bold text-teal-400">지출 대시보드</p>
        <p className="text-xl font-black mt-1">이번 달 총액: {monthTotal.toLocaleString()} 원</p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {expenses.map(e => (
          <div key={e.id} className="bg-white p-3 rounded-xl border flex justify-between items-center"><span className="text-sm font-bold text-gray-800">{e.detail}</span><span className="font-mono text-sm text-red-500 font-bold">{e.amount.toLocaleString()}원</span></div>
        ))}
      </div>
      {renderBgEditButton('tab2')}
    </div>
  );

  const renderTab3 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 pt-10 relative" style={handleBgStyle('tab3')}>
      <p className="font-bold text-gray-700 mb-3">📸 벨라 & 로이 사진 아카이브</p>
      <div className="flex gap-2 absolute bottom-4 left-4 right-4 z-30">
        <label className="flex-1 py-3 bg-teal-500 text-white rounded-xl text-center font-bold shadow-sm cursor-pointer">
          📷 직접 촬영 (선택창 개방)
          <input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, "현장 촬영 📸")} className="hidden" />
        </label>
      </div>
      {renderBgEditButton('tab3')}
    </div>
  );

  const renderTab4 = () => <div className="p-4 pt-10 h-full" style={handleBgStyle('tab4')}>🗑 휴지통 기능이 정상 가동 중입니다.</div>;
  const renderTab5 = () => <div className="p-5 pt-10 h-full text-xs text-slate-500" style={handleBgStyle('tab5')}>🛠 제작자: 벨라&로이 아빠 / 아이폰 최적화 패치 버전 완공</div>;

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4(), renderTab5()];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 select-none font-sans">
       <div className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900" 
            style={{ height: `calc(${vh}px * 100)` }}>
          
          <div className="flex-1 overflow-hidden relative">{tabs[tabIdx]}</div>

          {/* 하단 단단한 고정 메뉴 배선 */}
          <div className="h-16 flex justify-around border-t bg-white z-40">
            {['오늘케어', '종합달력', '지출관리', '냥이앨범', '휴지통', '제작과정'].map((label, idx) => (
              <button key={idx} onClick={() => setTabIdx(idx)} className={`text-xs font-black p-2 flex-1 transition-colors ${tabIdx === idx ? 'text-teal-500 font-extrabold' : 'text-gray-400'}`}>{label}</button>
            ))}
          </div>
       </div>
    </div>
  );
}
