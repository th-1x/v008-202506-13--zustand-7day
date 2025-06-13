// src/components/IsolatedPerformanceTest.jsx - Day 6: Isolated Performance Test
import BadComponent from './BadComponent';
import GoodComponent from './GoodComponent';
import CounterOnlyComponent from './CounterOnlyComponent';

function IsolatedPerformanceTest() {
  // This component has NO state subscriptions
  // It will NOT re-render when stores change
  // Only its children will re-render based on their own selectors

  return (
    <div style={{ 
      padding: '2rem', 
      border: '2px solid #FF9800', 
      borderRadius: '8px',
      backgroundColor: '#fff8e1',
      margin: '2rem 0'
    }}>
      <h2>🧪 Performance Test Components</h2>
      <p>Components ด้านล่างจะ re-render ตามการใช้ selector ของแต่ละตัว</p>
      
      {/* Performance Comparison Components */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1rem',
        marginTop: '2rem'
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
        <h3>🎯 การทดสอบ:</h3>
        <ol style={{ textAlign: 'left', margin: '0.5rem 0' }}>
          <li><strong>กด "Test Login/Logout"</strong> ด้านบน</li>
          <li><strong>สังเกต:</strong> Bad Component (❌) และ Good Component (✅) จะ re-render</li>
          <li><strong>สังเกต:</strong> Counter Only Component (🔢) จะ<strong>ไม่</strong> re-render</li>
          <li><strong>กด "Increment Counter"</strong> ด้านบน</li>
          <li><strong>สังเกต:</strong> เฉพาะ Counter Only Component (🔢) จะ re-render</li>
          <li><strong>สังเกต:</strong> Bad และ Good Component จะ<strong>ไม่</strong> re-render</li>
        </ol>
        
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          <strong>🔑 Key Point:</strong> Component นี้ (IsolatedPerformanceTest) ไม่มี state subscriptions 
          ดังนั้นจะไม่ re-render และไม่ทำให้ children re-render โดยไม่จำเป็น
        </div>
      </div>
    </div>
  );
}

export default IsolatedPerformanceTest;
