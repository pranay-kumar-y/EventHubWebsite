import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CAT_COLORS, formatDate, formatTime, formatCurrency } from '../utils/data';
import './EventDetail.css';

export default function EventDetail({ events, openAuth }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = events.find((e) => e.id === parseInt(id));
  const [selectedTier, setSelectedTier] = useState(null);
  const [qty, setQty] = useState(1);

  if (!event) {
    return (
      <div className="page">
        <div className="empty"><h3>Event not found</h3></div>
      </div>
    );
  }

  const color = CAT_COLORS[event.category] || '#7C6FFF';
  const tier = selectedTier || event.tiers.find((t) => t.sold < t.available);
  const total = tier ? tier.price * qty : 0;

  const handleBook = () => {
    if (!user) {
      openAuth('register');
      return;
    }
    navigate('/checkout', { state: { event, tier, qty, total } });
  };

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate('/events')}>← Back to Events</button>

      <div
        className="detail-hero"
        style={{ background: 'linear-gradient(135deg,' + color + '22,' + color + '44)' }}
      >
        <span className="detail-emoji">{event.image}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-left">
          <span
            className="cat-pill"
            style={{ background: color + '22', color: color, border: '1px solid ' + color + '44' }}
          >
            {event.category}
          </span>
          <h1>{event.title}</h1>
          <div className="detail-meta-box">
            <div className="meta-row"><span className="meta-icon">📅</span><div><div className="meta-lbl">Date &amp; Time</div><div>{formatDate(event.date)} at {formatTime(event.date)}</div></div></div>
            <div className="meta-row"><span className="meta-icon">📍</span><div><div className="meta-lbl">Venue</div><div>{event.venue}, {event.location}</div></div></div>
            <div className="meta-row"><span className="meta-icon">👥</span><div><div className="meta-lbl">Capacity</div><div>{event.capacity} total</div></div></div>
          </div>
          <h3 className="about-title">About this Event</h3>
          <p className="about-text">{event.description}</p>
        </div>

        <div className="ticket-panel">
          <h3>Select Tickets</h3>
          <div className="tier-list">
            {event.tiers.map((t) => {
              const soldOut = t.sold >= t.available;
              const isSelected = (selectedTier || event.tiers.find((x) => x.sold < x.available))?.id === t.id;
              return (
                <div
                  key={t.id}
                  className={'tier-option' + (isSelected ? ' selected' : '') + (soldOut ? ' sold-out' : '')}
                  onClick={() => !soldOut && setSelectedTier(t)}
                >
                  <div className="tier-left">
                    <span className="tier-name">{t.name}</span>
                    <span className="tier-rem">{soldOut ? 'SOLD OUT' : (t.available - t.sold) + ' remaining'}</span>
                  </div>
                  <span className="tier-price">{formatCurrency(t.price)}</span>
                </div>
              );
            })}
          </div>

          {tier && (
            <>
              <div className="qty-row">
                <span className="qty-label">Quantity</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span className="qty-val">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty((q) => Math.min(tier.available - tier.sold, q + 1))}>+</button>
                </div>
              </div>
              <div className="total-row">
                <span>Total</span>
                <span className="total-amt">{formatCurrency(total)}</span>
              </div>
              <button className="btn btn-primary btn-full" onClick={handleBook}>
                {user ? 'Book Now →' : 'Sign in to Book'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
