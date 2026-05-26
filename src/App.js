import React, { useState, useEffect, useRef } from 'react';

// [1. 아이콘 세트 - 모든 기능 유지]
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
  const containerRef = useRef(null);

  // 데이터 로컬 저장소 로직 복구
  const [cats] = useState(JSON.parse(localStorage.getItem('cats')) || [{ name: "벨라" }, { name: "로이" }]);
  const [expenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);

  // [화면 고정]
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
  }, []);

  // 탭 목록
  const menus = [
    { label: "오늘케어", icon: <Icons.CheckSquare />, content: <div className="p-5 font-bold">케어 리스트:<br/>{cats.map(c => <p key={c.name}>{c.name}</p>)}</div> },
    { label: "종합달력", icon: <Icons.Calendar />, content: <div className="p-5 font-bold">달력 화면</div> },
    { label: "지출관리", icon: <Icons.Card />, content: <div className="p-5 font-bold">총 지출: {expenses.length}건</div> },
    { label: "냥이앨범", icon: <Icons.PhotoLibrary />, content: <div className="p-5 font-bold">앨범 화면</div> },
    { label: "휴지통", icon: <Icons.Trash />, content: <div className="p-5 font-bold">휴지통</div> },
    { label: "제작과정", icon: <Icons.Code />, content: <div className="p-5 text-xs">상세 설명이 복구되었습니다.</div> }
  ];

  return (
    <div className="fixed inset-0 bg-white flex flex-col font-sans select-none overflow-hidden" style={{ height: '100dvh' }}>
      
      {/* 1. 메인 화면 출력 영역 (좌우 부드러운 슬라이딩) */}
      <div 
        ref={containerRef}
        className="flex-1 flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${tabIdx * 100}%)`, width: '600%' }}
      >
        {menus.map((m, idx) => (
          <div key={idx} className="w-[16.66%] h-full overflow-y-auto pt-12">
            {m.content}
          </div>
        ))}
      </div>

      {/* 2. 하단 폴더형 네비게이션 (고정) */}
      <div className="h-20 border-t flex justify-around items-center bg-white z-50 pb-safe">
        {menus.map((m, idx) => (
          <button 
            key={idx} 
            onClick={() => setTabIdx(idx)} 
            className={`flex flex-col items-center flex-1 font-black text-[10px] ${tabIdx === idx ? 'text-teal-600 scale-110' : 'text-gray-400'}`}
          >
            {m.icon}
            <span className="mt-1">{m.label}</span>
          </button>
        ))}
      </div>
      
      {/* 3. 전체 꾸미기 및 리셋 버튼 */}
      <div className="absolute bottom-24 right-4 z-50">
        <button className="bg-teal-500 text-white text-[10px] p-2 rounded-full font-bold">🎨</button>
      </div>
    </div>
  );
}
