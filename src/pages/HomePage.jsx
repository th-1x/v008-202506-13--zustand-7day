// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../zudtand/store';

function HomePage() {
  const { isLoggedIn, userProfile  } = useAuthStore();

  return (
    <div>
      <h1>Welcome to Our App</h1>
      
      {isLoggedIn ? (
        <div>
          <h2>Hello, {userProfile?.name || 'User'}!</h2>
          <p>Welcome back to your dashboard.</p>
          <div>
            <Link to="/profile">
              <button>Go to Profile</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2>Get Started</h2>
          <p>Please log in to access all features of our application.</p>
          <div>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Features</h3>
        <ul>
          <li>User Authentication with Zustand</li>
          <li>Profile Management</li>
          <li>React Router Navigation</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
