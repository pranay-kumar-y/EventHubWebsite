import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ openAuth }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate('/')}>🎟️ EventHub</div>
      <div className="nav-links">
        <button
          className={'btn btn-ghost' + (path === '/events' ? ' active' : '')}
          onClick={() => navigate('/events')}
        >
          Browse Events
        </button>

        {user ? (
          <>
            {user.role === 'organiser' && (
              <>
                <button
                  className={'btn btn-ghost' + (path === '/dashboard' ? ' active' : '')}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={'btn btn-ghost' + (path === '/create' ? ' active' : '')}
                  onClick={() => navigate('/create')}
                >
                  + Create
                </button>
                <button
                  className={'btn btn-ghost' + (path === '/scanner' ? ' active' : '')}
                  onClick={() => navigate('/scanner')}
                >
                  🔍 Scanner
                </button>
              </>
            )}
            {user.role === 'attendee' && (
              <button
                className={'btn btn-ghost' + (path === '/tickets' ? ' active' : '')}
                onClick={() => navigate('/tickets')}
              >
                My Tickets
              </button>
            )}
            <div className="nav-avatar" title={user.name}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="btn btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => openAuth('login')}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => openAuth('register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
// Navbar component
