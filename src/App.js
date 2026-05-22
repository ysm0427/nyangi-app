import React, { useState, useEffect } from 'react';

// [아이콘은 이전과 동일합니다 - 생략]
const Icons = { Close: () => <svg />, CheckSquare: () => <svg />, Calendar: () => <svg />, Card: () => <svg />, PhotoLibrary: () => <svg />, Trash: () => <svg />, Code: () => <svg />, Camera: () => <svg />, ChevronLeft: () => <svg />, Delete: () => <svg />, Edit: () => <svg />, Restore: () => <svg /> };

export default function App() {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [tabIdx, setTabIdx] = useState(0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight * 0.01);
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 select-none">
      <div className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900" 
           style={{ height: `calc(${vh}px * 100)` }}>
        
        {/* 카메라 간섭 방지 pt-10 */}
        <div className="flex-1 overflow-y-auto pt-10">
           {/* 데이터 로직은 이전 코드의 함수들을 그대로 사용하세요 */}
           {tabIdx === 3 && (
             <label className="flex items-center gap-2 cursor-pointer p-4 bg-teal-500 text-white rounded-xl">
                <Icons.Camera /> 직접 촬영
                <input type="file" accept="image/*" onChange={(e) => {
                   if(e.target.files[0]) alert("촬영 완료!");
                }} className="hidden" />
             </label>
           )}
        </div>

        {/* 하단 메뉴 */}
        <div className="h-16 flex justify-around border-t bg-white">
          {['케어', '달력', '지출', '앨범', '휴지통', '제작'].map((label, idx) => (
            <button key={idx} onClick={() => setTabIdx(idx)} className="text-xs font-bold p-2">{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
