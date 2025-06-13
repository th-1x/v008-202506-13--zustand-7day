// src/components/UpdateCounter.jsx - Day 6: Performance Testing Component
import { useRef } from 'react';
import { useCounterStore } from '../store';

function UpdateCounter() {
  // ใช้ useRef เพื่อนับจำนวนครั้งที่ component re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ❌ วิธีที่ไม่ดี: ใช้ทั้ง store
  // const { count, increment, decrement } = useCounterStore();

  // ✅ วิธีที่ดี: ใช้ selector เลือกเฉพาะสิ่งที่ต้องการ
  // Component นี้จะ re-render เฉพาะเมื่อ count เปลี่ยนเท่านั้น
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);

  return (
    <div style={{ 
      padding: '1rem', 
      border: '2px solid #2196F3', 
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
      margin: '1rem 0'
    }}>
      <h3>🔢 Update Counter Component</h3>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <p><strong>Counter Value:</strong> {count}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={increment}
              style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              +1
            </button>
            <button 
              onClick={decrement}
              style={{ 
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              -1
            </button>
          </div>
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
        <strong>🎯 Performance Test:</strong><br />
        Component นี้ใช้ <code>useCounterStore(state =&gt; state.count)</code><br />
        จะ re-render เฉพาะเมื่อ <code>count</code> เปลี่ยนเท่านั้น
      </div>
    </div>
  );
}

export default UpdateCounter;
