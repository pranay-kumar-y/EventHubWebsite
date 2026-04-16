import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Checkout from './pages/Checkout';
import MyTickets from './pages/MyTickets';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Scanner from './pages/Scanner';
import AuthModal from './components/AuthModal';
import Notification from './components/Notification';
import { MOCK_EVENTS } from './utils/data';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [bookings, setBookings] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [notification, setNotification] = useState(null);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const addBooking = (booking) => setBookings((prev) => [booking, ...prev]);
  const addEvent = (evt) => setEvents((prev) => [...prev, evt]);

  return (
    <div className="app">
      <Navbar openAuth={openAuth} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home events={events} openAuth={openAuth} />} />
          <Route path="/events" element={<Events events={events} />} />
          <Route path="/events/:id" element={<EventDetail events={events} openAuth={openAuth} />} />
          <Route
            path="/checkout"
            element={user ? <Checkout addBooking={addBooking} notify={notify} /> : <Navigate to="/" />}
          />
          <Route
            path="/tickets"
            element={user ? <MyTickets bookings={bookings} /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={user && user.role === 'organiser' ? <Dashboard events={events} bookings={bookings} /> : <Navigate to="/" />}
          />
          <Route
            path="/create"
            element={user && user.role === 'organiser' ? <CreateEvent addEvent={addEvent} notify={notify} /> : <Navigate to="/" />}
          />
          <Route
            path="/scanner"
            element={user && user.role === 'organiser' ? <Scanner bookings={bookings} /> : <Navigate to="/" />}
          />
        </Routes>
      </main>

      {showAuth && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuth(false)}
          notify={notify}
        />
      )}

      {notification && (
        <Notification
          msg={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
