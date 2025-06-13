// src/components/DisplayUsername.jsx - Day 6: Performance Testing Component
import { useRef } from 'react';
import { useAuthStore } from '../store';

function DisplayUsername() {
  // ใช้ useRef เพื่อนับจำนวนครั้งที่ component re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ❌ วิธีที่ไม่ดี: ใช้ทั้ง store (จะ re-render เมื่อ state ใดๆ เปลี่ยน)
  // const { userProfile } = useAuthStore();

  // ✅ วิธีที่ดี: ใช้ selector เลือกเฉพาะ state ที่ต้องการ
  // Component นี้จะ re-render เฉพาะเมื่อ userProfile เปลี่ยนเท่านั้น
  const userProfile = useAuthStore(state => state.userProfile);

  return (
    <div style={{ 
      padding: '1rem', 
      border: '2px solid #4CAF50', 
      borderRadius: '8px',
      backgroundColor: '#f8fff8',
      margin: '1rem 0'
    }}>
      <h3>👤 Display Username Component</h3>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <p><strong>ชื่อผู้ใช้:</strong> {userProfile?.name || 'ไม่ได้ล็อกอิน'}</p>
          <p><strong>อีเมล:</strong> {userProfile?.email || 'N/A'}</p>
        </div>
        <div style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          Re-renders: {renderCount.current}
        </div>
      </div>
      
      <div style={{ 
        fontSize: '0.9rem', 
        color: '#666',
        backgroundColor: '#f0f0f0',
        padding: '0.75rem',
        borderRadius: '4px'
      }}>
        <strong>🎯 Performance Test:</strong><br />
        Component นี้ใช้ <code>useAuthStore(state =&gt; state.userProfile)</code><br />
        จะ re-render เฉพาะเมื่อ <code>userProfile</code> เปลี่ยนเท่านั้น
      </div>
    </div>
  );
}

export default DisplayUsername;
