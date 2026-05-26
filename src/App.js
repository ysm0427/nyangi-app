import React, { useState, useEffect } from 'react';

// [1. 모든 아이콘과 기본 설정]
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
  const [vh, setVh] = useState(8);

  // 2. 아빠님의 기존 데이터 로직 (캣 목록)
  const [cats] = useState(JSON.parse(localStorage.getItem('cats')) || [
    { id: "cat-1", name: "벨라", icon: "👑" },
    { id: "cat-2", name: "로이", icon: "🍼" }
  ]);

  useEffect(() => {
    const update = () => setVh(window.innerHeight * 0.01);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 3. 탭별 실제 화면 출력부 (아빠님 데이터가 여기서 보입니다)
  const renderTab = () => {
    switch(tabIdx) {
      case 0: return <div className="p-4 font-bold">오늘의 케어:<br/>{cats.map(c => <p key={c.id} className="mt-2 text-lg">{c.icon} {c.name}</p>)}</div>;
      case 1: return <div className="p-4">달력 화면</div>;
      case 2: return <div className="p-4">지출 관리 화면</div>;
      case 3: return <div className="p-4">앨범 화면</div>;
      case 4: return <div className="p-4">휴지통</div>;
      case 5: return <div className="p-4 text-xs">제작 과정 상세 내용...</div>;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-0 select-none overflow-hidden" style={{ height: `calc(${vh}px * 100)` }}>
      <div className="w-full sm:max-w-md h-full bg-white flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* 상단 여백 */}
        <div className="h-10 shrink-0"></div>

        {/* 4. 화면 전환 영역 */}
        <div className="flex-1 overflow-y-auto">
          {renderTab()}
        </div>

        {/* 5. 하단 고정 메뉴 */}
        <div className="h-20 border-t flex justify-around items-center bg-white shrink-0 z-50">
          {[
            { label: '케어', icon: <Icons.CheckSquare /> },
            { label: '달력', icon: <Icons.Calendar /> },
            { label: '지출', icon: <Icons.Card /> },
            { label: '앨범', icon: <Icons.PhotoLibrary /> },
            { label: '휴지통', icon: <Icons.Trash /> },
            { label: '제작', icon: <Icons.Code /> }
          ].map((menu, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className={`flex flex-col items-center flex-1 font-bold text-[10px] ${tabIdx === idx ? 'text-teal-600' : 'text-gray-400'}`}>
              {menu.icon}
              <span className="mt-1">{menu.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
