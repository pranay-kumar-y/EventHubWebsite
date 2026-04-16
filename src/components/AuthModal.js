import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

export default function AuthModal({ initialMode, onClose, notify }) {
  const { register, login } = useAuth();
  const [mode, setMode] = useState(initialMode || 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'));
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    setError('');

    // Validation
    if (mode === 'register' && name.trim() === '') {
      setError('Please enter your full name.');
      return;
    }
    if (email.trim() === '') {
      setError('Please enter your email address.');
      return;
    }
    if (password.trim() === '') {
      setError('Please enter your password.');
      return;
    }
    if (mode === 'register' && password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let result;

      if (mode === 'register') {
        result = register(name.trim(), email.trim(), password.trim(), role);
        if (result.success) {
          onClose();
          notify('Account created! Welcome to EventHub 🎉');
        } else {
          setError(result.error);
          setLoading(false);
        }
      } else {
        result = login(email.trim(), password.trim());
        if (result.success) {
          onClose();
          notify('Welcome back! 👋');
        } else {
          setError(result.error);
          setLoading(false);
        }
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="modal-sub">
          {mode === 'login'
            ? 'Sign in to your EventHub account'
            : 'Join EventHub today — free forever'}
        </p>

        {mode === 'register' && (
          <div className="role-section">
            <p className="role-label">I am a...</p>
            <div className="role-tabs">
              <button
                type="button"
                className={'role-tab' + (role === 'attendee' ? ' active' : '')}
                onClick={() => setRole('attendee')}
              >
                <span className="role-icon">🎫</span>
                <span className="role-name">Attendee</span>
                <span className="role-desc">Buy &amp; attend events</span>
              </button>
              <button
                type="button"
                className={'role-tab' + (role === 'organiser' ? ' active' : '')}
                onClick={() => setRole('organiser')}
              >
                <span className="role-icon">🎤</span>
                <span className="role-name">Organiser</span>
                <span className="role-desc">Create &amp; manage events</span>
              </button>
            </div>
          </div>
        )}

        {error !== '' && (
          <div className="alert alert-error">{error}</div>
        )}

        <div className="modal-fields">
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="John Smith"
                autoFocus
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              autoFocus={mode === 'login'}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In →' : 'Create Account →'
            )}
          </button>
        </div>

        <p className="modal-switch">
          {mode === 'login' ? (
            <>
              No account?{' '}
              <span className="switch-link" onClick={switchMode}>
                Sign up free
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="switch-link" onClick={switchMode}>
                Sign in
              </span>
            </>
          )}
        </p>

        {mode === 'login' && (
          <p className="modal-hint">
            💡 Don't have an account yet? Click "Sign up free" above to register first.
          </p>
        )}
      </div>
    </div>
  );
}
// Auth module
