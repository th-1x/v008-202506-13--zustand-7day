// src/pages/LoginPage.jsx - Day 2: Authentication Flow
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useState } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState('john');

  // ถ้าล็อกอินแล้ว ให้ redirect ไปหน้า profile
  if (isLoggedIn) {
    navigate('/profile');
    return null;
  }

  // ข้อมูล user ปลอมๆ สำหรับทดสอบ
  const mockUsers = {
    john: { name: 'John Doe', email: 'john.doe@example.com', role: 'Developer' },
    jane: { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Designer' },
    admin: { name: 'Admin User', email: 'admin@example.com', role: 'Administrator' }
  };

  const handleLogin = () => {
    // 1. เลือกข้อมูล user ตาม selection
    const userProfile = mockUsers[selectedUser];

    // 2. เรียก action login เพื่ออัปเดต global state
    login(userProfile);

    // 3. ใช้ navigate เพื่อเปลี่ยนหน้าไป profile
    navigate('/profile');
  };

  return (
    <div>
      <h1>🔐 Login Page</h1>
      <p>ยินดีต้อนรับสู่ Day 2: Authentication Flow</p>

      <div style={{
        margin: '2rem 0',
        padding: '2rem',
        border: '2px solid #646cff',
        borderRadius: '8px',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3>เลือกผู้ใช้สำหรับทดสอบ:</h3>

        <div style={{ margin: '1rem 0', textAlign: 'left' }}>
          {Object.entries(mockUsers).map(([key, user]) => (
            <label key={key} style={{ display: 'block', margin: '0.5rem 0' }}>
              <input
                type="radio"
                name="user"
                value={key}
                checked={selectedUser === key}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>{user.name}</strong> ({user.role})
              <br />
              <small style={{ marginLeft: '1.5rem', color: '#666' }}>
                {user.email}
              </small>
            </label>
          ))}
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            backgroundColor: '#4CAF50',
            marginTop: '1rem'
          }}
        >
          🚀 เข้าสู่ระบบ
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🎯 สิ่งที่เกิดขึ้นเมื่อล็อกอิน:</h3>
        <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>เรียก <code>login(userProfile)</code> action</li>
          <li>อัปเดต Global State: <code>isLoggedIn = true</code></li>
          <li>เก็บข้อมูล user ใน <code>userProfile</code></li>
          <li>ใช้ <code>useNavigate</code> เปลี่ยนหน้าไป Profile</li>
          <li>Navbar จะเปลี่ยนแปลงตาม state ใหม่</li>
        </ol>
      </div>
    </div>
  );
}

export default LoginPage;