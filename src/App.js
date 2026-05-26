import React, { useState, useEffect } from 'react';

// [아이콘 및 기본 설정]
const Icons = {
  CheckSquare: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Card: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  PhotoLibrary: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Code: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
};

export default function App() {
  const [tabIdx, setTabIdx] = useState(0);
  const [touchX, setTouchX] = useState(0);

  // 고양이 데이터 로직 (여기에 기존 cats, careItems 등을 넣으시면 됩니다)
  const [cats] = useState([
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼" }
  ]);

  const tabs = [
    { id: 0, label: "오늘케어", icon: <Icons.CheckSquare />, content: <div className="p-6 text-xl font-bold">오늘 케어 화면입니다. 여기서 데이터를 불러옵니다.</div> },
    { id: 1, label: "종합달력", icon: <Icons.Calendar />, content: <div className="p-6 text-xl font-bold">종합 달력 화면입니다.</div> },
    { id: 2, label: "지출관리", icon: <Icons.Card />, content: <div className="p-6 text-xl font-bold">지출 관리 화면입니다.</div> },
    { id: 3, label: "냥이앨범", icon: <Icons.PhotoLibrary />, content: <div className="p-6 text-xl font-bold">냥이 앨범 화면입니다.</div> },
    { id: 4, label: "휴지통", icon: <Icons.Trash />, content: <div className="p-6 text-xl font-bold">휴지통 화면입니다.</div> },
    { id: 5, label: "제작과정", icon: <Icons.Code />, content: <div className="p-6 text-sm leading-relaxed">제작 과정 상세 내용...</div> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col h-full w-full overflow-hidden touch-none">
      {/* 1. 화면 전환 엔진 (좌우 스와이프 기능 내장) */}
      <div 
        className="flex-1 w-full h-full relative overflow-hidden"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = touchX - e.changedTouches[0].clientX;
          if (delta > 50) setTabIdx(Math.min(tabIdx + 1, 5));
          else if (delta < -50) setTabIdx(Math.max(tabIdx - 1, 0));
        }}
      >
        {tabs.map((tab, idx) => (
          <div 
            key={tab.id}
            className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out bg-white"
            style={{ transform: `translateX(${(idx - tabIdx) * 100}%)` }}
          >
            {tab.content}
          </div>
        ))}
      </div>

      {/* 2. 하단 폴더형 네비게이션 바 */}
      <div className="h-20 bg-white border-t border-gray-200 flex justify-around items-center shrink-0 pb-2">
        {tabs.map((tab, idx) => (
          <button 
            key={tab.id} 
            onClick={() => setTabIdx(idx)}
            className={`flex flex-col items-center flex-1 font-bold ${tabIdx === idx ? 'text-teal-600' : 'text-gray-400'}`}
          >
            {tab.icon}
            <span className="text-[10px] mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
