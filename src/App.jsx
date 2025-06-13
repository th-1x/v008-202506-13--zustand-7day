// src/App.jsx - Day 7: Mini Wishlist App
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import { useAuthStore, useWishlistStore } from './store';
import './App.css';

function App() {
  const navigate = useNavigate();

  // ✅ Day 7: ใช้ selector functions แทนการ destructure ทั้ง store
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const userProfile = useAuthStore(state => state.userProfile);
  const logout = useAuthStore(state => state.logout);

  // Day 7: Wishlist count for navbar
  const wishlistCount = useWishlistStore(state => state.itemIds.length);

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
        <Link to="/products">🛍️ Products</Link>
        <span> | </span>
        <Link to="/wishlist" style={{ position: 'relative' }}>
          💖 Wishlist
          {wishlistCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {wishlistCount}
            </span>
          )}
        </Link>
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;