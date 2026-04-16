import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { CATEGORIES } from '../utils/data';
import './Events.css';

export default function Events({ events }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = events.filter((e) => {
    const matchCat = category === 'All' || e.category === category;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>Browse Events</h1>
        <p>{filtered.length} events available</p>
      </div>

      <div className="events-search">
        <input
          className="form-input search-input"
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={'filter-tab' + (category === cat ? ' active' : '')}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">🔍</span>
          <h3>No events found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="events-grid">
          {filtered.map((evt) => (
            <EventCard key={evt.id} evt={evt} />
          ))}
        </div>
      )}
    </div>
  );
}
