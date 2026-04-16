import React, { useState } from 'react';
import './Scanner.css';

export default function Scanner({ bookings }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!input.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const booking = bookings.find(
        (b) => b.qr === input.trim() || b.qrToken === input.trim()
      );
      if (booking) {
        setResult({
          valid: booking.status === 'confirmed',
          booking,
          message: booking.status === 'confirmed' ? 'Entry granted!' : 'Ticket already used or cancelled.',
        });
      } else {
        setResult({ valid: false, booking: null, message: 'Ticket not found. Invalid QR code.' });
      }
      setScanning(false);
    }, 1000);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>QR Scanner</h1>
        <p>Validate attendee tickets at entry</p>
      </div>

      <div className="scanner-box">
        <div className="scanner-icon-area">📷</div>
        <p className="scanner-hint">Paste or type a QR token to validate</p>
        <div className="scanner-input-row">
          <input
            className="form-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            placeholder="e.g. QR-ABC123XYZ"
          />
          <button className="btn btn-primary" onClick={handleScan} disabled={scanning}>
            {scanning ? 'Checking...' : 'Validate'}
          </button>
        </div>

        {bookings.length > 0 && (
          <p className="scanner-tip">
            💡 Try a ticket from My Tickets — copy the QR code shown there
          </p>
        )}
      </div>

      {result && (
        <div className={'scan-result ' + (result.valid ? 'scan-valid' : 'scan-invalid')}>
          <div className="scan-result-icon">{result.valid ? '✅' : '❌'}</div>
          <h3>{result.valid ? 'Entry Granted' : 'Entry Denied'}</h3>
          <p>{result.message}</p>
          {result.booking && (
            <div className="scan-booking-info">
              <p><strong>{result.booking.event.title}</strong></p>
              <p>{result.booking.tier.name} × {result.booking.qty}</p>
            </div>
          )}
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: 16 }}
            onClick={() => { setResult(null); setInput(''); }}
          >
            Scan Next
          </button>
        </div>
      )}
    </div>
  );
}
