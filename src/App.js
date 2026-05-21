import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>벨라와 로이의 냥이 케어 앱</h1>
      <p>오늘 밥 준 횟수: {count}번</p>
      <button onClick={() => setCount(count + 1)}>
        밥 줌!
      </button>
    </div>
  );
}
