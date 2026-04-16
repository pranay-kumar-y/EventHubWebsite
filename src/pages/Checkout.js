import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { genId, formatDate, formatCurrency } from '../utils/data';
import './Checkout.css';

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

export default function Checkout({ addBooking, notify }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state;

  const [cardName, setCardName] = useState(user ? user.name : '');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [booking, setBooking] = useState(null);

  if (!state) {
    return (
      <div className="page">
        <div className="empty"><h3>No booking data</h3><button className="btn btn-primary" onClick={() => navigate('/events')}>Browse Events</button></div>
      </div>
    );
  }

  const { event, tier, qty, total } = state;

  const handlePay = () => {
    if (!cardName || !cardNumber || !expiry || !cvc) {
      notify('Please fill in all card details.', 'error');
      return;
    }
    setPaying(true);
    setTimeout(() => {
      const token = genId();
      const newBooking = {
        id: genId(),
        event,
        tier,
        qty,
        total,
        status: 'confirmed',
        qrToken: token,
        qr: 'QR-' + token.toUpperCase(),
        date: new Date().toISOString(),
      };
      addBooking(newBooking);
      setBooking(newBooking);
      setDone(true);
      setPaying(false);
      notify('🎉 Booking confirmed!');
    }, 2000);
  };

  if (done && booking) {
    return (
      <div className="page">
        <div className="booking-success">
          <div className="success-icon">🎉</div>
          <h2>Booking Confirmed!</h2>
          <p className="success-sub">Your ticket has been booked successfully</p>
          <div className="qr-card">
            <p className="qr-label">YOUR QR TICKET</p>
            <div className="qr-display">
              <QRPattern token={booking.qrToken} />
            </div>
            <p className="qr-code">{booking.qr}</p>
          </div>
          <div className="booking-details">
            {[
              ['Event', booking.event.title],
              ['Date', formatDate(booking.event.date)],
              ['Venue', booking.event.venue],
              ['Ticket', booking.tier.name + ' × ' + booking.qty],
              ['Total Paid', formatCurrency(booking.total)],
              ['Booking ID', booking.id.toUpperCase()],
            ].map(([label, value]) => (
              <div key={label} className="detail-row">
                <span className="detail-lbl">{label}</span>
                <span className="detail-val">{value}</span>
              </div>
            ))}
          </div>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/tickets')}>View My Tickets</button>
            <button className="btn btn-secondary" onClick={() => navigate('/events')}>Browse More Events</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="page-header"><h1>Checkout</h1></div>

      <div className="checkout-grid">
        <div className="payment-section">
          <div className="payment-card">
            <h3>Payment Details</h3>
            <div className="fake-card-display">
              <div className="fake-card-number">{cardNumber}</div>
              <div className="fake-card-row">
                <span>{expiry}</span>
                <span>***</span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input className="form-input" type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Smith" />
            </div>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input className="form-input" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input className="form-input" type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label className="form-label">CVC</label>
                <input className="form-input" type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" />
              </div>
            </div>
            <p className="stripe-note">🔒 Secured by Stripe · PCI-DSS Compliant</p>
            <button className="btn btn-primary btn-full pay-btn" onClick={handlePay} disabled={paying}>
              {paying ? (
                <><div className="spinner"></div> Processing payment...</>
              ) : (
                'Pay ' + formatCurrency(total) + ' →'
              )}
            </button>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-event">
            <div className="summary-emoji" style={{ background: event.color + '22' }}>{event.image}</div>
            <div>
              <div className="summary-title">{event.title}</div>
              <div className="summary-date">{formatDate(event.date)}</div>
              <div className="summary-venue">{event.venue}</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="summary-lines">
            <div className="summary-line"><span>{tier.name} × {qty}</span><span>{formatCurrency(tier.price * qty)}</span></div>
            <div className="summary-line"><span>Service fee</span><span>{formatCurrency(total * 0.05)}</span></div>
            <div className="summary-line summary-total"><strong>Total</strong><strong>{formatCurrency(total * 1.05)}</strong></div>
          </div>
          <div className="qr-note">✅ QR ticket generated instantly after payment</div>
        </div>
      </div>
    </div>
  );
}
