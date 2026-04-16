# 🎟️ EventHub — Event Discovery & Ticketing Platform

A full-featured event management web application built with React. Users can browse and book tickets for events, while organisers can create events, manage listings, and scan QR codes at entry.

---

## Live Features

### For Attendees
- Browse events by category (Music, Technology, Food, Arts, Sports, Business)
- View detailed event pages with venue, date, and ticket tier information
- Secure ticket checkout with multiple pricing tiers (General, VIP, Early Bird, etc.)
- Personal ticket dashboard to view all booked tickets
- QR code generated per booking for event entry

### For Organisers
- Create and publish new events with custom ticket tiers
- Organiser dashboard with revenue, tickets sold, and event stats
- QR code scanner to validate attendee tickets at the door
- Role-based access — organiser features are gated behind the organiser account type

### Authentication
- Register as an **Attendee** or **Organiser**
- Login / Logout with persistent session (localStorage)
- Protected routes — checkout, tickets, dashboard, and create event require login

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Context API | Global auth state management |
| localStorage | Session persistence & user storage |
| CSS Modules | Component-level styling |

---

## 📁 Project Structure

```
EventHubWebsite/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Top navigation with auth controls
│   │   ├── EventCard.js       # Reusable event listing card
│   │   ├── AuthModal.js       # Login / Register modal
│   │   └── Notification.js    # Toast notification component
│   ├── pages/
│   │   ├── Home.js            # Landing page with featured events
│   │   ├── Events.js          # Full event listings with category filter
│   │   ├── EventDetail.js     # Single event detail + ticket selection
│   │   ├── Checkout.js        # Ticket booking & confirmation
│   │   ├── MyTickets.js       # Attendee's booked tickets
│   │   ├── Dashboard.js       # Organiser stats & event management
│   │   ├── CreateEvent.js     # Create new event form
│   │   └── Scanner.js         # QR code ticket scanner
│   ├── context/
│   │   └── AuthContext.js     # Auth state, login, register, logout
│   ├── utils/
│   │   └── data.js            # Mock events data & helper functions
│   ├── App.js                 # Root component & route definitions
│   └── index.js               # React entry point
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pranay-kumar-y/EventHubWebsite.git

# Navigate into the project
cd EventHubWebsite

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

---

## 👤 User Roles

| Role | Access |
|---|---|
| **Guest** | Browse events, view event details |
| **Attendee** | + Book tickets, view My Tickets |
| **Organiser** | + Create events, view Dashboard, scan QR codes |

To test organiser features, register a new account and select **Organiser** as your role.

---

## Available Scripts

```bash
npm start        # Run the app in development mode
npm run build    # Build for production
```

---

##  Notes

- Event data is currently mock data defined in `src/utils/data.js`
- User accounts and sessions are stored in the browser's localStorage
- No backend or database required — fully client-side




