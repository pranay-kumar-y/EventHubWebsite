import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatCurrency } from '../utils/data';
import './MyTickets.css';

function QRPattern({ token }) {
  const seed = token.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: 100 }, (_, i) => ((seed * (i + 1) * 31 + i * 17) % 100) < 45);
  return (
    <div className="qr-grid">
      {cells.map((filled, i) => (
        <div key={i} style={{ background: filled ? '#000' : '#fff', borderRadius: '1px' }} />
      ))}
    </div>
  );
}

export default function MyTickets({ bookings }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Tickets</h1>
        <p>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">🎫</span>
          <h3>No tickets yet</h3>
          <p>Browse events and book your first ticket!</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/events')}>
            Browse Events
          </button>
        </div>
      ) : (
        <div className="tickets-list">
          {bookings.map((b) => (
            <div key={b.id} className="ticket-row" onClick={() => setSelected(b)}>
              <div className="ticket-emoji" style={{ background: b.event.color + '22' }}>
                {b.event.image}
              </div>
              <div className="ticket-info">
                <h4>{b.event.title}</h4>
                <p>📅 {formatDate(b.event.date)}</p>
                <p>📍 {b.event.venue}</p>
                <p>🎫 {b.tier.name} × {b.qty}</p>
              </div>
              <div className="ticket-right">
                <span className="badge badge-green">{b.status}</span>
                <p className="ticket-price">{formatCurrency(b.total)}</p>
                <button className="btn btn-secondary btn-sm">View QR</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="qr-modal-overlay" onClick={() => setSelected(null)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelected(null)}>✕</button>
            <h3>{selected.event.title}</h3>
            <p className="qr-sub">Present this QR at the entrance</p>
            <div className="qr-display">
              <QRPattern token={selected.qrToken} />
            </div>
            <p className="qr-code-text">{selected.qr}</p>
            <div className="qr-details">
              {[
                ['Ticket', selected.tier.name + ' × ' + selected.qty],
                ['Date', formatDate(selected.event.date)],
                ['Venue', selected.event.venue],
                ['Total', formatCurrency(selected.total)],
                ['ID', selected.id.toUpperCase()],
              ].map(([l, v]) => (
                <div key={l} className="detail-row">
                  <span className="detail-lbl">{l}</span>
                  <span className="detail-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
