import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import './Home.css';

export default function Home({ events, openAuth }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">🟢 Now live — 2026 season events</div>
          <h1>Discover &amp; Book<br /><span className="hero-gradient">Events You'll Love</span></h1>
          <p className="hero-sub">
            Browse events, buy tickets securely, and enter with your personal QR code.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/events')}>
              Browse Events →
            </button>
            {!user && (
              <button className="btn btn-secondary btn-lg" onClick={() => openAuth('register')}>
                Create Account
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured-inner">
          <div className="section-title">
            <span>Featured Events</span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/events')}>
              View all →
            </button>
          </div>
          <div className="events-grid">
            {events.slice(0, 3).map((evt) => (
              <EventCard key={evt.id} evt={evt} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
// Home page
