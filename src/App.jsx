// src/App.jsx - Day 1: ปูพื้นฐาน State และ Route
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <div>
      {/* Navbar ง่ายๆ ด้วย Link components */}
      <nav>
        <Link to="/">🏠 Home</Link>
        <span> | </span>
        <Link to="/about">📖 About</Link>
      </nav>

      {/* Main content area */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;