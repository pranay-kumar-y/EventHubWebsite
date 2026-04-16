import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatCurrency } from '../utils/data';
import './Dashboard.css';

export default function Dashboard({ events, bookings }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalRevenue = events.reduce((a, e) =>
    a + e.tiers.reduce((b, t) => b + t.sold * t.price, 0), 0);
  const totalSold = events.reduce((a, e) =>
    a + e.tiers.reduce((b, t) => b + t.sold, 0), 0);

  return (
    <div className="page">
      <div className="page-header dash-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user && user.name}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          + Create Event
        </button>
      </div>

      <div className="stats-grid">
        {[
          { icon: '📅', val: events.length, label: 'Total Events', color: 'var(--accent)' },
          { icon: '🎫', val: totalSold, label: 'Tickets Sold', color: 'var(--accent2)' },
          { icon: '💷', val: formatCurrency(totalRevenue), label: 'Total Revenue', color: '#34D399' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section-title">My Events</div>
      <div className="dash-table">
        <div className="dash-table-head">
          <span>Event</span>
          <span>Date</span>
          <span>Sold</span>
          <span>Revenue</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {events.map((evt) => {
          const sold = evt.tiers.reduce((a, t) => a + t.sold, 0);
          const rev = evt.tiers.reduce((a, t) => a + t.sold * t.price, 0);
          return (
            <div key={evt.id} className="dash-table-row">
              <span className="dash-event-name">
                <span className="dash-emoji">{evt.image}</span>
                {evt.title}
              </span>
              <span>{formatDate(evt.date)}</span>
              <span>{sold} / {evt.capacity}</span>
              <span style={{ color: '#34D399', fontWeight: 600 }}>{formatCurrency(rev)}</span>
              <span><span className="badge badge-green">Published</span></span>
              <span>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/events/' + evt.id)}>
                  View
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
