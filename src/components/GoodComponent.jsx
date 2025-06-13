// src/components/GoodComponent.jsx - Day 6: Good Performance Example
import { useRef } from 'react';
import { useAuthStore } from '../store';

function GoodComponent() {
  // ใช้ useRef เพื่อนับจำนวนครั้งที่ component re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ✅ วิธีที่ดี: ใช้ selector เลือกเฉพาะ state ที่ต้องการ
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const userName = useAuthStore(state => state.userProfile?.name);

  return (
    <div style={{ 
      padding: '1rem', 
      border: '2px solid #4CAF50', 
      borderRadius: '8px',
      backgroundColor: '#f8fff8',
      margin: '1rem 0'
    }}>
      <h3>✅ Good Component (Selectors)</h3>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <p><strong>Login Status:</strong> {isLoggedIn ? '✅ Logged In' : '❌ Not Logged In'}</p>
          <p><strong>User:</strong> {userName || 'N/A'}</p>
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
        <strong>🚀 Performance Optimized:</strong><br />
        Component นี้ใช้ <code>useAuthStore(state =&gt; state.isLoggedIn)</code><br />
        จะ re-render เฉพาะเมื่อ <strong>isLoggedIn หรือ userName</strong> เปลี่ยนเท่านั้น!
      </div>
    </div>
  );
}

export default GoodComponent;
