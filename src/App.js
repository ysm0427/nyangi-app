import React, { useState, useEffect } from 'react';

// [Icons 생략 - 기존 코드 그대로 사용하세요]
const Icons = { Close: () => <svg />, CheckSquare: () => <svg />, Calendar: () => <svg />, Card: () => <svg />, PhotoLibrary: () => <svg />, Trash: () => <svg />, Code: () => <svg />, Camera: () => <svg />, ChevronLeft: () => <svg />, ChevronRight: () => <svg />, Edit: () => <svg />, Restore: () => <svg /> };

export default function App() {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [tabIdx, setTabIdx] = useState(0);
  const [cats, setCats] = useState(() => JSON.parse(localStorage.getItem('cats')) || [{ id: "cat-1", name: "벨라", birth: "2024-01-20", icon: "👑", gender: "여아" }, { id: "cat-2", name: "로이", birth: "2025-12-10", icon: "🍼", gender: "남아" }]);
  const [currentCat, setCurrentCat] = useState("벨라");
  
  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => {
        window.removeEventListener('resize', updateVh);
        window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  // 탭 화면들 정의
  const renderTab0 = () => <div className="p-4 pt-10">오늘 케어 화면입니다.</div>;
  const renderTab1 = () => <div className="p-4 pt-10">종합 달력 화면입니다.</div>;
  const renderTab2 = () => <div className="p-4 pt-10">지출 관리 화면입니다.</div>;
  const renderTab3 = () => (
    <div className="p-4 pt-10">
       <label className="flex items-center gap-2 cursor-pointer p-4 bg-teal-500 text-white rounded-xl">
          <Icons.Camera /> 직접 촬영
          <input type="file" accept="image/*" onChange={(e) => alert("촬영/선택 완료!")} className="hidden" />
       </label>
    </div>
  );
  const renderTab4 = () => <div className="p-4 pt-10">휴지통 화면입니다.</div>;
  const renderTab5 = () => <div className="p-4 pt-10 text-xs">제작 과정입니다.</div>;

  const tabs = [renderTab0(), renderTab1(), renderTab2(), renderTab3(), renderTab4(), renderTab5()];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 select-none">
       {/* ★ 핵심: vh 단위로 화면 높이를 정확히 고정하여 아이폰 꽉 참 유지 */}
       <div className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900" 
            style={{ height: `calc(${vh}px * 100)` }}>
          
          <div className="flex-1 overflow-y-auto">{tabs[tabIdx]}</div>

          <div className="h-16 flex justify-around border-t bg-white">
            {['케어', '달력', '지출', '앨범', '휴지통', '제작'].map((label, idx) => (
              <button key={idx} onClick={() => setTabIdx(idx)} className="text-xs font-bold p-2">{label}</button>
            ))}
          </div>
       </div>
    </div>
  );
}
