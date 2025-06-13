// src/pages/HomePage.jsx - Day 3: Async Actions
import { Link } from 'react-router-dom';
import { useCounterStore, useAuthStore, useProductStore } from '../store';

function HomePage() {
  // ดึง state และ actions จาก Counter Store (Day 1)
  const { count, increment, decrement, reset } = useCounterStore();

  // ดึง state จาก Auth Store (Day 2)
  const { isLoggedIn, userProfile } = useAuthStore();

  // ดึง state จาก Product Store (Day 3)
  const { products, loading } = useProductStore();

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>ยินดีต้อนรับสู่ Zustand Workshop Day 3!</p>

      {/* Authentication Status Display */}
      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        border: `2px solid ${isLoggedIn ? '#4CAF50' : '#f44336'}`,
        borderRadius: '8px',
        backgroundColor: isLoggedIn ? '#f8fff8' : '#fff8f8'
      }}>
        <h2>🔐 สถานะการล็อกอิน</h2>
        {isLoggedIn ? (
          <div>
            <p style={{ color: '#4CAF50' }}>✅ ล็อกอินแล้ว</p>
            <p>สวัสดี, <strong>{userProfile?.name}</strong>!</p>
            <p>ตำแหน่ง: {userProfile?.role}</p>
            <Link to="/profile">
              <button style={{ backgroundColor: '#4CAF50' }}>
                ไปหน้าโปรไฟล์ 👤
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <p style={{ color: '#f44336' }}>❌ ยังไม่ได้ล็อกอิน</p>
            <p>กรุณาล็อกอินเพื่อเข้าถึงฟีเจอร์เพิ่มเติม</p>
            <Link to="/login">
              <button style={{ backgroundColor: '#2196F3' }}>
                เข้าสู่ระบบ 🔐
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Counter from Day 1 */}
      <div style={{ margin: '2rem 0', padding: '1rem', border: '2px solid #646cff', borderRadius: '8px' }}>
        <h2>Counter: {count}</h2>
        <p>Global State จาก Day 1 (ยังคงทำงานได้!)</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={increment}>เพิ่ม (+1)</button>
          <button onClick={decrement}>ลด (-1)</button>
          <button onClick={reset} style={{ backgroundColor: '#f44336' }}>รีเซ็ต</button>
        </div>
      </div>

      {/* Product Store Status - Day 3 */}
      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        border: '2px solid #FF9800',
        borderRadius: '8px',
        backgroundColor: '#fff8e1'
      }}>
        <h2>🛍️ สถานะสินค้า (Day 3)</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div>
            <p><strong>จำนวนสินค้า:</strong> {products.length} รายการ</p>
          </div>
          <div>
            <p><strong>สถานะ:</strong> {loading ? '⏳ กำลังโหลด...' : '✅ พร้อมใช้งาน'}</p>
          </div>
        </div>
        <Link to="/products">
          <button style={{ backgroundColor: '#FF9800', marginTop: '1rem' }}>
            🛍️ ดูสินค้าทั้งหมด
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🎯 สิ่งที่เราเรียนรู้ใน Day 3:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>Async Actions:</strong> การสร้าง action ที่ทำงานแบบ asynchronous</li>
          <li><strong>Loading State:</strong> จัดการสถานะการโหลดข้อมูล</li>
          <li><strong>Error Handling:</strong> จัดการข้อผิดพลาดจาก API</li>
          <li><strong>API Integration:</strong> ดึงข้อมูลจาก External API</li>
          <li><strong>useEffect:</strong> เรียก async action เมื่อ component โหลด</li>
          <li><strong>Multiple Stores:</strong> ใช้ 3 stores ร่วมกัน (Counter, Auth, Product)</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/about">
            <button>📖 ไปหน้า About</button>
          </Link>
          <Link to="/products">
            <button style={{ backgroundColor: '#FF9800' }}>🛍️ ดูสินค้า</button>
          </Link>
          {!isLoggedIn && (
            <Link to="/login">
              <button style={{ backgroundColor: '#2196F3' }}>🔐 ล็อกอิน</button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/profile">
              <button style={{ backgroundColor: '#4CAF50' }}>👤 โปรไฟล์</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
