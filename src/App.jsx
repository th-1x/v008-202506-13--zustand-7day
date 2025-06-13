// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

import { useAuthStore } from './zudtand/store';

function App() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{' '}
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link> |{' '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;