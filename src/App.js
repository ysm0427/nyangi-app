<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>오늘케어</title>
    <style>
        /* [1] 기본 초기화 및 폰트 */
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif; }
        body { background-color: #f4f5f7; color: #333; display: flex; justify-content: center; }
        
        /* [2] 모바일 앱 컨테이너 */
        #app-container { width: 100%; max-width: 480px; background-color: #ffffff; min-height: 100vh; position: relative; display: flex; flex-direction: column; box-shadow: 0 0 20px rgba(0,0,0,0.05); }

        /* [3] 상단 헤더 */
        header { background: #fff; padding: 20px; text-align: center; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 100; }
        header h1 { font-size: 18px; font-weight: 700; color: #2c3e50; }

        /* [4] 메인 콘텐츠 영역 (스크롤) */
        main { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: 90px; }
        .tab-content { display: none; animation: fadeIn 0.3s ease; }
        .tab-content.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* [5] 카드 UI (벨라, 로이 케어 및 지출 폼) */
        .card { background: #fff; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid #eaeaea; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .card-title { font-size: 18px; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        
        /* 체크리스트 스타일 */
        .check-list { list-style: none; }
        .check-list li { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
        .check-list li:last-child { border-bottom: none; padding-bottom: 0; }
        .check-list input[type="checkbox"] { width: 20px; height: 20px; margin-right: 12px; accent-color: #4CAF50; cursor: pointer; }

        /* [6] 지출 관리 스타일 */
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; font-weight: 500; }
        .form-group input[type="text"], .form-group input[type="number"] { width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; outline: none; transition: border 0.2s; }
        .form-group input:focus { border-color: #2ecc71; }
        
        /* 사진 업로드 영역 */
        .upload-box { border: 2px dashed #dcdde1; border-radius: 10px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer; position: relative; transition: all 0.2s; }
        .upload-box:hover { background: #f0f0f0; }
        .upload-box input[type="file"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
        #preview-img { max-width: 100%; height: auto; max-height: 150px; border-radius: 8px; margin-top: 10px; display: none; object-fit: cover; }
        
        .submit-btn { width: 100%; background: #2c3e50; color: #fff; border: none; padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
        .submit-btn:active { background: #1a252f; }

        /* 지출 내역 리스트 */
        .expense-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
        .expense-left { display: flex; align-items: center; gap: 12px; }
        .expense-thumb { width: 48px; height: 48px; background: #eee; border-radius: 8px; object-fit: cover; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #999; }
        .expense-info h4 { font-size: 15px; margin-bottom: 4px; color: #333; }
        .expense-info p { font-size: 12px; color: #888; }
        .expense-amount { font-weight: 700; color: #e74c3c; font-size: 16px; }

        /* [7] 하단 네비게이션 바 */
        nav { position: absolute; bottom: 0; width: 100%; background: #fff; border-top: 1px solid #eaeaea; display: flex; justify-content: space-around; padding: 10px 0; padding-bottom: env(safe-area-inset-bottom, 10px); z-index: 100; }
        .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #a4b0be; cursor: pointer; font-size: 11px; font-weight: 500; flex: 1; }
        .nav-btn svg { width: 24px; height: 24px; fill: currentColor; }
        .nav-btn.active { color: #2ecc71; }
    </style>
</head>
<body>

<div id="app-container">
    <header>
        <h1 id="header-title">오늘의 케어</h1>
    </header>

    <main>
        <div id="tab-care" class="tab-content active">
            <div class="card">
                <div class="card-title">👑 벨라</div>
                <ul class="check-list">
                    <li><input type="checkbox"> 아침 식사 챙겨주기</li>
                    <li><input type="checkbox"> 빗질 10분 해주기</li>
                    <li><input type="checkbox"> 화장실 모래 정리</li>
                </ul>
            </div>
            
            <div class="card">
                <div class="card-title">🍼 로이</div>
                <ul class="check-list">
                    <li><input type="checkbox"> 아침 식사 챙겨주기</li>
                    <li><input type="checkbox"> 영양제 먹이기</li>
                    <li><input type="checkbox"> 장난감 사냥놀이</li>
                </ul>
            </div>
        </div>

        <div id="tab-calendar" class="tab-content">
            <div class="card"><h3>달력 및 일정</h3><p style="color:#777; margin-top:10px;">일정 관리 기능이 들어갈 자리입니다.</p></div>
        </div>

        <div id="tab-expense" class="tab-content">
            <div class="card">
                <div class="card-title">🧾 새로운 지출 등록</div>
                <form id="expense-form">
                    <div class="form-group">
                        <label>구매 항목</label>
                        <input type="text" id="exp-name" placeholder="예) 로이 사료, 벨라 간식" required>
                    </div>
                    <div class="form-group">
                        <label>결제 금액</label>
                        <input type="number" id="exp-price" placeholder="금액을 숫자로 입력" required>
                    </div>
                    <div class="form-group">
                        <label>영수증 및 구매 인증 샷 (선택)</label>
                        <div class="upload-box">
                            <span id="upload-text">📸 여기를 눌러 사진을 첨부하세요</span>
                            <input type="file" id="exp-img" accept="image/*">
                            <img id="preview-img" src="" alt="미리보기">
                        </div>
                    </div>
                    <button type="submit" class="submit-btn">지출 내역 저장</button>
                </form>
            </div>

            <div class="card">
                <div class="card-title">최근 지출 내역</div>
                <div id="expense-list">
                    <div class="expense-item">
                        <div class="expense-left">
                            <div class="expense-thumb">NO IMG</div>
                            <div class="expense-info">
                                <h4>고양이 모래 3세트</h4>
                                <p>2026. 05. 28</p>
                            </div>
                        </div>
                        <div class="expense-amount">45,000원</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="tab-album" class="tab-content"><div class="card"><h3>앨범</h3></div></div>
        
        <div id="tab-trash" class="tab-content"><div class="card"><h3>휴지통</h3></div></div>
        
        <div id="tab-create" class="tab-content"><div class="card"><h3>제작/설정</h3></div></div>
    </main>

    <nav>
        <button class="nav-btn active" onclick="switchTab('care', '오늘의 케어', this)">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span>케어</span>
        </button>
        <button class="nav-btn" onclick="switchTab('calendar', '달력 관리', this)">
            <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
            <span>달력</span>
        </button>
        <button class="nav-btn" onclick="switchTab('expense', '지출 내역', this)">
            <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            <span>지출</span>
        </button>
        <button class="nav-btn" onclick="switchTab('album', '사진 앨범', this)">
            <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            <span>앨범</span>
        </button>
        <button class="nav-btn" onclick="switchTab('trash', '휴지통', this)">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>휴지통</span>
        </button>
        <button class="nav-btn" onclick="switchTab('create', '제작 및 설정', this)">
            <svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
            <span>제작</span>
        </button>
    </nav>
</div>

<script>
    // 탭 전환 로직
    function switchTab(tabId, title, btnElement) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById('tab-' + tabId).classList.add('active');
        
        document.getElementById('header-title').innerText = title;
        
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    // 사진 미리보기 로직
    const fileInput = document.getElementById('exp-img');
    const previewImg = document.getElementById('preview-img');
    const uploadText = document.getElementById('upload-text');
    let currentImageBase64 = '';

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                currentImageBase64 = event.target.result;
                previewImg.src = currentImageBase64;
                previewImg.style.display = 'block';
                uploadText.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // 지출 내역 리스트 추가 로직
    const form = document.getElementById('expense-form');
    const list = document.getElementById('expense-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('exp-name').value;
        const price = document.getElementById('exp-price').value;
        
        // 날짜 포맷 (YYYY. MM. DD)
        const d = new Date();
        const dateStr = `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')}`;
        
        // 금액 포맷
        const formattedPrice = Number(price).toLocaleString() + '원';

        // 이미지 처리
        const thumbHtml = currentImageBase64 
            ? `<img src="${currentImageBase64}" class="expense-thumb" alt="영수증">`
            : `<div class="expense-thumb">NO IMG</div>`;

        // 새 항목 HTML 생성
        const newItem = document.createElement('div');
        newItem.className = 'expense-item';
        newItem.innerHTML = `
            <div class="expense-left">
                ${thumbHtml}
                <div class="expense-info">
                    <h4>${name}</h4>
                    <p>${dateStr}</p>
                </div>
            </div>
            <div class="expense-amount">${formattedPrice}</div>
        `;

        // 리스트 맨 위에 추가
        list.prepend(newItem);

        // 폼 초기화
        form.reset();
        previewImg.style.display = 'none';
        uploadText.style.display = 'block';
        currentImageBase64 = '';
    });
</script>

</body>
</html>
