import React, { useState, useEffect } from 'react';

const Icons = {
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Card: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  PhotoLibrary: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
};

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
       {/* 화면 꽉 참 고정 스타일 */}
       <div className="w-full sm:max-w-md bg-white overflow-hidden flex flex-col relative border-0 sm:border-8 border-gray-900" 
            style={{ height: `calc(${vh}px * 100)` }}>
          
          {/* 상단 노치 간섭 방지 pt-10 */}
          <div className="flex-1 overflow-y-auto pt-10">
            {tabIdx === 0 && <div className="p-4">오늘 케어 화면</div>}
            
            {/* 앨범 탭일 때 카메라 팝업 개방 */}
            {tabIdx === 3 && (
               <label className="flex items-center gap-2 cursor-pointer p-4 bg-teal-500 text-white rounded-xl font-bold">
                  <Icons.Camera /> 직접 촬영
                  {/* capture 속성을 제거하여 OS 기본 카메라 선택기 호출 */}
                  <input type="file" accept="image/*" onChange={(e) => {
                     const file = e.target.files[0];
                     if(file) alert("촬영/선택 완료! (이곳에 앨범 저장 로직을 연결하세요)");
                  }} className="hidden" />
               </label>
            )}
            
            {/* 탭 5: 제작 과정 */}
            {tabIdx === 5 && <div className="p-4 text-xs">아이폰 보안 체계로 인해 웹에서는 기본 렌즈만 가동됩니다. 안드로이드에서는 서드파티 카메라 앱 선택이 가능합니다.</div>}
          </div>

          {/* 하단 탭 메뉴 */}
          <div className="h-16 flex justify-around border-t bg-white">
            {['케어', '달력', '지출', '앨범', '휴지통', '제작'].map((label, idx) => (
              <button key={idx} onClick={() => setTabIdx(idx)} className="text-xs font-bold p-2">{label}</button>
            ))}
          </div>
       </div>
    </div>
  );
}
