import React, { useState, useEffect } from 'react';

// [Icons, ColorMap, Emojis 세트는 이전과 동일]
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

export default function App() {
  const [vh, setVh] = useState(8);
  const [tabIdx, setTabIdx] = useState(0);
  const [touchX, setTouchX] = useState(0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    updateVh();
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 화면을 6개 탭으로 정의 (데이터 로직 포함)
  const tabContent = [
    <div className="w-full h-full p-4 overflow-y-auto">오늘케어 데이터 화면...</div>,
    <div className="w-full h-full p-4 overflow-y-auto">종합달력 데이터 화면...</div>,
    <div className="w-full h-full p-4 overflow-y-auto">지출관리 데이터 화면...</div>,
    <div className="w-full h-full p-4 overflow-y-auto">냥이앨범 데이터 화면...</div>,
    <div className="w-full h-full p-4 overflow-y-auto">휴지통 데이터 화면...</div>,
    <div className="w-full h-full p-4 overflow-y-auto">제작과정 데이터 화면...</div>
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center font-sans select-none" style={{ height: `calc(${vh}px * 100)` }}>
      <div 
        className="w-full sm:max-w-md bg-white h-full flex flex-col relative overflow-hidden shadow-2xl"
        onTouchStart={(e) => setTouchX(e.targetTouches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = touchX - e.changedTouches[0].clientX;
          if (delta > 50) setTabIdx(Math.min(tabIdx + 1, 5));
          if (delta < -50) setTabIdx(Math.max(tabIdx - 1, 0));
        }}
      >
        {/* 상단 여백 (노치 대응) */}
        <div className="h-10 shrink-0"></div>

        {/* 핵심: 화면 전환 엔진 (absolute 겹침 방식) */}
        <div className="flex-1 relative overflow-hidden bg-white">
          {tabContent.map((content, idx) => (
            <div 
              key={idx} 
              className={`absolute inset-0 transition-opacity duration-300 ${tabIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {content}
            </div>
          ))}
        </div>

        {/* 하단 내비게이션 바 */}
        <div className="h-16 flex border-t bg-white shrink-0 z-20">
          {['케어','달력','지출','앨범','휴지통','제작'].map((label, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className={`flex-1 font-black text-[10px] ${tabIdx === idx ? 'text-teal-500' : 'text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
