// src/pages/HomePage.jsx - Day 5: Middleware
import { Link } from 'react-router-dom';
import { useCounterStore, useAuthStore, useProductStore } from '../store';

function HomePage() {
  // ดึง state และ actions จาก Counter Store (Day 1)
  const { count, increment, decrement, reset } = useCounterStore();

  // ดึง state จาก Auth Store (Day 2)
  const { isLoggedIn, userProfile } = useAuthStore();

  // ดึง state จาก Product Store (Day 3-4)
  const { products, loading, currentProduct } = useProductStore();

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>ยินดีต้อนรับสู่ Zustand Workshop Day 5!</p>

      {/* Day 5: Middleware Information */}
      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        border: '2px solid #9C27B0',
        borderRadius: '8px',
        backgroundColor: '#f3e5f5'
      }}>
        <h2>🔧 Day 5: Middleware Features</h2>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <h3>🛠️ Redux DevTools:</h3>
          <ul>
            <li>เปิด Browser DevTools (F12)</li>
            <li>ไปที่แท็บ "Redux"</li>
            <li>ดู state และ actions ของทุก store</li>
            <li>ลองกดปุ่มต่างๆ และดู action ใน DevTools</li>
          </ul>

          <h3>💾 Persist (Auth Store):</h3>
          <ul>
            <li>ล็อกอินแล้วกด Refresh หน้า → ยังล็อกอินอยู่!</li>
            <li>ข้อมูลเก็บใน localStorage</li>
            <li>เปิด DevTools → Application → Local Storage</li>
            <li>ดู key "auth-storage"</li>
          </ul>
        </div>
      </div>

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

      {/* Current Product Display - Day 4 */}
      {currentProduct && (
        <div style={{
          margin: '2rem 0',
          padding: '1rem',
          border: '2px solid #9C27B0',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <h2>📦 สินค้าที่กำลังดู</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{currentProduct.title}</h4>
              <p style={{ margin: 0, color: '#666' }}>${currentProduct.price}</p>
            </div>
          </div>
          <Link to={`/products/${currentProduct.id}`}>
            <button style={{ backgroundColor: '#9C27B0', marginTop: '1rem' }}>
              📦 ดูรายละเอียดเต็ม
            </button>
          </Link>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>🎯 สิ่งที่เราเรียนรู้ใน Day 5:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>devtools Middleware:</strong> เชื่อมต่อกับ Redux DevTools</li>
          <li><strong>persist Middleware:</strong> บันทึก state ใน localStorage</li>
          <li><strong>Action Names:</strong> ตั้งชื่อ action สำหรับ debugging</li>
          <li><strong>Middleware Composition:</strong> ใช้หลาย middleware ร่วมกัน</li>
          <li><strong>Partialize:</strong> เลือกเฉพาะ state ที่ต้องการ persist</li>
          <li><strong>Storage Key:</strong> กำหนดชื่อ key ใน localStorage</li>
        </ul>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
          <p><strong>💡 ทดสอบ Middleware:</strong></p>
          <ol style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>เปิด Redux DevTools และดู state changes</li>
            <li>ล็อกอินแล้วกด F5 (Refresh) → ยังล็อกอินอยู่!</li>
            <li>ดู localStorage ใน DevTools</li>
          </ol>
        </div>
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
