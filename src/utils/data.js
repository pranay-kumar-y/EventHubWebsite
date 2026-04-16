export const MOCK_EVENTS = [
  {
    id: 1, title: "Neon Nights Music Festival",
    description: "An electrifying night of live music featuring top artists across three stages. Experience a night you'll never forget with stunning light shows and incredible performances.",
    date: "2026-04-15T20:00:00", venue: "Brixton Academy", location: "London",
    category: "Music", capacity: 500, image: "🎵", color: "#FF6B6B",
    tiers: [
      { id: 1, name: "General", price: 25, available: 300, sold: 120 },
      { id: 2, name: "VIP", price: 75, available: 100, sold: 45 },
      { id: 3, name: "Early Bird", price: 15, available: 100, sold: 100 }
    ]
  },
  {
    id: 2, title: "Tech Summit 2026",
    description: "Join industry leaders for a full-day conference covering AI, web development, and the future of technology. Networking lunch included.",
    date: "2026-04-22T09:00:00", venue: "ExCeL London", location: "London",
    category: "Technology", capacity: 300, image: "💻", color: "#4ECDC4",
    tiers: [
      { id: 4, name: "Standard", price: 49, available: 200, sold: 88 },
      { id: 5, name: "Premium", price: 129, available: 100, sold: 32 }
    ]
  },
  {
    id: 3, title: "Street Food Carnival",
    description: "Over 50 street food vendors from around the world gather for the ultimate outdoor food festival. Live cooking demos, tastings, and fun for the whole family.",
    date: "2026-05-03T11:00:00", venue: "Southbank Centre", location: "London",
    category: "Food", capacity: 800, image: "🍜", color: "#FFE66D",
    tiers: [
      { id: 6, name: "Entry", price: 8, available: 600, sold: 210 },
      { id: 7, name: "Tasting Pack", price: 22, available: 200, sold: 167 }
    ]
  },
  {
    id: 4, title: "Abstract Art Exhibition",
    description: "A curated exhibition featuring works from 30 emerging artists exploring themes of identity, nature, and the digital age.",
    date: "2026-05-10T18:00:00", venue: "Tate Modern", location: "London",
    category: "Arts", capacity: 200, image: "🎨", color: "#A78BFA",
    tiers: [
      { id: 8, name: "General Admission", price: 12, available: 150, sold: 74 },
      { id: 9, name: "Opening Night", price: 35, available: 50, sold: 28 }
    ]
  },
  {
    id: 5, title: "Marathon City Run 2026",
    description: "Join thousands of runners in the annual city marathon. Routes for 5K, 10K, half marathon, and full marathon. All fitness levels welcome.",
    date: "2026-05-18T07:00:00", venue: "Hyde Park", location: "London",
    category: "Sports", capacity: 1000, image: "🏃", color: "#34D399",
    tiers: [
      { id: 10, name: "5K", price: 18, available: 400, sold: 322 },
      { id: 11, name: "Half Marathon", price: 32, available: 400, sold: 215 },
      { id: 12, name: "Full Marathon", price: 45, available: 200, sold: 89 }
    ]
  },
  {
    id: 6, title: "Startup Pitch Night",
    description: "Watch 10 promising startups pitch to a panel of top investors. Networking drinks from 6PM.",
    date: "2026-05-25T18:30:00", venue: "Campus London", location: "London",
    category: "Business", capacity: 150, image: "🚀", color: "#FB923C",
    tiers: [
      { id: 13, name: "General", price: 20, available: 100, sold: 67 },
      { id: 14, name: "Investor Pass", price: 85, available: 50, sold: 18 }
    ]
  }
];

export const CATEGORIES = ["All", "Music", "Technology", "Food", "Arts", "Sports", "Business"];

export const CAT_COLORS = {
  Music: "#FF6B6B", Technology: "#4ECDC4", Food: "#FFE66D",
  Arts: "#A78BFA", Sports: "#34D399", Business: "#FB923C", General: "#7C6FFF"
};

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const formatTime = (d) =>
  new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export const formatCurrency = (n) => `£${Number(n).toFixed(2)}`;

export const genId = () => Math.random().toString(36).substr(2, 9);
