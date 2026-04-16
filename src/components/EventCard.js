import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CAT_COLORS, formatDate, formatCurrency } from '../utils/data';
import './EventCard.css';

export default function EventCard({ evt }) {
  const navigate = useNavigate();
  const color = CAT_COLORS[evt.category] || '#7C6FFF';
  const minPrice = Math.min(...evt.tiers.map((t) => t.price));
  const totalSold = evt.tiers.reduce((a, t) => a + t.sold, 0);
  const pct = Math.round((totalSold / evt.capacity) * 100);

  return (
    <div className="event-card" onClick={() => navigate('/events/' + evt.id)}>
      <div
        className="event-card-hero"
        style={{ background: 'linear-gradient(135deg,' + color + '22,' + color + '44)' }}
      >
        <span className="event-emoji">{evt.image}</span>
        <span
          className="cat-badge"
          style={{ background: color + '22', color: color, border: '1px solid ' + color + '55' }}
        >
          {evt.category}
        </span>
      </div>
      <div className="event-card-body">
        <h3>{evt.title}</h3>
        <p className="event-meta">📅 {formatDate(evt.date)}</p>
        <p className="event-meta">📍 {evt.venue}, {evt.location}</p>
        <div className="event-sold">
          <div className="sold-row">
            <span>{totalSold} / {evt.capacity} sold</span>
            <span style={{ color: pct > 80 ? 'var(--danger)' : 'var(--muted)' }}>{pct}%</span>
          </div>
          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: pct + '%',
                background: pct > 80 ? 'var(--danger)' : pct > 50 ? 'var(--warning)' : 'var(--accent)'
              }}
            />
          </div>
        </div>
        <div className="event-footer">
          <span className="event-price">from {formatCurrency(minPrice)}</span>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>
      </div>
    </div>
  );
}
