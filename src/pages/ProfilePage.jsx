// src/pages/ProfilePage.jsx - Day 2: Protected Route
import { useAuthStore } from "../store";
import { Navigate, Link } from "react-router-dom";

function ProfilePage() {
  const { isLoggedIn, userProfile } = useAuthStore();

  // Protected Route: ถ้ายังไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>👤 Profile Page</h1>
      <p>ยินดีต้อนรับสู่หน้าโปรไฟล์ของคุณ!</p>

      <div style={{
        margin: '2rem 0',
        padding: '2rem',
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        backgroundColor: '#f8fff8'
      }}>
        <h2>ข้อมูลผู้ใช้</h2>
        <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
          <p><strong>ชื่อ:</strong> {userProfile?.name}</p>
          <p><strong>อีเมล:</strong> {userProfile?.email}</p>
          <p><strong>ตำแหน่ง:</strong> {userProfile?.role}</p>
          <p><strong>สถานะ:</strong> <span style={{ color: '#4CAF50' }}>✅ ล็อกอินแล้ว</span></p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🛡️ Protected Route คืออะไร?</h3>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <p>หน้านี้เป็น <strong>Protected Route</strong> ที่มีการป้องกันการเข้าถึง:</p>
          <ul>
            <li>เช็ค <code>isLoggedIn</code> จาก Global State</li>
            <li>ถ้า <code>false</code> จะ redirect ไปหน้า Login ทันที</li>
            <li>ใช้ <code>&lt;Navigate to="/login" replace /&gt;</code></li>
            <li>ป้องกันไม่ให้ผู้ใช้ที่ไม่ได้ล็อกอินเข้าถึงข้อมูลสำคัญ</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🧪 ทดสอบ Protected Route:</h3>
        <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>กด Logout ใน Navbar</li>
          <li>พยายามเข้า URL <code>/profile</code> โดยตรง</li>
          <li>ระบบจะเด้งคุณไปหน้า Login ทันที</li>
          <li>ล็อกอินใหม่แล้วกลับมาหน้านี้</li>
        </ol>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/">
          <button>🏠 กลับหน้าแรก</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
