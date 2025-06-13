// src/App.jsx - Day 2: การจัดการสถานะผู้ใช้ (Authentication Flow)
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, userProfile, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Navbar with Conditional Rendering based on Authentication */}
      <nav>
        <Link to="/">🏠 Home</Link>
        <span> | </span>
        <Link to="/about">📖 About</Link>
        <span> | </span>

        {isLoggedIn ? (
          <>
            <Link to="/profile">👤 Profile</Link>
            <span> | </span>
            <button
              onClick={handleLogout}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              🚪 Logout
            </button>
            <span style={{ marginLeft: '1rem', color: '#666' }}>
              สวัสดี, {userProfile?.name}!
            </span>
          </>
        ) : (
          <Link to="/login">🔐 Login</Link>
        )}
      </nav>

      {/* Main content area */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;