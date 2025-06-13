// src/components/CounterOnlyComponent.jsx - Day 6: Counter-only Performance Test
import { useRef } from 'react';
import { useCounterStore } from '../store';

function CounterOnlyComponent() {
  // ใช้ useRef เพื่อนับจำนวนครั้งที่ component re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ✅ เลือกเฉพาะ count จาก counterStore
  const count = useCounterStore(state => state.count);

  return (
    <div style={{ 
      padding: '1rem', 
      border: '2px solid #2196F3', 
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
      margin: '1rem 0'
    }}>
      <h3>🔢 Counter Only Component</h3>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <p><strong>Counter Value:</strong> {count}</p>
          <p><strong>Listens to:</strong> Counter Store only</p>
        </div>
        <div style={{ 
          backgroundColor: '#2196F3', 
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
        <strong>🎯 Test:</strong><br />
        Component นี้จะ re-render เฉพาะเมื่อ <strong>counter</strong> เปลี่ยน<br />
        การ login/logout จะ<strong>ไม่</strong>ทำให้ component นี้ re-render!
      </div>
    </div>
  );
}

export default CounterOnlyComponent;
