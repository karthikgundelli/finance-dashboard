# Finance Dashboard UI

A modern, responsive finance dashboard built with React and plain CSS. Track your financial activity with an intuitive interface featuring real-time visualizations, transaction management, and financial insights.

## 🚀 Features

### Core Features
- **📊 Dashboard Overview** - Summary cards showing Total Balance, Income, and Expenses with trend indicators
- **📈 Balance Trend Visualization** - Line chart showing balance trends over time
- **🎯 Spending Breakdown** - Pie chart displaying expense distribution by category
- **📋 Transactions Management** - Complete transaction list with advanced filtering and sorting
- **💡 Financial Insights** - Key metrics and recommendations based on your financial data
- **👤 Role-Based UI** - Switch between Viewer (read-only) and Admin (add/edit transactions) roles

### Technical Features
- ✅ Fully Responsive Design - Works on desktop, tablet, and mobile
- ✅ Smooth Animations - Engaging transitions and micro-interactions
- ✅ Pure CSS Styling - No external CSS frameworks, custom animations
- ✅ State Management - Context API for application-wide state
- ✅ Mock Data - Pre-populated with realistic financial data
- ✅ Clean Code - Well-structured, modular React components

## 📋 Requirements Met

| Requirement | Status | Details |
|-----------|--------|---------|
| Dashboard Overview | ✅ | Summary cards + Balance trend + Spending breakdown |
| Transactions Section | ✅ | List with filtering, sorting, search capabilities |
| Role-Based UI | ✅ | Viewer/Admin toggle with conditional rendering |
| Insights Section | ✅ | Savings rate, top categories, recommendations |
| State Management | ✅ | Context API with proper data flow |
| Responsiveness | ✅ | Mobile-first design, tested on all screen sizes |
| UI/UX | ✅ | Clean design, animations, smooth interactions |
| Documentation | ✅ | This README + inline code comments |

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Plain CSS with CSS Grid & Flexbox
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Animations**: CSS Keyframe Animations

--**Project structure**
- finance-dashboard-ui/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── SummaryCard.js
│   │   ├── BalanceTrendChart.js
│   │   ├── SpendingBreakdown.js
│   │   └── TransactionTable.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Transactions.js
│   │   └── Insights.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── app.css
│   │   ├── header.css
│   │   ├── sidebar.css
│   │   ├── summary-card.css
│   │   ├── dashboard.css
│   │   ├── chart.css
│   │   ├── transaction-table.css
│   │   ├── transactions.css
│   │   └── insights.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/karthikgundelli/finance-dashboard-ui.git
cd finance-dashboard-ui
