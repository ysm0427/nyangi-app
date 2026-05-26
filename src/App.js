import React, { useState, useEffect } from 'react';

// 아이콘 팩 (그대로 유지)
const Icons = {
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
};

export default function App() {
  const [tabIdx, setTabIdx] = useState(0);
  const [vh, setVh] = useState(8);

  // 1. 아빠님의 소중한 기존 데이터 로직 복구
  const [cats] = useState([
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼" }
  ]);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    updateVh();
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 2. 각 탭의 화면 로직
  const tabs = [
    { label: "오늘케어", icon: <Icons.CheckSquare />, content: <div className="p-4 font-bold">벨라와 로이의 케어 기록:<br/>{cats.map(c => <p key={c.id}>{c.icon} {c.name}</p>)}</div> },
    { label: "종합달력", icon: <Icons.Calendar />, content: <div className="p-4 font-bold">일정을 등록하세요.</div> },
    { label: "지출관리", icon: <Icons.Card />, content: <div className="p-4 font-bold">이번 달 지출 내역</div> },
    { label: "냥이앨범", icon: <Icons.PhotoLibrary />, content: <div className="p-4 font-bold">소중한 냥이 사진첩</div> },
    { label: "휴지통", icon: <Icons.Trash />, content: <div className="p-4 font-bold">삭제된 내역</div> },
    { label: "제작과정", icon: <Icons.Code />, content: <div className="p-4 text-xs">제작자: 아빠 / 냥이들을 위한 앱</div> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center font-sans overflow-hidden" style={{ height: `calc(${vh}px * 100)` }}>
      <div className="w-full sm:max-w-md h-full bg-white flex flex-col shadow-2xl relative">
        
        {/* 상단 여백 (노치 대응) */}
        <div className="h-10 shrink-0"></div>

        {/* 탭 전환 영역 */}
        <div className="flex-1 overflow-y-auto">
          {tabs[tabIdx].content}
        </div>

        {/* 하단 폴더형 메뉴 */}
        <div className="h-20 border-t bg-white flex justify-around items-center shrink-0">
          {tabs.map((tab, idx) => (
            <button 
              key={tab.id} 
              onClick={() => setTabIdx(idx)} 
              className={`flex flex-col items-center flex-1 ${tabIdx === idx ? 'text-teal-600' : 'text-gray-400'}`}
            >
              {tab.icon}
              <span className="text-[10px] font-bold mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
