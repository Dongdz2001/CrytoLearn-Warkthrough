import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();
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
          {user && (
            <li>
              <Link to="/profile" className={isActive('/profile')} onClick={() => setMenuOpen(false)}>
                👤 Hồ sơ
              </Link>
            </li>
          )}
          {user ? (

            <li className="user-profile-nav">
              <div className="user-info">
                <img src={user.photoURL} alt={user.displayName} className="user-avatar" title={user.displayName} />
                <button onClick={logout} className="logout-btn">Đăng xuất</button>
              </div>
            </li>
          ) : (
            <li>
              <button onClick={loginWithGoogle} className="login-btn">
                🔑 Đăng nhập Google
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

