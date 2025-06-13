// src/components/PerformanceDemo.jsx - Day 6: Performance Demonstration
import { useRef } from 'react';
import { useAuthStore, useCounterStore } from '../store';
import BadComponent from './BadComponent';
import GoodComponent from './GoodComponent';
import CounterOnlyComponent from './CounterOnlyComponent';

function PerformanceDemo() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // ❌ วิธีที่ไม่ดี: ใช้ทั้ง store (component จะ re-render เมื่อ state ใดๆ เปลี่ยน)
  // const authStore = useAuthStore();
  // const counterStore = useCounterStore();
  // const productStore = useProductStore();

  // ✅ วิธีที่ดี: ใช้ selector เลือกเฉพาะสิ่งที่ต้องการ
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const count = useCounterStore(state => state.count);

  // Actions ที่ไม่ทำให้ component re-render
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const increment = useCounterStore(state => state.increment);

  const handleTestLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login({ 
        name: 'Test User', 
        email: 'test@example.com', 
        role: 'Tester' 
      });
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      border: '2px solid #FF9800', 
      borderRadius: '8px',
      backgroundColor: '#fff8e1',
      margin: '2rem 0'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>🚀 Performance Demo</h2>
        <div style={{ 
          backgroundColor: '#FF9800', 
          color: 'white', 
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          Parent Re-renders: {renderCount.current}
        </div>
      </div>

      {/* Current State Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div>
          <strong>🔐 Auth Status:</strong><br />
          {isLoggedIn ? '✅ Logged In' : '❌ Not Logged In'}
        </div>
        <div>
          <strong>🔢 Counter:</strong><br />
          {count}
        </div>
      </div>

      {/* Test Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={handleTestLogin}
          style={{ 
            backgroundColor: isLoggedIn ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoggedIn ? '🚪 Test Logout' : '🔐 Test Login'}
        </button>
        
        <button 
          onClick={increment}
          style={{ 
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔢 Increment Counter
        </button>
      </div>

      {/* Performance Comparison Components */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1rem'
      }}>
        <BadComponent />
        <GoodComponent />
      </div>

      {/* Counter-only Component */}
      <CounterOnlyComponent />

      {/* Instructions */}
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px'
      }}>
        <h3>🧪 การทดสอบ Performance:</h3>
        <ol style={{ textAlign: 'left', margin: '0.5rem 0' }}>
          <li><strong>กด "Test Login/Logout"</strong> → ดู re-render count ของแต่ละ component</li>
          <li><strong>สังเกต:</strong> Bad Component (❌) จะ re-render ทุกครั้ง</li>
          <li><strong>สังเกต:</strong> Good Component (✅) จะ re-render เฉพาะเมื่อ auth state เปลี่ยน</li>
          <li><strong>สังเกต:</strong> Counter Only Component (🔢) จะ<strong>ไม่</strong> re-render เมื่อ login/logout</li>
          <li><strong>กด "Increment Counter"</strong> → เฉพาะ Counter Only Component จะ re-render</li>
          <li><strong>เปิด Redux DevTools</strong> → ดู action ที่เกิดขึ้น</li>
        </ol>
        
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          <strong>💡 Best Practice:</strong> ใช้ selector functions แทนการ destructure ทั้ง store 
          เพื่อหลีกเลี่ยง unnecessary re-renders
        </div>
      </div>
    </div>
  );
}

export default PerformanceDemo;
