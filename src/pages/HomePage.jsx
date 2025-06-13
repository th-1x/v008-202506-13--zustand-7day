// src/pages/HomePage.jsx - Day 1: ปูพื้นฐาน State และ Route
import { Link } from 'react-router-dom';
import { useCounterStore } from '../store';

function HomePage() {
  // ดึง state และ actions จาก Counter Store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>ยินดีต้อนรับสู่ Zustand Workshop Day 1!</p>

      <div style={{ margin: '2rem 0', padding: '1rem', border: '2px solid #646cff', borderRadius: '8px' }}>
        <h2>Counter: {count}</h2>
        <p>นี่คือ Global State ที่สร้างด้วย Zustand</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={increment}>เพิ่ม (+1)</button>
          <button onClick={decrement}>ลด (-1)</button>
          <button onClick={reset} style={{ backgroundColor: '#f44336' }}>รีเซ็ต</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🎯 สิ่งที่เราเรียนรู้ใน Day 1:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li><strong>React Router:</strong> ใช้ BrowserRouter, Routes, Route, Link</li>
          <li><strong>Zustand Store:</strong> สร้างด้วย create() และใช้ด้วย useStore</li>
          <li><strong>Global State:</strong> State ที่แชร์กันระหว่างหน้าต่างๆ</li>
          <li><strong>Actions:</strong> ฟังก์ชันเพื่อเปลี่ยนแปลง State</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p>
          <Link to="/about">
            <button>ไปหน้า About เพื่อทดสอบ Global State 🚀</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
