import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const name = decoded.name || decoded.email || '';
        const init = name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .toUpperCase();
        setInitials(init);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, [token]);

  return (
    <nav className="navbar">
      <h1>📝 Task Manager</h1>

      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Dashboard</Link>
        {!token && (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>🔐 Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>🧾 Register</Link>
          </>
        )}
        {token && (
          <>
            <span className="user-initials">{initials}</span>
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;








