// src/pages/AboutPage.jsx
import { useCounterStore } from '../store';

function AboutPage() {
  // ดึง state และ actions จาก Counter Store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h1>About Page</h1>
      <p>นี่คือหน้า About ที่แสดงการใช้งาน Global State</p>
      
      <div style={{ margin: '2rem 0', padding: '1rem', border: '2px solid #646cff', borderRadius: '8px' }}>
        <h2>Counter: {count}</h2>
        <p>ค่า Counter นี้เป็น Global State ที่แชร์กันระหว่างหน้า Home และ About</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={increment}>เพิ่ม (+1)</button>
          <button onClick={decrement}>ลด (-1)</button>
          <button onClick={reset} style={{ backgroundColor: '#f44336' }}>รีเซ็ต</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🎯 ทดสอบ Global State:</h3>
        <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>กดปุ่มเพิ่มค่าที่หน้านี้</li>
          <li>ไปที่หน้า Home</li>
          <li>ดูว่าค่า Counter ยังคงเดิมหรือไม่</li>
          <li>กลับมาหน้า About อีกครั้ง</li>
          <li>ค่า Counter ควรจะเป็นค่าเดิมที่เราเพิ่มไว้</li>
        </ol>
        <p><strong>นี่คือหัวใจของ Global State! 🚀</strong></p>
      </div>
    </div>
  );
}

export default AboutPage;
