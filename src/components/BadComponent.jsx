// src/components/BadComponent.jsx - Day 6: Bad Performance Example
import { useRef } from 'react';
import { useAuthStore } from '../store';

function BadComponent() {
  // ใช้ useRef เพื่อนับจำนวนครั้งที่ component re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ❌ วิธีที่ไม่ดี: ใช้ทั้ง store (จะ re-render เมื่อ state ใดๆ เปลี่ยน)
  const { isLoggedIn, userProfile } = useAuthStore();

  return (
    <div style={{ 
      padding: '1rem', 
      border: '2px solid #f44336', 
      borderRadius: '8px',
      backgroundColor: '#fff8f8',
      margin: '1rem 0'
    }}>
      <h3>❌ Bad Component (Destructuring)</h3>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <p><strong>Login Status:</strong> {isLoggedIn ? '✅ Logged In' : '❌ Not Logged In'}</p>
          <p><strong>User:</strong> {userProfile?.name || 'N/A'}</p>
        </div>
        <div style={{ 
          backgroundColor: '#f44336', 
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
        <strong>⚠️ Performance Issue:</strong><br />
        Component นี้ใช้ <code>const &#123; isLoggedIn, userProfile &#125; = useAuthStore()</code><br />
        จะ re-render เมื่อ <strong>state ใดๆ</strong> ใน authStore เปลี่ยน!
      </div>
    </div>
  );
}

export default BadComponent;
