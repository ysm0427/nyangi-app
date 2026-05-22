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
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
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

  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);

    const appMeta = document.createElement('meta');
    appMeta.name = "apple-mobile-web-app-capable";
    appMeta.content = "yes";
    document.getElementsByTagName('head')[0].appendChild(appMeta);

    const statusMeta = document.createElement('meta');
    statusMeta.name = "apple-mobile-web-app-status-bar-style";
    statusMeta.content = "black-translucent";
    document.getElementsByTagName('head')[0].appendChild(statusMeta);

    const updateVh = () => {
      setVh(window.innerHeight * 0.01);
    };
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  const getLocalData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const compressImage = (base64Str, maxWidth = 500, quality = 0.5) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(base64Str);
    });
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

  const [bgImages, setBgImages] = useState(() => getLocalData('bgImages', {
    main: null, tab0: null, tab1: null, tab2: null, tab3: null, tab4: null, tab5: null
  }));

  const [activeTracker, setActiveTracker] = useState(null);
  const [trackerDate, setTrackerDate] = useState(getTodayDateString());
  const [trackerInputAmount, setTrackerInputAmount] = useState('');

  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetId: null, fileEvent: null });
  const [formData, setFormData] = useState({ 
    title: '', amount: '', date: getTodayDateString(), time: '12:00', unit: '', icon: '✨', isCustomImg: false, color: 'blue',
    location: '우리집 🏠', catId: '', catName: '', catBirth: '', catIcon: '🐾', catGender: '여아' 
  });

  useEffect(() => { localStorage.setItem('cats', JSON.stringify(cats)); }, [cats]);
  useEffect(() => { localStorage.setItem('profilePics', JSON.stringify(profilePics)); }, [profilePics]);
  useEffect(() => { localStorage.setItem('careItems', JSON.stringify(careItems)); }, [careItems]);
  useEffect(() => { localStorage.setItem('careRecords', JSON.stringify(careRecords)); }, [careRecords]);
  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('albums', JSON.stringify(albums)); }, [albums]);
  useEffect(() => { localStorage.setItem('trashBin', JSON.stringify(trashBin)); }, [trashBin]);
  useEffect(() => { localStorage.setItem('bgImages', JSON.stringify(bgImages)); }, [bgImages]);

  useEffect(() => {
    const checkAlarmClock = setInterval(() => {
      const now = new Date();
      const currentYMD = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      schedules.forEach(sch => {
        if (sch.date === currentYMD && sch.time === currentHM) {
          const alarmKey = `alerted-${sch.id}-${currentHM}`;
          if (!localStorage.getItem(alarmKey)) {
            localStorage.setItem(alarmKey, 'true');
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification(`[냥이 스케줄 알람]`, {
                body: `[${sch.cat}] ${sch.title} 시간입니다!`,
                icon: profilePics[sch.cat] || ''
              });
            } else {
              alert(`🔔 [${sch.cat} 알람] ${sch.title} 시간입니다!`);
            }
          }
        }
      });
    }, 30000);

    return () => clearInterval(checkAlarmClock);
  }, [schedules, profilePics]);

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
      reader.onload = async (event) => {
        const compressed = await compressImage(event.target.result,
