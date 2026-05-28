<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>오늘케어</title>
    <style>
        /* 기본 초기화 및 폰트 설정 */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #f0f2f5; color: #333; }
        
        /* 모바일 앱 컨테이너 (웹에서도 모바일 비율 유지) */
        .app-container { 
            max-width: 480px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            min-height: 100vh; 
            position: relative; 
            box-shadow: 0 0 20px rgba(0,0,0,0.05); 
        }

        /* 상단 헤더 */
        header { padding: 20px; text-align: center; border-bottom: 1px solid #f0f0f0; background-color: #fff; position: sticky; top: 0; z-index: 10; }
        header h1 { font-size: 18px; font-weight: 600; }

        /* 메인 컨텐츠 영역 */
        .content-area { padding: 20px; padding-bottom: 80px; /* 하단 메뉴 가림 방지 */ }
        .page { display: none; animation: fadeIn 0.3s ease-in-out; }
        .page.active { display: block; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* 카드 UI 스타일 */
        .card { background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .card h3 { font-size: 16px; margin-bottom: 15px; color: #1a1a1a; }

        /* 지출 입력 폼 스타일 */
        .input-group { margin-bottom: 15px; }
        .input-group label { display: block; font-size: 13px; color: #666; margin-bottom: 5px; }
        .input-group input[type="text"], .input-group input[type="number"] { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 15px; outline: none; }
        .input-group input:focus { border-color: #4CAF50; }
        
        /* 파일 업로드 및 미리보기 */
        .file-upload-wrapper { position: relative; width: 100%; border: 2px dashed #ddd; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer; margin-bottom: 10px; }
        .file-upload-wrapper input[type="file"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
        .file-upload-text { font-size: 14px; color: #888; }
        #image-preview { max-width: 100%; max-height: 200px; border-radius: 8px; display: none; margin-top: 10px; object-fit: cover; }

        /* 버튼 스타일 */
        .btn-submit { width: 100%; background-color: #4CAF50; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        .btn-submit:active { background-color: #45a049; }

        /* 지출 리스트 스타일 */
        .expense-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
        .expense-item:last-child { border-bottom: none; }
        .expense-info { display: flex; flex-direction: column; gap: 4px; }
        .expense-title { font-weight: 600; font-size: 15px; }
        .expense-date { font-size: 12px; color: #888; }
        .expense-amount { font-weight: bold; color: #e53935; }
        .expense-thumbnail { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; background: #eee; }

        /* 하단 고정 네비게이션 */
        nav { position: absolute; bottom: 0; width: 100%; background-color: #ffffff; border-top: 1px solid #eaeaea; display: flex; justify-content: space-around; align-items: center; height: 65px; z-index: 10; padding-bottom: env(safe-area-inset-bottom); }
        .nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none; color: #a0a0a0; font-size: 11px; width: 100%; height: 100%; cursor: pointer; }
        .nav-item span.icon { font-size: 20px; margin-bottom: 4px; }
        .nav-item.active { color: #222222; font-weight: 600; }
    </style>
</head>
<body>

<div class="app-container">
    <header>
        <h1 id="header-title">오늘케어 데이터 화면...</h1>
    </header>

    <div class="content-area">
        <div id="page-care" class="page active">
            <div class="card">
                <h3>오늘의 케어 기록</h3>
                <ul style="list-style: none;">
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">✅ 벨라 - 아침 식사 완료 (08:30)</li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">✅ 로이 - 화장실 청소 완료 (09:00)</li>
                    <li style="padding: 10px 0;">✅ 벨라, 로이 - 빗질 및 양치 (09:15)</li>
                </ul>
            </div>
        </div>

        <div id="page-calendar" class="page">
            <div class="card">
                <h3>일정 달력</h3>
                <p style="color: #666; font-size: 14px;">(달력 API 연동 영역)</p>
            </div>
        </div>

        <div id="page-expense" class="page">
            <div class="card">
                <h3>새 지출 등록</h3>
                <form id="expenseForm">
                    <div class="input-group">
                        <label>항목 내용</label>
                        <input type="text" id="itemName" placeholder="예: 청어오일 영양제" required>
                    </div>
                    <div class="input-group">
                        <label>결제 금액</label>
                        <input type="number" id="itemPrice" placeholder="숫자만 입력" required>
                    </div>
                    
                    <div class="input-group">
                        <label>영수증 / 구매 내역 캡처 (선택)</label>
                        <div class="file-upload-wrapper">
                            <span class="file-upload-text">📸 여기를 눌러 사진 첨부</span>
                            <input type="file" id="itemImage" accept="image/*">
                        </div>
                        <img id="image-preview" src="" alt="첨부 이미지 미리보기">
                    </div>
                    
                    <button type="submit" class="btn-submit">지출 내역 저장하기</button>
                </form>
            </div>

            <div class="card">
                <h3>최근 지출 내역</h3>
                <div id="expense-list-container">
                    <div class="expense-item">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <div style="width: 50px; height: 50px; background: #ddd; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #888;">사진없음</div>
                            <div class="expense-info">
                                <span class="expense-title">모래 3포대</span>
                                <span class="expense-date">2026. 05. 27</span>
                            </div>
                        </div>
                        <span class="expense-amount">45,000원</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="page-album" class="page"><div class="card"><h3>앨범 갤러리</h3><p style="color: #666; font-size: 14px;">사진이 표시될 영역입니다.</p></div></div>
        
        <div id="page-trash" class="page"><div class="card"><h3>휴지통</h3><p style="color: #666; font-size: 14px;">삭제된 데이터가 표시됩니다.</p></div></div>
        
        <div id="page-create" class="page"><div class="card"><h3>제작 / 설정</h3><p style="color: #666; font-size: 14px;">앱 설정 영역입니다.</p></div></div>
    </div>

    <nav>
        <div class="nav-item active" onclick="switchTab('care', '오늘케어 데이터 화면...', this)">
            <span class="icon">🐾</span><span>케어</span>
        </div>
        <div class="nav-item" onclick="switchTab('calendar', '달력', this)">
            <span class="icon">📅</span><span>달력</span>
        </div>
        <div class="nav-item" onclick="switchTab('expense', '지출 내역 관리', this)">
            <span class="icon">💸</span><span>지출</span>
        </div>
        <div class="nav-item" onclick="switchTab('album', '사진 앨범', this)">
            <span class="icon">🖼️</span><span>앨범</span>
        </div>
        <div class="nav-item" onclick="switchTab('trash', '휴지통', this)">
            <span class="icon">🗑️</span><span>휴지통</span>
        </div>
        <div class="nav-item" onclick="switchTab('create', '제작 및 설정', this)">
            <span class="icon">⚙️</span><span>제작</span>
        </div>
    </nav>
</div>

<script>
    // 1. 탭 전환 기능
    function switchTab(tabId, title, element) {
        // 모든 페이지 숨기기
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        // 선택한 페이지만 보이기
        document.getElementById('page-' + tabId).classList.add('active');
        
        // 상단 타이틀 변경
        document.getElementById('header-title').innerText = title;
        
        // 하단 메뉴 활성화 상태 변경
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
    }

    // 2. 이미지 미리보기 기능
    const imageInput = document.getElementById('itemImage');
    const imagePreview = document.getElementById('image-preview');
    let currentImageSrc = '';

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentImageSrc = e.target.result;
                imagePreview.src = currentImageSrc;
                imagePreview.style.display = 'block'; // 이미지 선택 시 화면에 표시
                document.querySelector('.file-upload-text').innerText = '✅ 사진 첨부 완료 (클릭 시 변경)';
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. 지출 내역 리스트에 동적 추가 기능
    const expenseForm = document.getElementById('expenseForm');
    const expenseListContainer = document.getElementById('expense-list-container');

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 기본 제출 방지 (새로고침 방지)

        const name = document.getElementById('itemName').value;
        const price = document.getElementById('itemPrice').value;
        
        // 현재 날짜 구하기
        const today = new Date();
        const dateString = `${today.getFullYear()}. ${(today.getMonth()+1).toString().padStart(2, '0')}. ${today.getDate().toString().padStart(2, '0')}`;

        // 금액 콤마 포맷팅
        const formattedPrice = Number(price).toLocaleString() + '원';

        // 이미지가 있으면 이미지 태그, 없으면 회색 빈 박스
        const thumbnailHtml = currentImageSrc 
            ? `<img src="${currentImageSrc}" class="expense-thumbnail">` 
            : `<div style="width: 50px; height: 50px; background: #ddd; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #888;">사진없음</div>`;

        // 새로운 리스트 아이템 HTML 생성
        const newExpenseHtml = `
            <div class="expense-item" style="animation: fadeIn 0.5s ease-in-out;">
                <div style="display: flex; gap: 15px; align-items: center;">
                    ${thumbnailHtml}
                    <div class="expense-info">
                        <span class="expense-title">${name}</span>
                        <span class="expense-date">${dateString}</span>
                    </div>
                </div>
                <span class="expense-amount">${formattedPrice}</span>
            </div>
        `;

        // 리스트 최상단에 추가
        expenseListContainer.insertAdjacentHTML('afterbegin', newExpenseHtml);

        // 폼 초기화
        expenseForm.reset();
        imagePreview.style.display = 'none';
        currentImageSrc = '';
        document.querySelector('.file-upload-text').innerText = '📸 여기를 눌러 사진 첨부';
    });
</script>

</body>
</html>
