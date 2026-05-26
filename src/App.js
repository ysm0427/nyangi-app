import React, { useState, useEffect } from 'react';

// 1. 순정 마스터 아이콘 세트 (오류 완벽 차단)
const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
};

const COLOR_MAP = { red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-400', green: 'bg-green-500', blue: 'bg-blue-500', purple: 'bg-purple-500' };

export default function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [tabIdx, setTabIdx] = useState(0);
  
  // 슬라이딩 터치 좌표 기억 장치
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 고양이 데이터 원장 보관소
  const [cats] = useState([
    { id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑", gender: "여아" },
    { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼", gender: "남아" }
  ]);
  const [currentCat, setCurrentCat] = useState("벨라");
  const currentCatData = cats.find(c => c.name === currentCat) || cats[0];

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => { window.removeEventListener('resize', updateVh); window.removeEventListener('orientationchange', updateVh); };
  }, []);

  // ★ 순정 슬라이딩 터치 계산 공정
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // 왼쪽으로 밀었을 때 ➔ 다음 폴더로 이동
      setTabIdx((prev) => Math.min(prev + 1, 5));
    }
    if (touchStart - touchEnd < -75) {
      // 오른쪽으로 밀었을 때 ➔ 이전 폴더로 이동
      setTabIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  // 6대 폴더 화면 구현부
  const renderTab0 = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center bg-teal-500/10 p-3 rounded-xl mb-4">
        <div className="flex gap-2">
          {cats.map(c => (
            <button key={c.id} onClick={() => setCurrentCat(c.name)} className={`px-4 py-1.5 rounded-xl font-bold text-sm ${currentCat === c.name ? 'bg-white shadow text-gray-800 border border-teal-200' : 'bg-white/50 text-gray-500'}`}>{c.icon} {c.name}</button>
          ))}
        </div>
        <span className="text-xs font-bold text-gray-400">⚙️ 설정</span>
      </div>

      <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 flex items-center gap-4 mb-4 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-inner border border-teal-200">{currentCatData.icon}</div>
        <div>
          <h2 className="font-black text-xl text-gray-800">{currentCat} <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-bold ml-1">{currentCatData.gender}</span></h2>
          <p className="text-xs text-gray-500 font-bold mt-1">🎂 생일: {currentCatData.birth}</p>
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs flex justify-between items-center"><p className="font-bold text-gray-700">💧 음수량 측정</p><span className="text-xs font-black bg-blue-500 text-white px-3 py-1 rounded-full">ml 단위</span></div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs flex justify-between items-center"><p className="font-bold text-gray-700">🪮 렉돌 코트 빗질</p><span className="text-xs font-black bg-purple-500 text-white px-3 py-1 rounded-full">회 단위</span></div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs flex justify-between items-center"><p className="font-bold text-gray-700">⚖️ 몸무게 체크 (로이)</p><span className="text-xs font-black bg-green-500 text-white px-3 py-1 rounded-full">kg 단위</span></div>
      </div>
    </div>
  );

  const renderTab1 = () => <div className="p-4"><p className="font-bold text-lg text-gray-800 mb-2">📅 종합 달력 시스템</p><div className="h-40 bg-gray-50 rounded-xl border border-dashed flex items-center justify-center text-gray-400 text-sm">달력 모듈이 가동 중입니다.</div></div>;
  const renderTab2 = () => <div className="p-4"><p className="font-bold text-lg text-gray-800 mb-2">💰 지출 결산 통계 보드</p><div className="p-4 bg-slate-900 text-teal-400 rounded-xl font-mono">가계부 정산 대시보드 활성화 완료</div></div>;
  const renderTab3 = () => (
    <div className="p-4 flex flex-col gap-4">
      <p className="font-bold text-lg text-gray-800">📸 냥이 앨범 아카이브</p>
      <label className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-black rounded-xl text-center shadow-md cursor-pointer flex justify-center items-center gap-2 text-sm">
        <Icons.Camera /> 직접 촬영 및 업로드 (카메라 개방)
        <input type="file" accept="image/*" onChange={(e) => { if(e.target.files[0]) alert("촬영 및 선택 완료!"); }} className="hidden" />
      </label>
    </div>
  );
  const renderTab4 = () => <div className="p-4 text-gray-500 text-sm font-bold">🗑 휴지통 (삭제된 항목 30일 보관 기능 활성화)</div>;
  const renderTab5 = () => <div className="p-4 text-xs text-slate-400 font-mono">⚙️ SYSTEM VERSION 2.0 // 제작자: 벨라&로이 아빠 (모바일 락&슬라이딩 패치 완공)</div>;

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4(), renderTab5()];
  const tabMenus = [
    { label: "오늘케어", icon: <Icons.CheckSquare /> },
    { label: "종합달력", icon: <Icons.Calendar /> },
    { label: "지출관리", icon: <Icons.Card /> },
    { label: "냥이앨범", icon: <Icons.PhotoLibrary /> },
    { label: "휴지통", icon: <Icons.Trash /> },
    { label: "제작과정", icon: <Icons.Code /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 select-none antialiased">
      {/* 고정 틀 크기 락 공정 */}
      <div 
        className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative sm:border-8 border-gray-900 sm:rounded-[40px] shadow-2xl" 
        style={{ height: `calc(${vh}px * 100)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 상단바 카메라 홀 회피 공정 (pt-12로 안전마진 확보) */}
        <div className="flex-1 overflow-hidden relative pt-12 bg-white">
          {tabs[tabIdx]}
        </div>

        {/* 🌟 하단 폴더형 프리미엄 메뉴 바 디자인 리뉴얼 */}
        <div className="h-20 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.04)] flex justify-around items-center px-2 z-40 shrink-0">
          {tabMenus.map((menu, idx) => (
            <button 
              key={idx} 
              onClick={() => setTabIdx(idx)} 
              className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all ${tabIdx === idx ? 'text-teal-500 bg-teal-50/60 scale-105 font-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
            >
              <div className={`mb-1 transition-transform ${tabIdx === idx ? 'scale-110 text-teal-500' : ''}`}>{menu.icon}</div>
              <span className="text-[10px] tracking-tight">{menu.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
