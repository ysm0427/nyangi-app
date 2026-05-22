import React, { useState, useEffect } from 'react';

const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  AddPhoto: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Restore: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
};

const COLOR_MAP = {
  red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-400',
  green: 'bg-green-500', blue: 'bg-blue-500', purple: 'bg-purple-500'
};

const EXPANDED_EMOJIS = [
  "✨", "💧", "🥣", "💊", "🪮", "⚖️", "🧸", "🏥", "🐾", "🚿", 
  "✂️", "🥩", "🐟", "🍼", "🦷", "👁️", "👂", "🩹", "🧻", "💩", 
  "🧺", "🧶", "🐭", "🦗", "🏡", "🚗", "🥇", "🎗️", "📅", "⏰", 
  "💤", "❤️", "🐈"
];

export default function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // 모바일 화면 확대 방지 메타태그 강제 고정
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);

  const getLocalData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

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
      { id: "pill", title: "영양제 챙기기", icon: "💊", isCustomImg: false, unit: "회", color: "red" }
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

  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');

  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetId: null });
  const [formData, setFormData] = useState({ 
    title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '✨', isCustomImg: false, color: 'blue',
    location: '우리집 🏠', catId: '', catName: '', catBirth: '', catIcon: '🐾', catGender: '여아' 
  });

  // 스마트폰 비밀 금고(로컬스토리지) 실시간 강제 보관 기능
  useEffect(() => { localStorage.setItem('cats', JSON.stringify(cats)); }, [cats]);
  useEffect(() => { localStorage.setItem('profilePics', JSON.stringify(profilePics)); }, [profilePics]);
  useEffect(() => { localStorage.setItem('careItems', JSON.stringify(careItems)); }, [careItems]);
  useEffect(() => { localStorage.setItem('careRecords', JSON.stringify(careRecords)); }, [careRecords]);
  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('albums', JSON.stringify(albums)); }, [albums]);
  useEffect(() => { localStorage.setItem('trashBin', JSON.stringify(trashBin)); }, [trashBin]);

  const currentCatData = cats.find(c => c.name === currentCat) || cats[0] || { name: '', birth: '2026-01-01', icon: '🐾', gender: '여아' };

  const getExpenseStats = () => {
    const targetYearStr = dashYear.toString();
    const targetMonthStr = String(dashMonth).padStart(2, '0');
    let monthTotal = 0; let yearTotal = 0;
    expenses.forEach(exp => {
      if (exp.date) {
        if (exp.date.startsWith(targetYearStr)) {
          yearTotal += exp.amount;
          if (exp.date.substring(5, 7) === targetMonthStr) { monthTotal += exp.amount; }
        }
      }
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
    const birth = new Date(dateStr); const birthDay = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
    const diffSinceBirth = today.getTime() - birthDay.getTime();
    const daysSince = Math.floor(diffSinceBirth / (1000 * 60 * 60 * 24));
    let nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth < today) nextBirth.setFullYear(today.getFullYear() + 1);
    const diffUntilNext = nextBirth.getTime() - today.getTime();
    const daysUntil = Math.ceil(diffUntilNext / (1000 * 60 * 60 * 24));
    return `D+${daysSince}일 / 생일 D-${daysUntil}`;
  };

  const sendToTrashWithConfirm = (type, label, originalData, deleteAction) => {
    const isConfirmed = window.confirm(`[삭제 확인] '${label}' 항목을 삭제하여 휴지통으로 보내시겠습니까?`);
    if (!isConfirmed) return;
    const trashItem = { id: Date.now().toString(), type, label, originalData, daysLeft: 30, deletedAt: getTodayDateString() };
    setTrashBin([...trashBin, trashItem]);
    deleteAction();
  };

  const restoreFromTrash = (id) => {
    const item = trashBin.find(t => t.id === id);
    if (!item) return;
    if (item.type === 'schedule') setSchedules([...schedules, item.originalData]);
    else if (item.type === 'expense') setExpenses([...expenses, item.originalData]);
    else if (item.type === 'careItem') {
      const cat = item.originalData.cat;
      setCareItems({ ...careItems, [cat]: [...(careItems[cat] || []), item.originalData.data] });
    } else if (item.type === 'album') {
      const cat = item.originalData.cat; setAlbums({ ...albums, [cat]: [...(albums[cat] || []), item.originalData] });
    }
    setTrashBin(trashBin.filter(t => t.id !== id));
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfilePics({ ...profilePics, [currentCat]: event.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleCustomIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setFormData({ ...formData, icon: event.target.result, isCustomImg: true });
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e, locationStr = "우리집 🏠") => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith('video/'); const reader = new FileReader();
      reader.onload = (event) => {
        const newMedia = { id: Date.now().toString(), src: event.target.result, isVideo, date: getTodayDateString(), location: locationStr };
        setAlbums({ ...albums, [currentCat]: [...(albums[currentCat] || []), newMedia] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecord = (amountStr) => {
    if (!amountStr || !activeTracker) return;
    const num = parseFloat(amountStr);
    if (isNaN(num)) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newRecord = { amount: num, time: timeStr };
    
    const catRecords = careRecords[currentCat] || {};
    const itemRecords = catRecords[activeTracker.id] || {};
    const dateRecords = itemRecords[trackerDate] || [];
    
    const updatedRecords = {
      ...careRecords,
      [currentCat]: {
        ...catRecords,
        [activeTracker.id]: {
          ...itemRecords,
          [trackerDate]: [...dateRecords, newRecord]
        }
      }
    };
    setCareRecords(updatedRecords);
    setTrackerInputAmount('');
  };

  const renderTab0 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center p-3 bg-[#A3E4D7] bg-opacity-20 backdrop-blur-sm px-4">
        <div className="flex overflow-x-auto gap-2 scrollbar-hide flex-1">
          {cats.map((c) => (
            <button key={c.id} onClick={() => setCurrentCat(c.name)} className={`px-4 py-1.5 rounded-xl border-2 shrink-0 text-sm font-bold transition-all ${currentCat === c.name ? 'bg-white border-[#A3E4D7] shadow-sm text-gray-800' : 'bg-white/60 border-transparent text-gray-500'}`}>{c.icon} {c.name}</button>
          ))}
        </div>
        <button onClick={() => setModalState({ isOpen: true, type: 'manageCats' })} className="ml-2 px-3 py-1.5 bg-gray-800 text-white rounded-xl text-xs font-bold shadow-sm shrink-0">⚙️ 냥이 추가/수정</button>
      </div>

      <div className="m-4 p-4 bg-white rounded-xl border border-[#A3E4D7] shadow-sm flex items-center gap-4 relative">
        <div className="relative w-20 h-20 shrink-0">
          {profilePics[currentCat] ? (
            <>
              <img src={profilePics[currentCat]} alt="profile" className="w-full h-full rounded-full object-cover border-2 border-[#A3E4D7]" />
              <button onClick={() => setProfilePics({ ...profilePics, [currentCat]: null })} className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 text-white rounded-full flex items-center justify-center text-xs shadow-sm z-10"><Icons.Close /></button>
            </>
          ) : (
            <label className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full cursor-pointer border-2 border-dashed border-gray-300 group">
              <span className="text-3xl">{currentCatData.icon}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
            </label>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-bold text-lg text-gray-800">{currentCat}</h2>
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${currentCatData.gender === '여아' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{currentCatData.gender === '여아' ? '여아 ♀' : '남아 ♂'}</span>
          </div>
          <p className="text-teal-600 text-sm font-bold mt-1">🎂 생일: {currentCatData.birth}</p>
          <p className="text-gray-500 text-[11px] font-medium mt-1 tracking-tight">({getAge(currentCatData.birth)}, {getDdayInfo(currentCatData.birth)})</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {(careItems[currentCat] || []).map((item, i) => {
          const todayRecords = careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || [];
          const total = todayRecords.reduce((sum, r) => sum + r.amount, 0);
          return (
            <div key={item.id} className="relative group">
              <button onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }} className="w-full bg-white hover:bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner border-2 overflow-hidden ${item.color === 'red' ? 'border-red-400' : item.color === 'orange' ? 'border-orange-400' : item.color === 'yellow' ? 'border-yellow-300' : item.color === 'green' ? 'border-green-400' : item.color === 'purple' ? 'border-purple-400' : 'border-blue-400'} bg-teal-50`}>
                    {item.isCustomImg ? ( <img src={item.icon} alt="ico" className="w-full h-full object-cover" /> ) : ( <span className="text-2xl">{item.icon}</span> )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-800 text-lg">{item.title}</span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">오늘 누적: <strong className="text-teal-600">{Number.isInteger(total) ? total : total.toFixed(1)} {item.unit}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pr-2"><span className="bg-[#A3E4D7] text-teal-900 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">기록하기 ❯</span></div>
              </button>
              <button onClick={(e) => { e.stopPropagation(); sendToTrashWithConfirm('careItem', item.title, { cat: currentCat, data: item }, () => { const newItems = { ...careItems }; newItems[currentCat].splice(i, 1); setCareItems(newItems); }); }} className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Icons.Delete /></button>
            </div>
          );
        })}
      </div>
      <div className="p-4 shrink-0 border-t border-gray-100 bg-white">
        <button onClick={() => { setModalState({ isOpen: true, type: 'careItem' }); setFormData({ title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '회', icon: '✨', isCustomImg: false, color: 'blue' }); }} className="w-full py-3.5 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl shadow-sm flex justify-center items-center gap-2 text-[15px]"><span className="text-xl leading-none">+</span> 새로운 케어 항목 추가</button>
      </div>
    </div>
  );

  const renderTab1 = () => {
    const firstDay = new Date(dashYear, dashMonth - 1, 1).getDay(); 
    const daysInMonth = new Date(dashYear, dashMonth, 0).getDate();
    const calendarDays = Array.from({ length: firstDay }).map(() => null).concat(Array.from({ length: daysInMonth }).map((_, i) => i + 1));
    const handleMonthChange = (offset) => {
      let nm = dashMonth + offset; let ny = dashYear;
      if (nm > 12) { nm = 1; ny += 1; } if (nm < 1) { nm = 12; ny -= 1; }
      setDashMonth(nm); setDashYear(ny);
    };
    const targetDateSchedules = schedules.filter(s => s.date === dashboardDate);

    return (
      <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
        <div className="bg-white px-4 py-3 border-b border-gray-100 shadow-sm shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => handleMonthChange(-1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronLeft /></button>
            <span className="font-black text-xl text-gray-800">{dashYear}년 {dashMonth}월 종합 달력</span>
            <button onClick={() => handleMonthChange(1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (<div key={day} className={`text-xs font-bold py-1 ${i === 0 ? 'text-red-400' : 'text-gray-400'}`}>{day}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="h-14"></div>;
              const dateStr = `${dashYear}-${String(dashMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const activeDots = [];
              cats.forEach(cat => {
                const catItems = careItems[cat.name] || [];
                catItems.forEach(item => {
                  if (careRecords[cat.name]?.[item.id]?.[dateStr]?.length > 0 && item.color && !activeDots.includes(item.color)) { activeDots.push(item.color); }
                });
              });
              const hasSchedule = schedules.some(s => s.date === dateStr);

              return (
                <button key={d} onClick={() => setDashboardDate(dateStr)} className={`flex flex-col items-center justify-between h-14 rounded-xl border p-1 ${dashboardDate === dateStr ? 'border-teal-400 bg-teal-50/80 ring-2 ring-teal-400/20' : 'border-transparent'}`}>
                  <span className="text-xs font-bold text-gray-700">{d}</span>
                  <div className="flex flex-col items-center gap-0.5 w-full">
                    {hasSchedule && <span className="w-full h-1 bg-amber-400 rounded-sm mb-0.5"></span>}
                    <div className="flex gap-0.5 justify-center overflow-x-hidden w-full max-w-full">
                      {activeDots.map(color => ( <span key={color} className={`w-1.5 h-1.5 rounded-full ${COLOR_MAP[color] || 'bg-teal-400'}`} /> ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3">
          <div className="flex justify-between items-center border-l-4 border-teal-400 pl-2">
            <h3 className="font-extrabold text-gray-800 text-sm">{dashboardDate} 일정 현황</h3>
            <button onClick={() => { setModalState({ isOpen: true, type: 'schedule' }); setFormData({ title: '', date: dashboardDate, time: '12:00', cat: currentCat }); }} className="px-2.5 py-1 bg-teal-500 text-white rounded-lg text-xs font-black shadow-sm">+ 이 날짜에 일정 추가</button>
          </div>
          {targetDateSchedules.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-8 bg-white rounded-xl border border-dashed">선택된 날짜에 등록된 일정이 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {targetDateSchedules.map((sch, idx) => (
                <div key={sch.id || idx} className="bg-white p-3 rounded-xl border border-amber-100 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{sch.time}</span>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-1 rounded">{sch.cat}</span>
                    <p className="text-sm font-bold text-gray-800">{sch.title}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => { setModalState({ isOpen: true, type: 'editSchedule', targetId: sch.id }); setFormData({ title: sch.title, date: sch.date, time: sch.time, cat: sch.cat }); }} className="text-gray-400 hover:text-teal-600 p-1"><Icons.Edit /></button>
                    <button onClick={() => sendToTrashWithConfirm('schedule', sch.title, sch, () => { setSchedules(schedules.filter(s => s.id !== sch.id)); })} className="text-gray-400 hover:text-red-500 p-1"><Icons.Delete /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTab2 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-700">
        <span className="text-xs font-black bg-teal-400 text-slate-900 px-2 py-0.5 rounded">지출 결산 통계 보드</span>
        <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
          <div className="border-r border-slate-700/60 pr-2">
            <p className="text-slate-400 text-xs font-bold">📅 {dashMonth}월 지출액</p>
            <p className="text-xl font-black text-teal-300 mt-1">{monthTotal.toLocaleString()}<span className="text-xs ml-0.5">원</span></p>
          </div>
          <div className="pl-2">
            <p className="text-slate-400 text-xs font-bold">📊 {dashYear}년 총 누적액</p>
            <p className="text-xl font-black text-rose-300 mt-1">{yearTotal.toLocaleString()}<span className="text-xs ml-0.5">원</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3"><h3 className="font-extrabold text-gray-800 text-md">💰 전체 지출 원장 리스트</h3><span className="text-xs text-gray-400 font-medium">총 건수: {expenses.length}건</span></div>
        <div className="space-y-2 mb-3">
          {expenses.map((exp, i) => (
            <div key={exp.id || i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex gap-3 items-center">
                <div className="text-center bg-red-50 border border-red-100 px-2 py-0.5 rounded text-[11px] text-red-600 font-bold">{exp.date ? exp.date.slice(5) : getTodayDateString().slice(5)}</div>
                <div><p className="font-bold text-gray-800 text-sm">{exp.detail}</p><p className="text-xs text-gray-500 font-black">{exp.amount.toLocaleString()}원</p></div>
              </div>
              <button onClick={() => sendToTrashWithConfirm('expense', exp.detail, exp, () => { setExpenses(expenses.filter(e => e.id !== exp.id)); })} className="text-gray-400 hover:text-red-500 p-1"><Icons.Delete /></button>
            </div>
          ))}
        </div>
        <button onClick={() => { setModalState({ isOpen: true, type: 'expense' }); setFormData({ title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '' }); }} className="w-full py-3 bg-[#A3E4D7] text-gray-800 font-bold rounded-xl text-sm shadow-sm transition-colors">+ 새로운 지출 내역 추가</button>
      </div>
    </div>
  );

  const renderTab3 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="w-full p-3 bg-[#E8F8F5] border-b border-teal-100 flex justify-between items-center px-4"><p className="font-bold text-teal-700">보관된 미디어: {(albums[currentCat] || []).length}개</p></div>
      <div className="flex-1 overflow-y-auto p-4">
        {(!albums[currentCat] || albums[currentCat].length === 0) ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3 opacity-60"><Icons.PhotoLibrary /><p className="text-sm font-bold">아직 추가된 사진/동영상이 없어요!</p></div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {albums[currentCat].map((item, i) => (
              <div key={item.id || i} onClick={() => { if(!isAlbumEditMode) setSelectedMedia(item); }} className="aspect-square relative bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-sm cursor-pointer">
                {item.isVideo ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-black"><video src={item.src} className="w-full h-full object-cover" muted playsInline /><span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded font-black">🎬 VIDEO</span></div>
                ) : ( <img src={item.src} alt="cat" className="w-full h-full object-cover" /> )}
                {isAlbumEditMode && (
                  <button onClick={(e) => { e.stopPropagation(); sendToTrashWithConfirm('album', `${currentCat} 미디어`, item, () => { const newAlbums = {...albums}; newAlbums[currentCat].splice(i, 1); setAlbums(newAlbums); }); }} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm z-10"><Icons.Close /></button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <label className="flex-1 py-3 bg-[#A3E4D7] text-gray-800 font-bold rounded-xl shadow-sm flex justify-center items-center gap-2 cursor-pointer text-sm"><Icons.PhotoLibrary /> 앨범 선택<input type="file" accept="image/*,video/*" onChange={(e) => setModalState({ isOpen: true, type: 'addMediaFile', fileEvent: e })} className="hidden" /></label>
          <label className="flex-1 py-3 bg-teal-500 text-white font-bold rounded-xl shadow-sm flex justify-center items-center gap-2 cursor-pointer text-sm"><Icons.Camera /> 직접 촬영<input type="file" accept="image/*,video/*" capture="environment" onChange={(e) => setModalState({ isOpen: true, type: 'addMediaFile', fileEvent: e })} className="hidden" /></label>
        </div>
        <button onClick={() => setIsAlbumEditMode(!isAlbumEditMode)} className={`w-full py-2 font-bold rounded-xl text-xs ${isAlbumEditMode ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-500'}`}>{isAlbumEditMode ? '편집 완료' : '미디어 삭제/수정'}</button>
      </div>
    </div>
  );

  const renderTab4 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-black text-gray-800">🗑 휴지통 (30일 보관)</h2><button onClick={() => { if(window.confirm("정말 휴지통을 영구적으로 완전히 비우시겠습니까?")) setTrashBin([]); }} className="text-xs text-red-500 font-bold hover:underline">전체 비우기</button></div>
      {trashBin.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-2 py-12"><Icons.Trash /><p className="text-sm font-bold">휴지통이 비어있습니다.</p></div>
      ) : (
        <div className="space-y-3">
          {trashBin.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded mr-1.5">{item.type === 'schedule' ? '일정' : item.type === 'expense' ? '지출' : item.type === 'careItem' ? '케어' : '미디어'}</span>
                <p className="text-sm font-bold text-gray-800 inline-block">{item.label}</p>
                <p className="text-[11px] text-red-400 font-bold mt-1">⏳ 보관 유효기간 {item.daysLeft}일 남음</p>
              </div>
              <button onClick={() => restoreFromTrash(item.id)} className="flex items-center gap-1 text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"><Icons.Restore /> 복구</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTab5 = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-6 overflow-y-auto tracking-tight">
      <div className="border-b border-slate-800 pb-4 mb-5"><span className="text-xs font-black bg-teal-500 text-teal-950 px-2 py-1 rounded">BUILD SYSTEM ARCHIVE</span><h2 className="text-2xl font-black mt-2 text-white flex items-center gap-2"><Icons.Code /> 냥이 앱 제작 비하인드</h2></div>
      <div className="space-y-5 text-sm leading-relaxed">
        <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl">
          <h3 className="font-extrabold text-teal-400 mb-1.5 text-[15px]">💻 개발 환경 및 기술 스택</h3>
          <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-[11px]">
            <div className="bg-slate-900 p-2 rounded border border-slate-800"><span className="text-teal-400 font-bold">Engine:</span> React 18</div><div className="bg-slate-900 p-2 rounded border border-slate-800"><span className="text-teal-400 font-bold">Style:</span> Tailwind CSS</div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800"><span className="text-teal-400 font-bold">Repository:</span> GitHub</div><div className="bg-slate-900 p-2 rounded border border-slate-800"><span className="text-teal-400 font-bold">Server:</span> Vercel Cloud</div>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl space-y-3">
          <h3 className="font-extrabold text-teal-400 text-[15px]">🛠 아빠의 개발 고전분투기 (노고 기록)</h3>
          <div className="border-l-2 border-teal-500/30 pl-3 space-y-2">
            <div><h4 className="font-bold text-white text-xs">Step 1. 시스템 인프라 및 금고 연동 완료</h4><p className="text-slate-400 text-[11px] mt-0.5">Vercel 플랫폼 이주 후, 기기 자체 안전 금고인 localStorage를 구축하여 껐다 켜도 데이터가 평생 소멸하지 않는 자동 영구 저장 메커니즘 전면 탑재 성공.</p></div>
            <div><h4 className="font-bold text-white text-xs">Step 2. 모바일 화면 최적화 및 키보드 버그 수정</h4><p className="text-slate-400 text-[11px] mt-0.5">스마트폰 텍스트창 입력 시 발생하는 자동 화면 확대(Zoom in) 현상을 차단하고, 모바일 키보드 자수 제한 현상을 방지하기 위해 특수 타입 필터를 제거하여 무제한 금액 입력 패치 완수.</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrackerScreen = () => {
    const isOpen = activeTracker !== null; const tracker = activeTracker || { id: '', title: '', unit: '', icon: '', isCustomImg: false };
    const dailyRecords = (careRecords[currentCat]?.[tracker.id]?.[trackerDate]) || [];
    const totalAmount = dailyRecords.reduce((sum, record) => sum + record.amount, 0);
    return (
      <div className={`absolute inset-0 bg-gray-50 z-40 transition-transform duration-300 transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center p-4 bg-white border-b border-gray-200 shrink-0 shadow-sm"><button onClick={() => setActiveTracker(null)} className="p-2 -ml-2 text-gray-600"><Icons.ChevronLeft /></button><h2 className="flex-1 text-center font-bold text-lg text-gray-800 mr-8">{currentCat} {tracker.title} 기록</h2></div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          <p className="text-4xl font-black text-teal-600 text-center py-6">{totalAmount}<span className="text-2xl text-teal-400 font-bold ml-1">{tracker.unit}</span></p>
          <div className="flex gap-2 mb-4">
            <input type="number" placeholder={`직접 입력 (${tracker.unit})`} value={trackerInputAmount} onChange={e => setTrackerInputAmount(e.target.value)} className="flex-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:outline-none text-base" />
            <button onClick={() => handleAddRecord(trackerInputAmount)} className="px-6 py-2.5 bg-[#A3E4D7] font-bold rounded-xl shadow-sm text-base">등록</button>
          </div>
          <div className="space-y-2">
            {dailyRecords.map((record, i) => (
              <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="font-bold text-gray-800 text-base">{record.amount} {tracker.unit} <span className="text-xs text-gray-400 ml-2">{record.time}</span></p>
                <button onClick={() => {
                  if(window.confirm("이 기록을 삭제하시겠습니까?")) {
                    const newRecords = { ...careRecords };
                    newRecords[currentCat][tracker.id][trackerDate].splice(i, 1);
                    setCareRecords(newRecords);
                  }
                }} className="p-2 text-red-400"><Icons.Delete /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!modalState.isOpen) return null;
    let title = "";
    if (modalState.type === 'careItem') title = `${currentCat} 케어 항목 추가`;
    if (modalState.type === 'expense') title = `지출 내역 영수증 추가`;
    if (modalState.type === 'schedule') title = `일정 예약 등록`;
    if (modalState.type === 'editSchedule') title = `일정 데이터 수정`;
    if (modalState.type === 'addMediaFile') title = `미디어 정보 등록 위치`;
    if (modalState.type === 'manageCats') title = `🐱 냥이 그룹 매니징 및 추가`;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[340px] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50"><h3 className="font-black text-base text-gray-800">{title}</h3><button onClick={() => setModalState({ isOpen: false, type: null })} className="text-gray-400 hover:text-gray-600"><Icons.Close /></button></div>
          <div className="p-5 space-y-3 max-h-[450px] overflow-y-auto">
            {modalState.type === 'manageCats' && (
              <div className="space-y-4">
                <div className="space-y-3 border-b pb-3">
                  <p className="text-xs font-bold text-gray-400">등록된 고양이 리스트</p>
                  {cats.map((cat, idx) => (
                    <div key={cat.id} className="flex flex-col gap-1.5 bg-gray-50 p-2.5 rounded-lg border">
                      <div className="flex gap-1 items-center">
                        <input type="text" value={cat.icon} onChange={e => { const newCats=[...cats]; newCats[idx].icon=e.target.value; setCats(newCats); }} className="w-8 text-center border bg-white rounded p-1 text-base" />
                        <input type="text" value={cat.name} onChange={e => { const newCats=[...cats]; newCats[idx].name=e.target.value; setCats(newCats); }} className="w-16 font-bold border bg-white rounded p-1 text-base" />
                        <input type="date" value={cat.birth} onChange={e => { const newCats=[...cats]; newCats[idx].birth=e.target.value; setCats(newCats); }} className="flex-1 border bg-white rounded p-1 text-sm font-mono" />
                        <button onClick={() => { if(cats.length > 1){ if(window.confirm(`${cat.name} 정보를 완전 삭제하시겠습니까?`)) setCats(cats.filter(c => c.id !== cat.id)); } }} className="text-red-400 p-1"><Icons.Delete /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {["남아", "여아"].map(g => ( <button key={g} type="button" onClick={() => { const newCats=[...cats]; newCats[idx].gender=g; setCats(newCats); }} className={`py-1.5 rounded text-xs font-bold border transition-colors ${cat.gender === g ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-500'}`}>{g === '여아' ? '여아 ♀' : '남아 ♂'}</button> ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                  <p className="text-xs font-black text-teal-800">✨ 새로운 냥이 추가하기</p>
                  <div className="flex gap-1">
                    <input type="text" placeholder="아이콘" value={formData.catIcon} onChange={e => setFormData({...formData, catIcon: e.target.value})} className="w-12 border rounded p-2 text-center text-base bg-white" />
                    <input type="text" placeholder="이름 입력" value={formData.catName} onChange={e => setFormData({...formData, catName: e.target.value})} className="flex-1 border rounded p-2 text-base bg-white font-bold" />
                  </div>
                  <input type="date" value={formData.catBirth} onChange={e => setFormData({...formData, catBirth: e.target.value})} className="w-full border rounded p-2 text-base bg-white font-mono" />
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    {["남아", "여아"].map(g => ( <button key={g} type="button" onClick={() => setFormData({...formData, catGender: g})} className={`py-1.5 rounded-lg text-xs font-bold border ${formData.catGender === g ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-400'}`}>{g === '여아' ? '여아 ♀' : '남아 ♂'}</button> ))}
                  </div>
                  <button onClick={() => {
                    if(formData.catName && formData.catBirth) {
                      const newCat = { id: Date.now().toString(), name: formData.catName, birth: formData.catBirth, icon: formData.catIcon || "🐾", gender: formData.catGender };
                      setCats([...cats, newCat]);
                      setCareItems({ ...careItems, [formData.catName]: [{ id: "water", title: "음수량 측정", icon: "💧", isCustomImg: false, unit: "ml", color: "blue" }, { id: "brush", title: "코트 빗질", icon: "🪮", isCustomImg: false, unit: "회", color: "purple" }] });
                      setFormData({...formData, catName: '', catBirth: getTodayDateString(), catIcon: '🐾', catGender: '여아'});
                    }
                  }} className="w-full mt-2 py-2 bg-teal-500 text-white rounded-lg text-xs font-bold hover:bg-teal-600 transition-colors">새로운 냥이 그룹 등록 확정</button>
                </div>
              </div>
            )}

            {modalState.type === 'addMediaFile' && ( <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="예: 우리집, 동물병원, 캣쇼 전시장" className="w-full px-3 py-2.5 border rounded-lg text-base" /> )}
            {modalState.type === 'expense' && (
              <>
                <p className="text-xs font-bold text-gray-500">📅 소비 날짜 선택</p>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2.5 border rounded-lg text-base" />
              </>
            )}
            {(modalState.type === 'schedule' || modalState.type === 'editSchedule') && (
              <>
                <p className="text-xs font-bold text-gray-500">대상 고양이 지정</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {cats.map(c => ( <button key={c.id} type="button" onClick={() => setFormData({...formData, cat: c.name})} className={`px-3 py-1.5 border rounded-xl text-xs font-bold shrink-0 ${formData.cat === c.name ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-gray-50 text-gray-500'}`}>{c.name}</button> ))}
                </div>
                <div className="flex gap-2">
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="flex-1 px-3 py-2.5 border rounded-lg text-base" />
                  <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-[110px] px-3 py-2.5 border rounded-lg text-base" />
                </div>
              </>
            )}
            
            {modalState.type === 'careItem' && (
              <>
                <p className="text-xs font-bold text-gray-400">아이콘 선택 (이모티콘 팩)</p>
                <div className="grid grid-cols-6 gap-1.5 max-h-[110px] overflow-y-auto p-1.5 border rounded-xl bg-gray-50">
                  {EXPANDED_EMOJIS.map(emoji => ( <button key={emoji} type="button" onClick={() => setFormData({...formData, icon: emoji, isCustomImg: false})} className={`text-xl p-1.5 rounded-lg border transition-all text-center ${(!formData.isCustomImg && formData.icon === emoji) ? 'bg-teal-50 border-teal-400 shadow-sm scale-105' : 'bg-white border-gray-200'}`}>{emoji}</button> ))}
                </div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-gray-400 mb-1">또는 사진첩 이미지 설정</p>
                  <label className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold flex justify-center items-center gap-1.5 cursor-pointer border border-dashed text-base">
                    <Icons.PhotoLibrary /> {formData.isCustomImg ? "📸 커스텀 사진 선택됨" : "📂 내 사진첩에서 선택"}
                    <input type="file" accept="image/*" onChange={handleCustomIconUpload} className="hidden" />
                  </label>
                  {formData.isCustomImg && ( <div className="mt-2 flex justify-center"><img src={formData.icon} alt="preview" className="w-12 h-12 rounded-full object-cover border-2 border-teal-400" /></div> )}
                </div>
                <p className="text-xs font-bold text-gray-400 pt-1">종합달력 체크 색상 선택</p>
                <div className="grid grid-cols-6 gap-2">
                  {["red", "orange", "yellow", "green", "blue", "purple"].map(colorKey => ( <button key={colorKey} type="button" onClick={() => setFormData({...formData, color: colorKey})} className={`h-8 rounded-lg ${COLOR_MAP[colorKey]} border-2 flex items-center justify-center text-white text-xs font-bold transition-all ${formData.color === colorKey ? 'border-gray-800 ring-2 ring-gray-400/50 scale-105' : 'border-transparent opacity-80'}`}>{formData.color === colorKey && "✓"}</button> ))}
                </div>
              </>
            )}

            {modalState.type !== 'editProfile' && modalState.type !== 'manageCats' && modalState.type !== 'addMediaFile' && ( <input type="text" placeholder={modalState.type === 'expense' ? "예: 사료 구입, 캣쇼 참가비" : "내용을 입력하세요"} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} autoFocus className="w-full px-3 py-2.5 border rounded-lg text-base" /> )}
            {modalState.type === 'careItem' && ( <input type="text" placeholder="단위 (예: 회, ml, g)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-3 py-2.5 border rounded-lg text-base" /> )}
            {modalState.type === 'expense' && ( <input type="number" placeholder="금액 (숫자만)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2.5 border rounded-lg text-base" /> )}
          </div>
          <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
            <button onClick={() => setModalState({ isOpen: false, type: null, targetId: null, fileEvent: null })} className="px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-200 rounded-lg">닫기</button>
            {modalState.type !== 'manageCats' && (
              <button onClick={() => {
                if (modalState.type === 'addMediaFile' && modalState.fileEvent) handleMediaUpload(modalState.fileEvent, formData.location);
                else if (modalState.type === 'careItem' && formData.title) setCareItems({...careItems, [currentCat]: [...(careItems[currentCat] || []), {id: Date.now().toString(), ...formData}]});
                else if (modalState.type === 'expense' && formData.title && formData.amount) setExpenses([...expenses, { id: Date.now().toString(), date: formData.date, detail: formData.title, amount: Number(formData.amount) }]);
                else if (modalState.type === 'schedule' && formData.title) setSchedules([...schedules, { id: Date.now().toString(), cat: formData.cat || currentCat, date: formData.date, time: formData.time, title: formData.title }]);
                else if (modalState.type === 'editSchedule') setSchedules(schedules.map(s => s.id === modalState.targetId ? { ...s, title: formData.title, date: formData.date, time: formData.time, cat: formData.cat } : s));
                setModalState({ isOpen: false, type: null, targetId: null, fileEvent: null });
              }} className="px-4 py-2 text-base font-bold bg-[#A3E4D7] text-gray-800 hover:bg-[#8fd9cb] rounded-lg">저장 및 추가</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMediaDetailModal = () => {
    if (!selectedMedia) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="p-3 border-b flex justify-between items-center bg-gray-50"><span className="font-bold text-xs text-teal-600">📌 미디어 정보</span> <button onClick={() => setSelectedMedia(null)} className="p-1 bg-gray-200 rounded-full text-gray-700"><Icons.Close /></button></div>
          <div className="bg-black max-h-[380px] flex items-center justify-center overflow-hidden">
            {selectedMedia.isVideo ? ( <video src={selectedMedia.src} className="w-full h-full object-contain" controls autoPlay playsInline /> ) : ( <img src={selectedMedia.src} alt="detail" className="w-full h-full object-contain" /> )}
          </div>
          <div className="p-4 bg-white border-t space-y-1 text-sm">
            <div className="flex justify-between"> <span className="text-gray-400">📆 등록 일시</span> <span className="text-gray-800 font-bold">{selectedMedia.date}</span> </div>
            <div className="flex justify-between"> <span className="text-gray-400">📍 촬영 위치</span> <span className="text-teal-600 font-extrabold">{selectedMedia.location || "우리집 🏠"}</span> </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4(), renderTab5()];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900">
        <div className="flex-1 overflow-hidden relative">{tabs[tabIdx]}</div>
        <div className="flex justify-around items-center bg-white border-t border-gray-200 pb-safe pt-2 px-1 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-30 shrink-0 h-16">
          {[
            { icon: <Icons.CheckSquare />, label: "오늘 케어" }, { icon: <Icons.Calendar />, label: "종합 달력" },
            { icon: <Icons.Card />, label: "지출 관리" }, { icon: <Icons.PhotoLibrary />, label: "냥이 앨범" },
            { icon: <Icons.Trash />, label: "휴지통" }, { icon: <Icons.Code />, label: "제작 과정" }
          ].map((item, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${tabIdx === idx ? 'text-[#A3E4D7]' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className="mb-0.5">{item.icon}</div><span className="text-[9px] font-bold tracking-tighter scale-90 sm:scale-100">{item.label}</span>
            </button>
          ))}
        </div>
        {renderModal()} {renderTrackerScreen()} {renderMediaDetailModal()}
      </div>
    </div>
  );
}
