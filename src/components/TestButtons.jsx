// src/components/TestButtons.jsx - Day 6: Isolated Test Buttons
import { useAuthStore, useCounterStore } from '../store';

function TestButtons() {
  // Actions only - these don't cause re-renders
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const increment = useCounterStore(state => state.increment);
  
  // Only get the minimal state needed for button labels
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

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
      padding: '1rem', 
      border: '2px solid #9C27B0', 
      borderRadius: '8px',
      backgroundColor: '#f3e5f5',
      margin: '2rem 0',
      textAlign: 'center'
    }}>
      <h3>🎮 Test Controls</h3>
      <p>กดปุ่มเหล่านี้และดู re-render count ของ components ด้านล่าง</p>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '1rem'
      }}>
        <button 
          onClick={handleTestLogin}
          style={{ 
            backgroundColor: isLoggedIn ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
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
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🔢 Increment Counter
        </button>
      </div>
      
      <div style={{ 
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#666',
        backgroundColor: '#fff',
        padding: '0.75rem',
        borderRadius: '4px'
      }}>
        <strong>💡 Expected Behavior:</strong><br />
        • Login/Logout → Bad Component และ Good Component จะ re-render<br />
        • Increment Counter → เฉพาะ Counter Only Component จะ re-render
      </div>
    </div>
  );
}

export default TestButtons;
