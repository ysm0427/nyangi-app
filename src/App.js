import React, { useState } from 'react';

const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  AddPhoto: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Restore: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
};

export default function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [tabIdx, setTabIdx] = useState(0);
  const [currentCat, setCurrentCat] = useState("벨라");
  const [profilePics, setProfilePics] = useState({ "벨라": null, "로이": null });
  const [birthDates, setBirthDates] = useState({ "벨라": "2024-01-20", "로이": "2025-12-10" });
  const [isAlbumEditMode, setIsAlbumEditMode] = useState(false);
  
  // 📅 전체 달력 탭용 선택 날짜 상태
  const [dashboardDate, setDashboardDate] = useState(getTodayDateString());
  const [dashYear, setDashYear] = useState(new Date().getFullYear());
  const [dashMonth, setDashMonth] = useState(new Date().getMonth() + 1);

  // 🗑 휴지통 상태 관리
  const [trashBin, setTrashBin] = useState([]);

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

  const [careRecords, setCareRecords] = useState({ "벨라": {}, "로이": {} });
  const [expenses, setExpenses] = useState([{ id: "exp-1", detail: "벨라 간식 캔", amount: 14500 }]);
  const [schedules, setSchedules] = useState([{ id: "sch-1", cat: "벨라", date: getTodayDateString(), time: "14:00", title: "동물병원 검진 🏥" }]);
  const [albums, setAlbums] = useState({ "벨라": [], "로이": [] });

  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');

  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetId: null });
  const [formData, setFormData] = useState({ title: '', amount: '', date: '', time: '', unit: '', icon: '' });

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
    return `D+${daysSince}일 / 생일 D-${daysUntil}`;
  };

  // 🗑 휴지통으로 항목 이동시키는 범용 함수
  const sendToTrash = (type, label, originalData, deleteAction) => {
    const trashItem = {
      id: Date.now().toString(),
      type,
      label,
      originalData,
      daysLeft: 30,
      deletedAt: getTodayDateString()
    };
    setTrashBin([...trashBin, trashItem]);
    deleteAction();
  };

  // 🔄 휴지통 복구 기능
  const restoreFromTrash = (id) => {
    const item = trashBin.find(t => t.id === id);
    if (!item) return;

    if (item.type === 'schedule') {
      setSchedules([...schedules, item.originalData]);
    } else if (item.type === 'expense') {
      setExpenses([...expenses, item.originalData]);
    } else if (item.type === 'careItem') {
      const cat = item.originalData.cat;
      setCareItems({ ...careItems, [cat]: [...careItems[cat], item.originalData.data] });
    } else if (item.type === 'album') {
      const cat = item.originalData.cat;
      setAlbums({ ...albums, [cat]: [...albums[cat], item.originalData.src] });
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

  const handleAlbumUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setAlbums({ ...albums, [currentCat]: [...albums[currentCat], event.target.result] });
      reader.readAsDataURL(file);
    }
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

  const renderTab0 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-center p-3 bg-[#A3E4D7] bg-opacity-20 backdrop-blur-sm">
        {["벨라", "로이"].map((catName) => (
          <button
            key={catName}
            onClick={() => setCurrentCat(catName)}
            className={`mx-2 px-6 py-2 rounded-2xl border-2 transition-all duration-200 font-bold ${
              currentCat === catName ? 'bg-white border-[#A3E4D7] shadow-sm text-gray-800' : 'bg-white/60 border-transparent text-gray-500 hover:bg-white/80'
            }`}
          >
            {catName === '벨라' ? '👑' : '🍼'} {catName}
          </button>
        ))}
      </div>

      <div className="m-4 p-4 bg-white rounded-xl border border-[#A3E4D7] shadow-sm flex items-center gap-4 relative">
        <button 
          onClick={() => { setModalState({ isOpen: true, type: 'editProfile' }); setFormData({ ...formData, date: birthDates[currentCat] }); }}
          className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-teal-600 bg-gray-50 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
        >
          <Icons.Edit /> 수정
        </button>
        
        <div className="relative w-20 h-20 shrink-0">
          {profilePics[currentCat] ? (
            <>
              <img src={profilePics[currentCat]} alt="profile" className="w-full h-full rounded-full object-cover border-2 border-[#A3E4D7]" />
              <button onClick={() => setProfilePics({ ...profilePics, [currentCat]: null })} className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm z-10"><Icons.Close /></button>
            </>
          ) : (
            <label className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300 group">
              <span className="text-3xl">{currentCat === '벨라' ? '👑' : '🍼'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
            </label>
          )}
        </div>
        
        <div>
          <h2 className="font-bold text-lg text-gray-800">{currentCat}의 프로필</h2>
          <p className="text-teal-600 text-sm font-bold mt-1">🎂 생일: {birthDates[currentCat]}</p>
          <p className="text-gray-500 text-[11px] font-medium mt-1 tracking-tight">({getAge(birthDates[currentCat])}, {getDdayInfo(birthDates[currentCat])})</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {careItems[currentCat].map((item, i) => {
          const todayRecords = careRecords[currentCat]?.[item.id]?.[getTodayDateString()] || [];
          const total = todayRecords.reduce((sum, r) => sum + r.amount, 0);
          return (
            <div key={item.id} className="relative group">
              <button onClick={() => { setActiveTracker(item); setTrackerDate(getTodayDateString()); }} className="w-full bg-white hover:bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-2xl shadow-inner border border-teal-100">{item.icon}</div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-800 text-lg">{item.title}</span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">오늘 누적: <strong className="text-teal-600">{Number.isInteger(total) ? total : total.toFixed(1)} {item.unit}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pr-2"><span className="bg-[#A3E4D7] text-teal-900 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">기록하기 ❯</span></div>
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  sendToTrash('careItem', item.title, { cat: currentCat, data: item }, () => {
                    const newItems = { ...careItems }; newItems[currentCat].splice(i, 1); setCareItems(newItems);
                  });
                }} 
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Icons.Delete />
              </button>
            </div>
          );
        })}
      </div>
      <div className="p-4 shrink-0 border-t border-gray-100 bg-white">
        <button onClick={() => { setModalState({ isOpen: true, type: 'careItem' }); setFormData({ title: '', amount: '', date: '', time: '', unit: '회', icon: '✨' }); }} className="w-full py-3.5 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-[15px]"><span className="text-xl leading-none">+</span> 새로운 케어 항목 추가</button>
      </div>
    </div>
  );

  const renderTab1 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 space-y-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">💰 지출 내역</h3>
          <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">{expenses.reduce((sum, item) => sum + Number(item.amount), 0).toLocaleString()}원</span>
        </div>
        <div className="space-y-2 mb-3">
          {expenses.map((exp, i) => (
            <div key={exp.id || i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div><p className="font-bold text-gray-800 text-sm">{exp.detail}</p><p className="text-xs text-gray-500">{exp.amount.toLocaleString()}원</p></div>
              <button 
                onClick={() => sendToTrash('expense', exp.detail, exp, () => {
                  const newExp = [...expenses]; newExp.splice(i, 1); setExpenses(newExp);
                })} 
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <Icons.Delete />
              </button>
            </div>
          ))}
          {expenses.length === 0 && <p className="text-center text-sm text-gray-400 py-4">지출 내역이 없습니다.</p>}
        </div>
        <button onClick={() => { setModalState({ isOpen: true, type: 'expense' }); setFormData({ title: '', amount: '', date: '', time: '', unit: '', icon: '' }); }} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm transition-colors">+ 지출 추가</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">📅 일정 관리</h3>
          <span className="text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full text-sm">{schedules.length}건</span>
        </div>
        <div className="space-y-2 mb-3">
          {schedules.map((sch, i) => (
            <div key={sch.id || i} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100 relative">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col items-center bg-amber-200/50 px-2 py-1 rounded text-amber-700">
                  <span className="text-[10px] font-bold leading-tight">{sch.date.slice(5)}</span>
                  <span className="text-sm font-black leading-tight">{sch.time}</span>
                </div>
                <div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1 rounded font-bold mr-1">{sch.cat}</span>
                  <p className="font-bold text-gray-800 text-sm inline-block">{sch.title}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => { setModalState({ isOpen: true, type: 'editSchedule', targetId: sch.id }); setFormData({ title: sch.title, date: sch.date, time: sch.time, cat: sch.cat }); }}
                  className="text-gray-400 hover:text-teal-600 p-1"
                >
                  <Icons.Edit />
                </button>
                <button 
                  onClick={() => sendToTrash('schedule', sch.title, sch, () => {
                    const newSch = [...schedules]; newSch.splice(i, 1); setSchedules(newSch);
                  })} 
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Icons.Delete />
                </button>
              </div>
            </div>
          ))}
          {schedules.length === 0 && <p className="text-center text-sm text-gray-400 py-4">등록된 일정이 없습니다.</p>}
        </div>
        <button onClick={() => { setModalState({ isOpen: true, type: 'schedule' }); setFormData({ title: '', date: getTodayDateString(), time: '12:00', cat: currentCat }); }} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm transition-colors">+ 일정 추가</button>
      </div>
    </div>
  );

  // 📅 새로운 전체일정 달력 보기 탭
  const renderTab2 = () => {
    const firstDay = new Date(dashYear, dashMonth - 1, 1).getDay();
    const daysInMonth = new Date(dashYear, dashMonth, 0).getDate();
    const calendarDays = Array.from({ length: firstDay }).map(() => null).concat(Array.from({ length: daysInMonth }).map((_, i) => i + 1));

    const handleMonthChange = (offset) => {
      let nm = dashMonth + offset;
      let ny = dashYear;
      if (nm > 12) { nm = 1; ny += 1; }
      if (nm < 1) { nm = 12; ny -= 1; }
      setDashMonth(nm);
      setDashYear(ny);
    };

    const targetDateSchedules = schedules.filter(s => s.date === dashboardDate);
    
    return (
      <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
        <div className="bg-white px-4 py-3 border-b border-gray-100 shadow-sm shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => handleMonthChange(-1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronLeft /></button>
            <span className="font-black text-xl text-gray-800">{dashYear}년 {dashMonth}월 전체 일정</span>
            <button onClick={() => handleMonthChange(1)} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"><Icons.ChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (<div key={day} className={`text-xs font-bold py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>{day}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="h-12"></div>;
              const dateStr = `${dashYear}-${String(dashMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const hasSchedule = schedules.some(s => s.date === dateStr);
              const isSelected = dashboardDate === dateStr;
              
              return (
                <button 
                  key={d} 
                  onClick={() => setDashboardDate(dateStr)} 
                  className={`flex flex-col items-center justify-between h-12 rounded-xl border p-1 transition-all ${isSelected ? 'border-teal-400 bg-teal-50/80 ring-2 ring-teal-400/20' : 'border-transparent hover:bg-gray-50'}`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}>{d}</span>
                  <div className="flex gap-0.5 justify-center w-full">
                    {hasSchedule && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3">
          <h3 className="font-extrabold text-gray-800 border-l-4 border-teal-400 pl-2 text-sm">{dashboardDate} 상세 내역</h3>
          
          {targetDateSchedules.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6 bg-white rounded-xl border border-gray-100">등록된 일정이 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {targetDateSchedules.map((sch, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-amber-100 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{sch.time}</span>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-1 rounded">{sch.cat}</span>
                    <p className="text-sm font-bold text-gray-800">{sch.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTab3 = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="w-full p-3 bg-[#E8F8F5] border-b border-teal-100 flex justify-between items-center px-4">
        <p className="font-bold text-teal-700">보관된 사진: {albums[currentCat].length}장</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {albums[currentCat].length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3 opacity-60"><Icons.PhotoLibrary /><p className="text-sm font-bold">아직 추가된 사진이 없어요!</p></div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {albums[currentCat].map((src, i) => (
              <div key={i} className="aspect-square relative bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <img src={src} alt="cat" className="w-full h-full object-cover" />
                {isAlbumEditMode && (
                  <button 
                    onClick={() => sendToTrash('album', `${currentCat} 사진`, { cat: currentCat, src, index: i }, () => {
                      const newAlbums = {...albums}; newAlbums[currentCat].splice(i, 1); setAlbums(newAlbums);
                    })}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  >
                    <Icons.Close />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex gap-2 border-t border-gray-100 bg-white">
        <label className="flex-1 py-3 bg-[#A3E4D7] hover:bg-[#8fd9cb] text-gray-800 font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 cursor-pointer">
          <Icons.AddPhoto /> 앨범에서 찾기
          <input type="file" accept="image/*" onChange={handleAlbumUpload} className="hidden" />
        </label>
        <button onClick={() => setIsAlbumEditMode(!isAlbumEditMode)} className={`px-5 py-3 font-bold rounded-xl shadow-sm transition-colors ${isAlbumEditMode ? 'bg-red-400 text-white hover:bg-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{isAlbumEditMode ? '완료' : '수정'}</button>
      </div>
    </div>
  );

  // 🗑 새로운 휴지통 폴더 탭
  const renderTab4 = () => (
    <div className="flex flex-col h-full bg-gray-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-black text-gray-800">🗑 휴지통 (30일 보관)</h2>
        <button onClick={() => setTrashBin([])} className="text-xs text-red-500 font-bold hover:underline">전체 비우기</button>
      </div>
      
      {trashBin.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-2 py-12">
          <Icons.Trash />
          <p className="text-sm font-bold">휴지통이 비어있습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trashBin.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded mr-1.5">{item.type === 'schedule' ? '일정' : item.type === 'expense' ? '지출' : item.type === 'careItem' ? '케어' : '사진'}</span>
                <p className="text-sm font-bold text-gray-800 inline-block">{item.label}</p>
                <p className="text-[11px] text-red-400 font-bold mt-1">⏳ 자동 삭제까지 {item.daysLeft}일 남음</p>
              </div>
              <button 
                onClick={() => restoreFromTrash(item.id)}
                className="flex items-center gap-1 text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Icons.Restore /> 복구
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderModal = () => {
    if (!modalState.isOpen) return null;
    let title = "";
    if (modalState.type === 'careItem') title = `${currentCat} 케어 항목 추가`;
    if (modalState.type === 'expense') title = `지출 추가`;
    if (modalState.type === 'schedule') title = `일정 추가`;
    if (modalState.type === 'editSchedule') title = `일정 수정`;
    if (modalState.type === 'editProfile') title = `프로필 수정`;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[320px] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-bold text-lg text-gray-800">{title}</h3></div>
          <div className="p-5 space-y-3">
            {modalState.type === 'editProfile' && (
              <>
                <p className="text-xs font-bold text-gray-500 mb-1">생년월일 변경</p>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
              </>
            )}
            {(modalState.type === 'schedule' || modalState.type === 'editSchedule') && (
              <>
                <p className="text-xs font-bold text-gray-500">대상 냥이 선택</p>
                <div className="flex gap-2">
                  {["벨라", "로이"].map(name => (
                    <button key={name} type="button" onClick={() => setFormData({...formData, cat: name})} className={`flex-1 py-1.5 border rounded-lg text-xs font-bold ${formData.cat === name ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-gray-50'}`}>{name}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
                  <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-[110px] px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
                </div>
              </>
            )}
            {modalState.type === 'careItem' && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["✨", "💧", "🥣", "💊", "🪮", "⚖️", "🧸"].map(emoji => (
                  <button key={emoji} onClick={() => setFormData({...formData, icon: emoji})} className={`text-2xl p-2 rounded-xl border ${formData.icon === emoji ? 'bg-teal-50 border-teal-400' : 'bg-gray-50'}`}>{emoji}</button>
                ))}
              </div>
            )}
            {modalState.type !== 'editProfile' && (
              <input type="text" placeholder="내용을 입력하세요" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} autoFocus className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
            )}
            {modalState.type === 'careItem' && (
              <input type="text" placeholder="단위 (예: 회, ml, g)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
            )}
            {modalState.type === 'expense' && (
              <input type="number" placeholder="금액 (숫자만)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E4D7] text-sm" />
            )}
          </div>
          <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
            <button onClick={() => setModalState({ isOpen: false, type: null })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">취소</button>
            <button onClick={() => {
              if (modalState.type === 'editProfile' && formData.date) setBirthDates({...birthDates, [currentCat]: formData.date});
              else if (modalState.type === 'careItem' && formData.title) setCareItems({...careItems, [currentCat]: [...careItems[currentCat], {id: Date.now().toString(), ...formData}]});
              else if (modalState.type === 'expense' && formData.title && formData.amount) setExpenses([...expenses, { id: Date.now().toString(), detail: formData.title, amount: Number(formData.amount) }]);
              else if (modalState.type === 'schedule' && formData.title) setSchedules([...schedules, { id: Date.now().toString(), cat: formData.cat || currentCat, date: formData.date, time: formData.time, title: formData.title }]);
              else if (modalState.type === 'editSchedule') {
                setSchedules(schedules.map(s => s.id === modalState.targetId ? { ...s, title: formData.title, date: formData.date, time: formData.time, cat: formData.cat } : s));
              }
              setModalState({ isOpen: false, type: null, targetId: null });
            }} className="px-4 py-2 text-sm font-bold bg-[#A3E4D7] text-gray-800 hover:bg-[#8fd9cb] rounded-lg transition-colors">
              저장
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
    const [calYear, calMonth] = trackerDate.split('-').map(Number);
    const firstDay = new Date(calYear, calMonth - 1, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth, 0).getDate();
    const calendarDays = Array.from({ length: firstDay }).map(() => null).concat(Array.from({ length: daysInMonth }).map((_, i) => i + 1));

    return (
      <div className={`absolute inset-0 bg-gray-50 z-40 transition-transform duration-300 transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center p-4 bg-white border-b border-gray-200 shrink-0 shadow-sm z-20">
          <button onClick={() => setActiveTracker(null)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><Icons.ChevronLeft /></button>
          <h2 className="flex-1 text-center font-bold text-lg text-gray-800 mr-8">{currentCat} {tracker.title} 기록</h2>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="bg-white px-4 py-3 shrink-0 border-b border-gray-100 shadow-sm z-10">
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (<div key={day} className={`text-[11px] font-bold py-1 ${i === 0 ? 'text-red-400' : 'text-gray-400'}`}>{day}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, idx) => {
                if (!d) return <div key={`empty-${idx}`} className="h-[46px]"></div>;
                const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dayTotal = (careRecords[currentCat]?.[tracker.id]?.[dateStr] || []).reduce((sum, r) => sum + r.amount, 0);
                const isSelected = trackerDate === dateStr;
                return (
                  <button key={d} onClick={() => setTrackerDate(dateStr)} className={`flex flex-col items-center justify-start h-[46px] rounded-lg py-1 border ${isSelected ? 'border-teal-400 bg-teal-50' : 'border-transparent'}`}>
                    <span className="text-[13px] font-medium">{d}</span>
                    {dayTotal > 0 && <span className="text-[9px] font-bold text-teal-600">{dayTotal}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-b from-white to-teal-50/50 shrink-0 border-b border-teal-100">
             <p className="text-4xl font-black text-teal-600">{totalAmount}<span className="text-2xl text-teal-400 font-bold ml-1">{tracker.unit}</span></p>
          </div>
          <div className="p-4 bg-white shadow-sm shrink-0 border-b border-gray-100">
            <div className="flex gap-2 mb-3">
              {quickAmounts.map(amount => (<button key={amount} onClick={() => handleAddRecord(amount)} className="flex-1 py-2 bg-teal-50 text-teal-700 font-bold rounded-lg text-sm">+{amount}{tracker.unit}</button>))}
            </div>
            <div className="flex gap-2">
              <input type="number" placeholder={`직접 입력 (${tracker.unit})`} value={trackerInputAmount} onChange={e => setTrackerInputAmount(e.target.value)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
              <button onClick={() => handleAddRecord(trackerInputAmount)} className="px-6 py-2.5 bg-[#A3E4D7] text-gray-800 font-bold rounded-xl shadow-sm">등록</button>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2 bg-gray-50">
            {dailyRecords.map((record, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="font-bold text-gray-800 text-lg">{record.amount} {tracker.unit} <span className="text-xs text-gray-400 font-medium ml-2">{record.time}</span></p>
                <button 
                  onClick={() => sendToTrash('careRecord', `${tracker.title} 상세내역`, { cat: currentCat, trackerId: tracker.id, date: trackerDate, index: i }, () => {
                    const newRecords = { ...careRecords }; newRecords[currentCat][tracker.id][trackerDate].splice(i, 1); setCareRecords(newRecords);
                  })} 
                  className="p-2 text-red-400"
                >
                  <Icons.Delete />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4()];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900">
        <div className="flex-1 overflow-hidden relative">{tabs[tabIdx]}</div>
        
        {/* 하단 모바일 내비게이션 바 (총 5개 메뉴 배치) */}
        <div className="flex justify-around items-center bg-white border-t border-gray-200 pb-safe pt-2 px-1 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-30 shrink-0 h-16">
          {[
            { icon: <Icons.CheckSquare />, label: "오늘 케어" },
            { icon: <Icons.Edit />, label: "가계부/일정" },
            { icon: <Icons.Calendar />, label: "종합 달력" },
            { icon: <Icons.PhotoLibrary />, label: "냥이 앨범" },
            { icon: <Icons.Trash />, label: "휴지통" }
          ].map((item, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${tabIdx === idx ? 'text-[#A3E4D7]' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className="mb-0.5">{item.icon}</div><span className="text-[9px] font-bold tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
        {renderModal()}
        {renderTrackerScreen()}
      </div>
    </div>
  );
}
