import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, CAT_COLORS, genId } from '../utils/data';
import './CreateEvent.css';

const EMOJIS = { Music: '🎵', Technology: '💻', Food: '🍜', Arts: '🎨', Sports: '🏃', Business: '🚀', General: '🎉' };

export default function CreateEvent({ addEvent, notify }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('London');
  const [category, setCategory] = useState('General');
  const [capacity, setCapacity] = useState('');
  const [tiers, setTiers] = useState([{ name: 'General Admission', price: '', qty: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addTier = () => setTiers((t) => [...t, { name: '', price: '', qty: '' }]);
  const removeTier = (i) => setTiers((t) => t.filter((_, idx) => idx !== i));
  const updateTier = (i, field, val) =>
    setTiers((t) => t.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)));

  const handleCreate = () => {
    setError('');
    if (!title.trim()) { setError('Event title is required.'); return; }
    if (!date) { setError('Event date is required.'); return; }
    if (!venue.trim()) { setError('Venue is required.'); return; }
    if (!capacity || parseInt(capacity) < 1) { setError('Valid capacity is required.'); return; }
    for (let i = 0; i < tiers.length; i++) {
      if (!tiers[i].name.trim() || !tiers[i].price || !tiers[i].qty) {
        setError('Please fill in all ticket tier details.'); return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      const newEvent = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        date,
        venue: venue.trim(),
        location: location.trim(),
        category,
        capacity: parseInt(capacity),
        image: EMOJIS[category] || '🎉',
        color: CAT_COLORS[category] || '#7C6FFF',
        tiers: tiers.map((t, i) => ({
          id: Date.now() + i,
          name: t.name,
          price: parseFloat(t.price),
          available: parseInt(t.qty),
          sold: 0,
        })),
      };
      addEvent(newEvent);
      setLoading(false);
      notify('Event created successfully! 🎉');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      <div className="page-header"><h1>Create New Event</h1></div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="create-grid">
        <div className="create-section">
          <h3 className="create-section-title">Event Details</h3>
          <div className="form-group">
            <label className="form-label">Event Title *</label>
            <input className="form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Summer Music Festival" />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell attendees about your event..." style={{ resize: 'vertical' }} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date &amp; Time *</label>
              <input className="form-input" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Venue *</label>
              <input className="form-input" type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Brixton Academy" />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Total Capacity *</label>
            <input className="form-input" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 500" min="1" />
          </div>
        </div>

        <div className="create-section">
          <h3 className="create-section-title">Ticket Tiers</h3>
          {tiers.map((tier, i) => (
            <div key={i} className="tier-form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Name</label>
                <input className="form-input" type="text" value={tier.name} onChange={(e) => updateTier(i, 'name', e.target.value)} placeholder="e.g. General" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Price (£)</label>
                <input className="form-input" type="number" value={tier.price} onChange={(e) => updateTier(i, 'price', e.target.value)} placeholder="25.00" min="0" step="0.01" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Quantity</label>
                <input className="form-input" type="number" value={tier.qty} onChange={(e) => updateTier(i, 'qty', e.target.value)} placeholder="100" min="1" />
              </div>
              {tiers.length > 1 && (
                <button type="button" className="btn btn-danger btn-sm tier-remove" onClick={() => removeTier(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={addTier}>+ Add Tier</button>
        </div>
      </div>

      <button className="btn btn-primary btn-lg btn-full create-submit" onClick={handleCreate} disabled={loading}>
        {loading ? <><div className="spinner"></div> Creating...</> : 'Create Event →'}
      </button>
    </div>
  );
}
