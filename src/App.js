import React, { useState, useEffect } from 'react';

// [1. 아이콘 세트]
const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
};

export default function App() {
  const [tabIdx, setTabIdx] = useState(0);
  const [touchX, setTouchX] = useState(0);
  
  // 데이터 로컬 저장소 로드
  const [cats] = useState(JSON.parse(localStorage.getItem('cats')) || [{ id: 1, name: "벨라", icon: "👑" }, { id: 2, name: "로이", icon: "🍼" }]);
  const [expenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);

  // [화면 고정 엔진]
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight * 0.01 : 8);
  useEffect(() => {
    const update = () => setVh(window.innerHeight * 0.01);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 화면 리스트
  const screens = [
    { label: "오늘케어", icon: <Icons.CheckSquare />, view: <div className="p-5 font-bold text-gray-700">오늘의 케어 리스트<br/>{cats.map(c => <p key={c.id}>{c.icon} {c.name}</p>)}</div> },
    { label: "종합달력", icon: <Icons.Calendar />, view: <div className="p-5 font-bold text-gray-700">종합 달력 화면</div> },
    { label: "지출관리", icon: <Icons.Card />, view: <div className="p-5 font-bold text-gray-700">지출 관리: {expenses.length}건</div> },
    { label: "냥이앨범", icon: <Icons.PhotoLibrary />, view: <div className="p-5 font-bold text-gray-700">냥이 앨범</div> },
    { label: "휴지통", icon: <Icons.Trash />, view: <div className="p-5 font-bold text-gray-700">휴지통</div> },
    { label: "제작과정", icon: <Icons.Code />, view: <div className="p-5 text-xs text-gray-600">제작자: 벨라&로이 아빠<br/>버전: v2.6 (모바일 고정 및 스와이프 완료)</div> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center font-sans select-none overflow-hidden" style={{ height: `calc(${vh}px * 100)` }}>
      <div 
        className="w-full sm:max-w-md bg-white h-full flex flex-col relative overflow-hidden shadow-2xl"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = touchX - e.changedTouches[0].clientX;
          if (delta > 50) setTabIdx(Math.min(tabIdx + 1, 5));
          if (delta < -50) setTabIdx(Math.max(tabIdx - 1, 0));
        }}
      >
        {/* 상단 여백 */}
        <div className="h-10 shrink-0"></div>

        {/* 탭 화면 전환 영역 (absolute 겹침) */}
        <div className="flex-1 relative overflow-hidden">
          {screens.map((s, idx) => (
            <div key={s.id} className={`absolute inset-0 transition-opacity duration-300 ${tabIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              {s.view}
            </div>
          ))}
        </div>

        {/* 하단 메뉴 바 */}
        <div className="h-20 border-t flex justify-around items-center bg-white z-20 pb-2">
          {screens.map((s, idx) => (
            <button key={s.id} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center flex-1 font-black text-[10px] ${tabIdx === idx ? 'text-teal-500' : 'text-gray-400'}`}>
              <div className="mb-1">{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
