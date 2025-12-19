<div align="center">

# TradeNova: A Stock Trading Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <strong>A modern, feature-rich stock trading platform with real-time market data, portfolio management, and premium glassmorphism UI.</strong>
</p>

[Features](#-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Installation](#-installation) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 📊 Dashboard
- **Real-time Portfolio Overview** - Track your investments at a glance
- **Interactive Charts** - Area charts with gradient fills using Recharts
- **Market Sentiment Indicator** - Bullish/Bearish sentiment analysis
- **Status Strip** - Market status, risk level, portfolio volatility
- **Top Gainers/Losers** - Quick view of market movers
- **Smart Alerts** - Price alerts, sector concentration warnings

### 📈 Markets
- **Live Stock Data** - Real-time prices and percentage changes
- **Smart Market Signals** - Near 52W High, High Volatility, Below 20 DMA, Strong Momentum
- **Sector Filtering** - Filter by IT, Banking, Pharma, Energy, Auto
- **Sort & Filter** - Sort by % Change, Price, Volume | Filter: Gainers, Losers, Volatile
- **Quick Actions** - One-click Buy, Sell, Add to Watchlist

### 💼 Portfolio
- **Holdings Table** - Complete breakdown with all metrics:
  - Stock Name, Quantity, Avg Price, Current Price
  - Invested Value, Current Value, P&L (₹ + %)
  - Day's Change with colored badges
- **Unrealized P&L** - Profit on stocks you still hold
- **Realized P&L** - Profit from stocks you already sold
- **Sector Allocation** - Interactive pie chart visualization

### 📋 Orders
- **Complete Order History** - All executed and pending orders
- **Order Details** - Order ID, Exchange (NSE/BSE), Timestamps, Brokerage
- **Status Tracking** - 🟢 Completed, 🟡 Pending, 🔴 Cancelled
- **Cancel Orders** - Cancel pending orders with one click

### 👁️ Watchlist
- **Live Prices** - Real-time price updates
- **Quick Actions** - Buy, Sell, Remove buttons
- **Smart Empty State** - CTA to explore Markets

### 📰 News
- **Market Headlines** - Global + India market news
- **Category Filters** - Markets, Economy, Company News
- **Stock-Specific News** - Filter news by stock symbol
- **Sentiment Tags** - 🟢 Positive, 🔴 Negative, ⚪ Neutral

### ⚙️ Settings
- **Profile Editing** - Inline edit name and email
- **Theme Toggle** - Dark/Light mode support
- **Notification Preferences** - Email, Push, Market Alerts, Price Alerts
- **Security** - Two-Factor Authentication, Login History
- **Keyboard Shortcuts** - Quick navigation reference

### 🔐 Authentication
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Route guards for authenticated access
- **Session Management** - Auto-logout on session timeout
- **Forgot Password** - Password recovery flow

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Library with Hooks |
| **React Router v6** | Client-side routing |
| **TailwindCSS** | Utility-first styling |
| **Recharts** | Interactive charts |
| **Context API** | State management |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |

### UI/UX
- 🎨 **Glassmorphism Design** - Frosted glass effects
- ✨ **Gradient Overlays** - Premium color transitions
- 🌟 **Glow Effects** - Ambient lighting on interactive elements
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Micro-animations** - Smooth hover and transition effects

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.x or higher
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/guptaharshe/TradeNova-A-Stock-Trading-Platform.git
cd TradeNova-A-Stock-Trading-Platform
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create `.env` in backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tradenova
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

---

## 📁 Project Structure

```
TradeNova/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── ...
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── trading/         # Trade modal, order forms
│   │   │   └── navigation/      # Nav components
│   │   │
│   │   ├── pages/               # Route pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Markets.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Watchlist.jsx
│   │   │   ├── News.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── ...
│   │   │
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── WatchlistContext.jsx
│   │   │   ├── ToastContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── services/            # API service layers
│   │   │   ├── authService.js
│   │   │   ├── stockService.js
│   │   │   ├── portfolioService.js
│   │   │   └── ...
│   │   │
│   │   ├── routes/              # Route configuration
│   │   ├── layouts/             # Layout components
│   │   └── dashboard/           # Dashboard layout & components
│   │
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/         # Route handlers
    │   ├── models/              # MongoDB schemas
    │   ├── routes/              # API routes
    │   ├── middleware/          # Auth, error handling
    │   └── config/              # Database config
    │
    └── package.json
```

---

## 🎯 Key Highlights

### Premium UI Design
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Gradient Accents** - Cyan, emerald, purple color palette
- **Animated Elements** - Pulse indicators, hover scales, smooth transitions
- **Dark Theme** - Eye-friendly dark mode throughout

### Real Trading UX
- **Smart Signals** - Technical indicators on each stock
- **Quick Actions** - One-click trading from any page
- **Order Management** - Full order lifecycle tracking
- **Sentiment Analysis** - News tagged with market impact

### Production-Ready Features
- **Loading Skeletons** - Premium loading states
- **Error Boundaries** - Graceful error handling
- **Toast Notifications** - User feedback system
- **Session Management** - Auto-logout for security

---

<div align="center">

*Built with ❤️ by Harshita Gupta*

</div>
