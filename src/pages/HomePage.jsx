// src/pages/HomePage.jsx - Day 7: Mini Wishlist App
import { Link } from 'react-router-dom';
import { useCounterStore, useAuthStore, useProductStore, useWishlistStore } from '../store';
import TestButtons from '../components/TestButtons';
import IsolatedPerformanceTest from '../components/IsolatedPerformanceTest';

function HomePage() {
  // ✅ Day 6: ใช้ selector functions แทนการ destructure ทั้ง store
  // ดึง state และ actions จาก Counter Store (Day 1)
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const reset = useCounterStore(state => state.reset);

  // ดึง state จาก Auth Store (Day 2)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const userProfile = useAuthStore(state => state.userProfile);

  // ดึง state จาก Product Store (Day 3-4)
  const products = useProductStore(state => state.products);
  const loading = useProductStore(state => state.loading);
  const currentProduct = useProductStore(state => state.currentProduct);

  // ดึง state จาก Wishlist Store (Day 7)
  const wishlistCount = useWishlistStore(state => state.itemIds.length);

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>ยินดีต้อนรับสู่ Zustand Workshop Day 7!</p>

      {/* Day 6: Performance Demo */}
      <TestButtons />
      <IsolatedPerformanceTest />

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

      {/* Wishlist Store Status - Day 7 */}
      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        border: '2px solid #E91E63',
        borderRadius: '8px',
        backgroundColor: '#fce4ec'
      }}>
        <h2>💖 Mini Wishlist App (Day 7)</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div>
            <p><strong>สินค้าใน Wishlist:</strong> {wishlistCount} รายการ</p>
          </div>
          <div>
            <p><strong>สินค้าทั้งหมด:</strong> {products.length} รายการ</p>
          </div>
          <div>
            <p><strong>สถานะ:</strong> {loading ? '⏳ กำลังโหลด...' : '✅ พร้อมใช้งาน'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link to="/products">
            <button style={{ backgroundColor: '#FF9800' }}>
              🛍️ ดูสินค้าทั้งหมด
            </button>
          </Link>
          <Link to="/wishlist">
            <button style={{ backgroundColor: '#E91E63' }}>
              💖 ดู Wishlist ({wishlistCount})
            </button>
          </Link>
        </div>
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
        <h3>🎯 สิ่งที่เราเรียนรู้ใน Day 7:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>Wishlist Store:</strong> ใช้ persist + devtools สำหรับ wishlist</li>
          <li><strong>Protected Routes:</strong> Wishlist page ต้องล็อกอินก่อน</li>
          <li><strong>Product Filtering:</strong> แสดงเฉพาะสินค้าใน wishlist</li>
          <li><strong>Toggle Actions:</strong> เพิ่ม/ลบสินค้าจาก wishlist</li>
          <li><strong>UI Integration:</strong> แสดง count ใน navbar ด้วย selector</li>
          <li><strong>State Composition:</strong> ใช้ 4 stores ร่วมกัน (auth, product, counter, wishlist)</li>
        </ul>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
          <p><strong>💡 ทดสอบ Wishlist App:</strong></p>
          <ol style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>ล็อกอินเข้าระบบ</li>
            <li>ไปหน้า Products และเพิ่มสินค้าใน Wishlist</li>
            <li>ดู count ใน navbar เปลี่ยนแปลง</li>
            <li>กด F5 (Refresh) → Wishlist ยังคงอยู่!</li>
            <li>ไปหน้า Wishlist เพื่อดูสินค้าที่เลือก</li>
            <li>ลองลบสินค้าออกจาก Wishlist</li>
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
          <Link to="/wishlist">
            <button style={{ backgroundColor: '#E91E63' }}>💖 Wishlist ({wishlistCount})</button>
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
