import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🔐</span>
          <span className="logo-text">CryptoLearn</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>
              🏠 Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/game" className={isActive('/game')} onClick={() => setMenuOpen(false)}>
              🎮 Trò chơi
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
